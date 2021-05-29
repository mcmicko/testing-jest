const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: { type: String, require: true },
  text: {
    type: String,
  },
});

module.exports = mongoose.model("posts", userSchema);
