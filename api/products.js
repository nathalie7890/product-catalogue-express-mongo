const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/Product");

//get products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

//get by id
router.get("/:id", async (req, res) => {
  try {
    const productFound = await Product.findById(req.params.id);
    if (!productFound)
      return res.status(404).json({ msg: "Product not found" });
    else return res.json(productFound);
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

//delete product by id
router.delete("/:id", async (req, res) => {
  try {
    const productFound = await Product.findById(req.params.id);
    if (!productFound)
      return res.status(404).json({ msg: "Product not found" });

    await Product.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Product deleted successfully." });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

//add product
router.post("/", async (req, res) => {
  try {
    const {
      title,
      brand,
      category,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      thumbnail,
    } = req.body;

    const product = new Product({
      title,
      brand,
      category,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      thumbnail,
    });

    await product.save();
    return res
      .status(200)
      .json({ product, msg: "New product added successfully" });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

//update product
router.put("/:id", async (req, res) => {
  try {
    const productFound = await Product.findById(req.params.id);
    if (!productFound)
      return res.status(404).json({ msg: "Product not found" });

    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ productFound, msg: "Product updated successfully" });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
