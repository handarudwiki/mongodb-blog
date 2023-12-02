const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/register", async (req, res) => {
  try {
    const schema = {
      username: { type: "string", min: 3, unique: true },
      password: { type: "string", min: 5 },
      email: { type: "email" },
      profilePic: { type: "string", optional: true },
    };

    const validation = v.validate(req.body, schema);

    if (validation.length) {
      return res.status(400).json({
        status: "error",
        message: validation,
      });
    }

    const existUsername = await User.findOne({ username: req.body.username });
    if (existUsername) {
      return res.status(400).json({
        status: "error",
        message: "username already been taken",
      });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User(req.body);

    const user = await newUser.save();

    const { password, ...others } = user._doc;

    return res.status(200).json({
      status: "success",
      data: others,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const schema = {
      username: { type: "string", min: 3, unique: true },
      password: { type: "string", min: 5 },
    };

    const validation = v.validate(req.body, schema);

    if (validation.length) {
      return res.status(400).json({
        status: "error",
        message: validation,
      });
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "username or password wrong",
      });
    }

    const validPassword = bcrypt.compare(user.password, req.body.password);
    if (!validPassword) {
      return res.status(403).json({
        status: "error",
        message: "username or password wrong",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = router;
