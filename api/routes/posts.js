const router = require("express").Router();
const Post = require("../model/Post");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/", async (req, res) => {
  try {
    const schema = {
      username: { type: "string", min: 3, unique: true },
      title: { type: "string" },
      description: { type: "string" },
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const newPost = new Post(req.body);
    const post = await newPost.save();

    return res.status(200).json({
      status: "success",
      data: post,
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
    const schema = {
      username: { type: "string", min: 3, unique: true },
      title: { type: "string" },
      description: { type: "string" },
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "post not found",
      });
    }

    if (post.username !== req.body.username) {
      return res.status(403).json({
        status: "error",
        message: "you only can delete your post",
      });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      data: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "post not found",
      });
    }

    if (post.username !== req.body.username) {
      return res.status(403).json({
        status: "error",
        message: "you only can delete your post",
      });
    }

    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "success",
      message: "post deleted sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "post not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const username = req.query.username;
    const catName = req.query.cat;

    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }

    return res.status(200).json({
      status: 200,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
