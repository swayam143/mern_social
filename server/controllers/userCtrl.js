const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userCtrl = {
  searchUser: async (req, res) => {
    const { search } = req.body;
    try {
      const users = await Users.find({ username: { $regex: search } })
        .limit(10)
        .select("fullname username picture");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const users = await Users.findById(req.params.id)
        .select("-password")
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
      )
        .select("-password")
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

      const access_token = jwt.sign(
        { id: users._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      const { password, ...otherDetails } = updatedUser._doc;

      res.json({
        access_token,
        user: otherDetails,
        mssg: "User Updated Successfully",
      });
    } catch (err) {
      return res.status(500).json({ mssg: "User doesnot exist" });
    }
  },
  follow: async (req, res) => {
    const { userId } = req.body;
    try {
      const user = await Users.find({
        _id: req.params.id, // the person i want to follow id
        followers: userId, // my id
      });

      // console.log(user);

      if (user.length > 0) {
        res.status(500).json({ mssg: "You followed this user" });
      } else {
        //Update in user database which i follow
        await Users.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: { followers: userId },
          },
          { new: true }
        );

        //Update in my database which user i follow

        const update_user = await Users.findOneAndUpdate(
          { _id: userId },
          {
            $push: { following: req.params.id },
          },
          { new: true }
        )
          .select("-password")
          .populate("followers following", "-password");
        res.json({ msg: "Followed User", user: update_user });
      }
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  unfollow: async (req, res) => {
    const { userId } = req.body;
    try {
      //Update in user database which i follow
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: userId },
        },
        { new: true }
      );

      const update_user = await Users.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      )
        .select("-password")
        .populate("followers following", "-password");
      res.json({ msg: "UnFollowed User", user: update_user });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  suggestions: async (req, res) => {
    const { userId } = req.body;
    try {
      const FindUser = await Users.findById(userId);
      if (!FindUser) return res.json({ mssg: "No User Found" });
      const newArr = [...FindUser.following, FindUser._id];

      const num = req.query.num || 10;

      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: num } },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res.json({ users, result: users.length });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
};

module.exports = userCtrl;
