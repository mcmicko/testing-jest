const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: { type: String, require: true },
  text: {
    type: String,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
