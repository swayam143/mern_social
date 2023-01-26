const Comments = require("../models/commentModel");

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { userId, postId, content, tag, reply } = req.body;

      const newComment = new Comments({
        user: userId,
        content,
        tag,
        reply,
      });

      //
      //Adding comments in post by finding post by id
      //

      await postMessage.findByIdAndUpdate(
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
};

module.exports = commentCtrl;
