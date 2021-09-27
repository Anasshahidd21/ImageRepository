require("dotenv").config();

import express from "express";
const app = express();
import mongoose from "mongoose";

// import * as addImageRouter from "./routes/addImage";
import getImages from "./routes/images/getImage";
import deleteImage from "./routes/images/deleteImage";
import addImage from "./routes/images/addImage";
import authRouter from "./authRoute/authserver";
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.k1n60.mongodb.net/images?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("Connected to Database");
});

app.use(express.json());

app.use("/get", getImages);
app.use("/delete", deleteImage);
app.use("/add", addImage);
app.use(authRouter);

app.listen(3000, () => console.log("Server Started"));
