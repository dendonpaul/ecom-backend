const UserModel = require("../models/UserModel");

//signup
const createUser = async (req, res) => {
  const user = new UserModel(req.body);
  const { email } = req.body;

  //check if user already registered
  const userExists = await UserModel.findOne({ email });
  if (!userExists) {
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(200).json({ message: "User Created", user, token });
    } catch (error) {
      res.status(401).json({ message: "User creation failed", error });
    }
  } else {
    res.status(401).json({ message: "Email Already Exists" });
  }
};

module.exports = { createUser };
