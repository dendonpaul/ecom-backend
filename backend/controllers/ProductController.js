const ProductModel = require("../models/ProductModel");

//Add New Product
const addProduct = async (req, res) => {
  const { name, price, category, description, imageUrl, quantity } = req.body;
  try {
    const product = new ProductModel({ ...req.body, owner: req.user._id });
    await product.save().then((data) => {
      res
        .status(200)
        .json({ message: "Product Added Successfully", data: data });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error. Product not added. Try again" });
  }
};

//Get a product detail
const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  res.status(200).json(product);
};

//Edit Product
const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description, imageUrl, quantity } = req.body;

  try {
    await ProductModel.findByIdAndUpdate(
      id,
      { name, price, category, description, imageUrl, quantity },
      { runValidators: true }
    ).then((data) => {
      res.status(200).json({ message: "Product Updated", data: data });
    });
  } catch (error) {
    res.status(401).json(error);
  }
};
//Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    ProductModel.deleteOne({ _id: id }).then((data) => {
      res.status(200).json({ message: "Product Deleted", data: data });
    });
  } catch (error) {
    res.status(400).json({ message: "Product not deleted" });
  }
};

//get all products
const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.status(200).json({ message: "All Products fetched", products });
};

module.exports = {
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
};
