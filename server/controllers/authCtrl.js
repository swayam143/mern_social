const Users = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;

      //It remove the extrasapce s in the text
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });

      if (user_name)
        return res.status(400).json({ msg: "This user name Already Exist" });

      const user_email = await Users.findOne({ email });
      if (user_email)
        return res.status(400).json({ msg: "This user Email Already Exist" });

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: hashPassword,
        gender,
      });
      //   console.log(newUser);

      //Token Created one is access token and another is refresh token

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      //
      //By this we stored refresh_token in cookies
      //

      res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // Its expires in 30 days
      });

      //
      //Saved in Database
      //
      await newUser.save();

      res.json({
        msg: "Registered",
        access_token,
        user: {
          ...newUser._doc,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email })
        .populate("followers following", "-password")
        .populate({
          path: "saved",
          populate: [
            {
              path: "user likes",
              select: "username fullname picture",
            },
            {
              path: "comments",
              populate: {
                path: "user",
                select: "username fullname picture",
              },
            },
          ],
        });

      if (!user)
        return res.status(400).json({ msg: "This Email doesnot Exist" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect" });

      //Token Created one is access token and another is refresh token

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      //
      //By this we stored refresh_token in cookies
      //

      res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // Its expires in 30 days
      });

      res.json({
        msg: "Login Success...",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged Out !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      console.log(rf_token);

      if (!rf_token) return res.status(400).json({ msg: "Please login now" });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now" });
          //
          //If jwt verify than we get the below result
          //
          // console.log(result); // Refult ---> { id: '63c4265f94bb39e4a4ad73b4', iat: 1673799263, exp: 1676391263 }
          //
          // we find the id we get from jwt verify
          //
          const user = await Users.findById(result.id)
            .select("-password")
            .populate("followers following", "-password");

          if (!user)
            return res.status(400).json({ msg: "This does not exist" });

          const access_token = createAccessToken({ id: result.id });

          res.json({ access_token, user });
        }
      );

      //   );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

// console.log(process.env.REFRESH_TOKEN_SECRET);
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = authCtrl;
