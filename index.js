const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

mongoose.connect(process.env.MONGO_DB)

app.use(express.static("uploads"));

app.use(cors());
app.use(express.json());

app.use("/products", require("./api/products"));

app.listen(5000, () => console.log("App is flying on PORT 5000"));

mongoose.connection.once("open", () =>
  console.log("We are connected to MongoDB")
);