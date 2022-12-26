const router = require("express").Router();
const UserModel = require("../models/UserModel");

router.post("/create", (req, res) => {
  res.send("create user");
});

module.exports = router;
