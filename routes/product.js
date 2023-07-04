const express = require("express");
const { ProductModel } = require("../models/productModel");
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (err) {
    console.error('Failed to fetch products', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Failed to fetch product', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST a new order
router.post('/productsOfOrder', async (req, res) => {
  const { name, email, productId,weight } = req.body;

  // Validate the request body
  if (!name || !email || !productId||!weight) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if the product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Save the order to the database
    // You can define an Order model and create a new order here

    res.json({ success: true });
  } catch (err) {
    console.error('Failed to save order', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});
module.exports=router;


