const express = require("express");
const Connection = require("./db/Connection");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const ProductRouter = require("./routes/ProductRouter");

Connection();

app.get("/", (req, res) => {
  res.send("This is the API Server for the E-Com Backend");
});
//Product Router
app.use("/api/product", ProductRouter);

app.listen(5001, () => console.log("Server running on 5001"));
