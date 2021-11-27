const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./controller/user");
const authRoute = require("./controller/auth");
const productRoute = require("./controller/product");
const cartRoute = require("./controller/cart");
const orderRoute = require("./controller/order");

dotenv.config();
mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then(() => {
    console.log("..................DB Connected..................");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log(".................Server Running.................");
});
