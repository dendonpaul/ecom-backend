const CartModel = require("../models/CartModel");

//Get Cart
const getCart = async (req, res) => {
  const customer = req.user._id;
  try {
    const cart = await CartModel.findOne({ customer });
    if (cart && cart.length > 0) {
      return res.status(200).json(cart);
    } else {
      return res.status(200).json({ message: "No items in Cart." });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error Calling Cart Function" });
  }
};
const createCart = async (req, res) => {};
const deleteCart = async (req, res) => {};

module.exports = { getCart, createCart, deleteCart };
