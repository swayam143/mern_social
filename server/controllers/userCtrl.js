const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userCtrl = {
  searchUser: async (req, res) => {
    const { search } = req.body;
    try {
      const users = await Users.find({ username: { $regex: search } })
        .limit(10)
        .select("fullname username avatar");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const users = await Users.findById(req.params.id).select("-password");
      if (!users) return res.status(400).json({ mssg: "User doesnot exist" });
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ mssg: "User doesnot exist" });
    }
  },
  updateUser: async (req, res) => {
    const {
      fullname,
      mobile,
      username,
      address,
      gender,
      website,
      story,
      // picture,
    } = req.body;

    try {
      const users = await Users.findById({ _id: req.body.id });

      const updatedUser = await Users.findByIdAndUpdate(
        { _id: req.body.id },
        {
          picture: req?.file?.filename ? req.file.filename : users.picture,
          fullname: fullname,
          mobile: mobile,
          username: username,
          address: address,
          gender: gender,
          website: website,
          story: story,
        },
        { new: true }
      );

      const access_token = jwt.sign(
        { id: users._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      const { password, ...otherDetails } = updatedUser._doc;

      // res.json({ msssg: "Update Success" });
      res.json({
        access_token,
        user: otherDetails,
        mssg: "User Updated Successfully",
      });
    } catch (err) {
      return res.status(500).json({ mssg: "User doesnot exist" });
    }
  },
};

module.exports = userCtrl;
