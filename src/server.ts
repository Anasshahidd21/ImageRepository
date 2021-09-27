require("dotenv").config();

import express from "express";
const app = express();
import mongoose from "mongoose";

import getImages from "./routes/images/getImage";
import deleteImage from "./routes/images/deleteImage";
import addImage from "./routes/images/addImage";
import authRouter from "./authRoute/authserver";

import bodyParser from "body-parser";

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
