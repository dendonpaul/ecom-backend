const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

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

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  //verify if user exists
  if (!user) return res.status(401).json({ message: "Invalid Credentials" });

  //check if passwords match
  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  //Generate token for session
  const token = await user.generateAuthToken();
  //return user if credentials match
  return res.status(200).json({ message: "Credentials Validated", user });
};

//Logout user
const logoutUser = async (req, res) => {};

module.exports = { createUser, loginUser };
