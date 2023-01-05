const express = require("express");
const Connection = require("./db/Connection");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const ProductRouter = require("./routes/ProductRouter");
const UserRouter = require("./routes/UserRouter");
const CartRouter = require("./routes/CartRouter");

Connection();

app.get("/", (req, res) => {
  res.send("This is the API Server for the E-Com Backend");
});
//Product Router
app.use("/api/product", ProductRouter);

//User Router
app.use("/user", UserRouter);

//Cart Router
app.use("/api/cart", CartRouter);

app.listen(5001, () => console.log("Server running on 5001"));
