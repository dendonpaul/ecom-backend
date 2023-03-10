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
  if (!cart) {
    const newCart = new CartModel({
      customer,
      products: [{ productId, quantity, price, name }],
      bill: price * quantity,
    });
    await newCart.save();
    return res
      .status(200)
      .json({ message: "Cart Created. Product Added to cart" });
  } else {
    //check if product already available in cart
    const productIndex = cart.products.findIndex((item) => {
      return item.productId == productId;
    });

    //add quantity if product available in cart
    if (productIndex > -1) {
      //increase quantity
      cart.products[productIndex].quantity += quantity;
      //increase bill
      cart.bill = cart.products.reduce((acc, cur) => {
        return acc + cur.quantity * cur.price;
      }, 0);
      //save cart
      await cart.save();
      res.status(200).json({ message: "Quantity and Bill Updated" });
    } else {
      cart.products.push({ productId, quantity, price, name });
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);
      await cart.save();
      res.status(200).json({ message: "Product Added to cart." });
    }
  }
};

//Delete Cart
const deleteCart = async (req, res) => {
  const customer = req.user._id;
  const productId = req.query.productId;
  const cart = await CartModel.findOne({ customer });
  const productIndex = cart.products.findIndex(
    (item) => item.productId == productId
  );
  if (productIndex > -1) {
    cart.products.splice(productIndex, 1);
    cart.bill = cart.products.reduce((acc, cur) => {
      return acc + cur.quantity * cur.price;
    }, 0);
    await cart.save();
    res.status(200).json({ message: "Product removed from cart" });
  } else {
    res.status(400).json({ message: "Product Not Found!" });
  }
};

module.exports = { getCart, createCart, deleteCart };
