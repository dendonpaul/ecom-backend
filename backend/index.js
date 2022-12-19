const express = require("express");
const Connection = require("./db/Connection");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

Connection();

app.listen(5001, () => console.log("Server running on 5001"));
