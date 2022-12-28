const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) return res.status(401).json({ message: "Invalid Token" });

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = Auth;
