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
  getPosts: async (req, res) => {
    const { user } = req.body;
    try {
      //
      //Finding the user by id so we can get what users he is following
      //
      const users = await Users.findOne({ _id: req.params.id });
      const posts = await Posts.find({
        user: [...users.following, req.params.id],
      }).populate("user", "username fullname picture");

      res.json({ msg: "Success", result: posts.length, posts });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
  updatePost: async (req, res) => {
    const { content, postId } = req.body;
    try {
      const upDatedPost = await Posts.findByIdAndUpdate(
        { _id: postId },
        { content: content },
        { new: true }
      ).populate("user", "username fullname picture");
      res.json({ msg: "Post Updated", upDatedPost });
    } catch (err) {
      return res.status(500).json({ mssg: err.message });
    }
  },
};

module.exports = postCtrl;
