const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    req.password;
    const schema = {
      username: { type: "string", min: 3, unique: true },
      password: { type: "string", min: 5, optional: true },
      profilePic: { type: "string", optional: true },
      userId: { type: "string" },
      email: { type: "email" },
    };

    const validation = v.validate(req.body, schema);

    if (validation.length) {
      return res.status(400).json({
        status: "error",
        message: validation,
      });
    }

    if (req.body.userId !== req.params.id) {
      return res.status(403).json({
        status: "error",
        message: "only able to update your account",
      });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
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

router.delete("/:id", async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      return res.status(403).json({
        status: "error",
        message: "you only able delete your acount",
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "success",
      message: "user deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = router;
