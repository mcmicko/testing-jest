const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../model/User");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please a password with 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const userCheck = await User.findOne({ email: email });

      if (userCheck) {
        return res.status(400).json({
          errors: [{ msg: "User already exist" }],
        });
      }

      const newUser = new User({
        name,
        email,
        password,
      });

      const user = await newUser.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
