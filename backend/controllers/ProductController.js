const ProductModel = require("../models/ProductModel");

//Add New Product
const addProduct = async (req, res) => {
  const { name, price, category, description, imageUrl, quantity } = req.body;
  try {
    const product = new ProductModel(req.body);
    await product.save().then((data) => {
      res.status(200).json({ message: "Product Added Successfully" });
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
const editProduct = (req, res) => {
  res.send("Edit Product");
};
//Delete Product
const deleteProduct = (req, res) => {
  res.send("Delete Product");
};

module.exports = { addProduct, getProduct, editProduct, deleteProduct };
