//Add New Product
const addProduct = (req, res) => {
  res.send("Add Product Controller");
};
//Get a product detail
const getProduct = (req, res) => {
  res.send("Get Product Details");
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
