const express = require("express");
const router = express.Router();

const Post = require("../model/Post");

router.post("/", async (req, res) => {
  try {
    const newPost = new Post({
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
