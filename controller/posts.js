const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Post = require("../model/Post");
const User = require("../model/User");

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      user: req.user.id,
      title: req.body.title,
      text: req.body.text,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.mesage);
    res.status(500).send("error server");
  }
});

module.exports = router;
