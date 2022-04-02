const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//khoi dong body-parser middleware
app.use(express.urlencoded({ extended: false }));

//khoi dong express middleware
app.use(express.json());
app.use(cors());

dotenv.config();

//load route
const userRouter = require("./route/user");
const authRouter = require("./route/auth");
const productRouter = require("./route/product");
const cartRouter = require("./route/cart");
const orderRouter = require("./route/oder");

const connectDB = require("./dbconnect");

connectDB();

//route
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("app running on port 5000");
});
