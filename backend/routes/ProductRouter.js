const router = require("express").Router();
const ProductController = require("../controllers/ProductController");
const ProductModel = require("../models/ProductModel");
const Auth = require("../middleware/Auth");

router.post("/add-product", Auth, ProductController.addProduct);
router.get("/product/:id", ProductController.getProduct);
router.put("/edit-product/:id", Auth, ProductController.editProduct);
router.delete("/product/:id", Auth, ProductController.deleteProduct);

module.exports = router;
