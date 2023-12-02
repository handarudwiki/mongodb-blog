const router = require("express").Router();
const Category = require("../model/Category");
const Validator = require("fastest-validator");
const { validate } = require("../model/User");
const v = new Validator();

router.post("/", async (req, res) => {
  try {
    const schema = {
      name: { type: "string" },
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const newCategory = new Category(req.body);
    const category = await newCategory.save();

    return res.status(200).json({
      status: 200,
      data: category,
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
    const categories = await Category.find();
    return res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
