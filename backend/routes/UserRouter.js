const router = require("express").Router();
const UserModel = require("../models/UserModel");
const {
  createUser,
  editUser,
  deleteUser,
  getDetails,
  getAllUsers,
  logoutUser,
  loginUser,
} = require("../controllers/UserController");

router.post("/create", createUser);
// router.put("/edit", editUser);
// router.delete("/delete", deleteUser);
// router.get("/details", getDetails);
// router.get("/allUsers", getAllUsers);
router.post("/login", loginUser);
router.post("logout", logoutUser);

module.exports = router;
