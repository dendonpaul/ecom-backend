const router = require("express").Router();
const UserModel = require("../models/UserModel");
const { createUser } = require("../controllers/UserController");

router.post("/create", createUser);

module.exports = router;
