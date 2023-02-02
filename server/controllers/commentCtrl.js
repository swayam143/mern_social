const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { user, postId, content, tag, reply } = req.body;

      const newComment = new Comments({
        user: user,
        content,
        tag,
        reply,
      });

      //
      //Adding comments in post by finding post by id
      //

      await Posts.findByIdAndUpdate(
        postId,
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();

      res.json({ newComment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content, commentId, user } = req.body;
      await Comments.findOneAndUpdate({ _id: commentId, user }, { content });
      res.json({ mssg: " Comment Updated " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateReplyComment: async (req, res) => {
    try {
      const { content, replyId } = req.body;

      const updteReply = await Comments.updateMany(
        { "reply._id": replyId },
        {
          $set: {
            "reply.$.content": content,
          },
        }
      );
      res.json({ msg: "Updated Successfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      const { commentId, user } = req.body;
      const comment = await Comments.find({ _id: commentId, likes: user });
      //
      //If Already Liked
      //
      if (comment.length > 0) {
        await Comments.findOneAndUpdate(
          { _id: commentId },
          { $pull: { likes: user } }
        );
        return res.status(200).json({ msg: " UnLiked Comment" });
      }
      //
      //liked the post
      //
      await Comments.findOneAndUpdate(
        { _id: commentId },
        { $push: { likes: user } }
      );

      res.json({ mssg: " Liked Comment" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  replyComment: async (req, res) => {
    try {
      const { commentId, user, content, frontendId } = req.body;
      const comment = await Comments.findByIdAndUpdate(commentId, {
        $push: { reply: [{ content, user }] },
      });
      // console.log(comment);

      return res.status(200).json({ msg: " UnLiked Comment" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { commentId } = req.body;
      //
      //Delete comment from comment Modal
      //
      await Comments.findByIdAndDelete(commentId);

      //
      //Delete commentId from User Modal
      //

      await Posts.findOneAndUpdate(
        { comments: commentId },
        { $pull: { comments: commentId } }
      );

      res.json({ mssg: "Comment Deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentCtrl;
