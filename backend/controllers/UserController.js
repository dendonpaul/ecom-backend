const UserModel = require("../models/UserModel");

//signup
const createUser = async (req, res) => {
  const user = new UserModel(req.body);
};

module.exports = { createUser };
