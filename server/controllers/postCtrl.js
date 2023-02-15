const Posts = require("../models/postModel");
const Users = require("../models/userModel");

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, user } = req.body;
      // console.log(req.body);

      const newPost = new Posts({
        content,
        picture: req?.file?.filename ? req.file.filename : "",
        user,
      });

      // console.log(newPost);
      await newPost.save();

      res.json({ msg: "Post Created Successfully", newPost });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  getAllPost: async (req, res) => {
    const { user } = req.body;
    let { page, limit } = req.query;

    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * 10;
    try {
      //
      //Finding the user by id so we can get what users he is following
      //

      // db.posts.find({ user: { $nin: [ "63e343525702a9d474ce3f1e", "63e343525702a9d474ce3d1e" ] } })

      const users = await Users.findById(user);
      const newArr = [...users.following, users._id];
      // console.log(users);
      const posts = await Posts.find({ user: { $nin: newArr } })
        .populate("user likes", "username fullname picture")
        .populate({
          path: "comments",
          populate: {
            path: "user likes reply reply.user",
            select: "username fullname picture",
          },
          options: { sort: { createdAt: -1 } },
        })
        .skip(skip)
        .limit(limit);

      res.json({ page: page, limit: limit, result: posts.length, posts });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  userPost: async (req, res) => {
    const { user } = req.body;
    let { page, limit } = req.query;

    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * 10;
    try {
      //
      //Finding the user by id so we can get what users he is following
      //
      const posts = await Posts.find({
        user: req.params.id,
      })
        .populate("user likes", "username fullname picture")
        .populate({
          path: "comments",
          populate: {
            path: "user likes reply reply.user",
            select: "username fullname picture",
          },
          options: { sort: { createdAt: -1 } },
        })
        .skip(skip)
        .limit(limit);

      res.json({ msg: "Success", result: posts.length, posts });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  getPosts: async (req, res) => {
    const { user } = req.body;
    let { page, limit } = req.query;

    if (!page) page = 1;
    if (!limit) limit = 10;

    const skip = (page - 1) * 10;
    try {
      //
      //Finding the user by id so we can get what users he is following
      //
      const users = await Users.findById(req.params.id);
      const posts = await Posts.find({
        user: [...users.following, req.params.id],
      })
        .populate("user likes", "username fullname picture")
        .populate({
          path: "comments",
          populate: {
            path: "user likes reply reply.user",
            select: "username fullname picture",
          },
          options: { sort: { createdAt: -1 } },
        })
        .skip(skip)
        .limit(limit);

      res.json({ msg: "Successs", result: posts.length, posts });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  detailPost: async (req, res) => {
    try {
      const posts = await Posts.findById(req.params.id)
        .populate("user likes", "username fullname picture")
        .populate({
          path: "comments",

          populate: {
            path: "user likes reply reply.user",
            select: "username fullname picture",
          },
          options: { sort: { createdAt: -1 } },
        });
      // .aggregate({ $sort: { createdAt: 1 } });
      res.json({ posts });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  updatePost: async (req, res) => {
    const { content, postId, picture } = req.body;
    // console.log(req.file);
    // console.log(req.body);

    try {
      const upDatedPost = await Posts.findByIdAndUpdate(
        postId,
        { content, picture: req?.file?.filename ? req.file.filename : picture },
        { new: true }
      ).populate("user", "username fullname picture");
      res.json({ msg: "Post Updated Successfully", upDatedPost });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  likePost: async (req, res) => {
    const { postId, userId } = req.body;
    try {
      const upDatedPost = await Posts.findByIdAndUpdate(
        postId,
        {
          $addToSet: { likes: userId },
        },
        { new: true }
      ).populate("likes", "username fullname picture");
      res.json({ msg: "Post Liked Successfully", upDatedPost });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  unlikePost: async (req, res) => {
    const { postId, userId } = req.body;
    try {
      const findUser = await Posts.findOne({ likes: userId });

      if (findUser) {
        const upDatedPost = await Posts.findByIdAndUpdate(
          postId,
          {
            $pull: { likes: userId },
          },
          { new: true }
        ).populate("likes", "username fullname picture");
        res.json({ msg: "Post UnLiked Successfully", findUser });
      } else {
        res.json({ msg: " Aready Post UnLiked" });
      }
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  DeletePost: async (req, res) => {
    const { postId, userId } = req.body;
    // console.log(postId, userId);
    try {
      await Posts.findOneAndDelete({ _id: postId, user: userId });
      res.json({ msg: "Post Deleted Successfullysssfdg" });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
};

module.exports = postCtrl;
