const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
  title: { type: String },
  brand: { type: String },
  category: { type: String },
  description: { type: String },
  price: { type: Number },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  thumbnail: { type: String },
});

module.exports = mongoose.model("Product", ProductSchema);
