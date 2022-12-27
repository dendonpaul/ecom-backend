const router = require("express").Router();
const UserModel = require("../models/UserModel");
const { createUser, editUser } = require("../controllers/UserController");

router.post("/create", createUser);
router.put("/edit", editUser);
router.delete("/delete", deleteUser);
router.get("/details", getDetails);
router.get("/allUsers", getAllUsers);

module.exports = router;
