const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");

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

//Create Cart
const createCart = async (req, res) => {
  //get the logged in user ID from auth
  const customer = req.user._id;
  const { productId, price, quantity, name } = req.body;

  //check if product is valid
  const isProduct = await ProductModel.findOne({ _id: productId });
  if (!isProduct) res.status(401).json({ message: "Sorry, invalid Product!" });

  //check if user already has a cart
  const cart = await CartModel.findOne({ customer });
  if (cart) {
    //check if the product is already in cart
    const productIndex = cart.products.findIndex((product) => {
      return product.productId == productId;
    });
    //increase product quantity if product already in cart else add the product to the available cart.
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
      cart.bill = cart.products.reduce((acc, cur) => {
        return acc + cur.quantity * cur.price;
      });
      await cart.save();
      res.status(200).json({ message: "Cart Updated" });
    } else {
      cart.products.push({ productId, quantity, name, price });
      cart.bill = cart.products.reduce((acc, cur) => {
        return acc + cur.quantity * cur.price;
      });
      await cart.save();
      res.status(200).json({ message: "Product Added to Cart" });
    }
  }
  //if no cart available create new cart
  else {
    const newCart = await CartModel.create({
      customer,
      products: [{ productId, price, quantity, name }],
      bill: quantity * price,
    });
    return res.status(200).json({ message: "Product Added to cart" });
  }
};

//Delete Cart
const deleteCart = async (req, res) => {};

module.exports = { getCart, createCart, deleteCart };
