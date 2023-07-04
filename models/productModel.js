const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    weight:Number,
  });
  exports.ProductModel = mongoose.model("products", productSchema);
