const Product = require("../models/Product");

// CREATE PRODUCT
exports.create = async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

// UPDATE PRODUCT
exports.update = async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedData },
      { new: true }
    );
    console.log(updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.send(200).json(true);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// GET PRODUCT
exports.getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const foundProduct = await Product.findById(productId);
    res.status(200).json(foundProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
