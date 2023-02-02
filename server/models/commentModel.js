const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    tag: Object,
    reply: [
      {
        content: { type: String, required: true },
        user: { type: mongoose.Types.ObjectId, ref: "user" },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
