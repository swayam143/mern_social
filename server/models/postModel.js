const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: { type: String },
    picture: {
      type: String,
      default: "",
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
