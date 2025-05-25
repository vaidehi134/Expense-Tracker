// import dotenv from "dotenv";
// dotenv.config();  // <-- must run before importing anything else
import "./config.js";  // This loads .env immediately

import express from "express";
import mongoose from "mongoose";
import productRoute from "./route/product.route.js";
import budgetRoute from "./route/budget.route.js";
import authRoute from "./route/auth.route.js";
import cors from "cors";

console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Database");
    app.use("/auth", authRoute);
    app.use("/product", productRoute);

    app.use("/budget", budgetRoute);

    app.listen(port, () => {
      console.log("Server started @", port);
    });
  });
