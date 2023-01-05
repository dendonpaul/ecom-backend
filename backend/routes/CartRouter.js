const router = require("express").Router();
const CartController = require("../controllers/CartController");
const Auth = require("../middleware/Auth");

router.get("/cart", Auth, CartController.getCart);
router.post("/cart", Auth, CartController.createCart);
router.delete("/cart", Auth, CartController.deleteCart);

module.exports = router;
