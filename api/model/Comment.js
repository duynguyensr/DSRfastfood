const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const CommentSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    parentId: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: User },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
