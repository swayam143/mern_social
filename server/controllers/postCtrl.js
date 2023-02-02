const Posts = require("../models/postModel");
const Users = require("../models/userModel");

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, user } = req.body;
      console.log(req.body);

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
  getPosts: async (req, res) => {
    const { user } = req.body;
    try {
      //
      //Finding the user by id so we can get what users he is following
      //
      const users = await Users.findOne({ _id: req.params.id });
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
        });

      res.json({ msg: "Success", result: posts.length, posts });
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
};

module.exports = postCtrl;
