const router = require("express").Router();
const ProductController = require("../controllers/ProductController");

router.post("/add-product", ProductController.addProduct);
router.get("/product/:id", ProductController.getProduct);
router.put("/edit-product/:id", ProductController.editProduct);
router.delete("/product/:id", ProductController.deleteProduct);

module.exports = router;
