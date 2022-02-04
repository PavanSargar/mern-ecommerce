const Cart = require("../models/Cart");

// ADD TO CART
exports.create = async (req, res) => {
  const cartProducts = req.body;
  try {
    const newCart = new Cart(cartProducts);
    const savedCart = await newCart.save();

    res.status(200).json(savedCart);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// UPDATE CART
exports.update = async (req, res) => {
  const cartData = req.body;
  const cartId = req.params.id;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $set: cartData,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// DELETE CART
exports.deleteCart = async (req, res) => {
  const cartId = req.params.id;

  try {
    await Cart.findByIdAndDelete(cartId);
    res.status(200).json(true);
  } catch (err) {
    console.log(err);
    res.staus(500).json(err);
  }
};

// GET A USER CART
exports.getCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// GET ALL CARTS OF ALL USERS (ADMIN ONLY)
exports.getAll = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}