const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
});

module.exports = User = mongoose.model("user", UserSchema);
