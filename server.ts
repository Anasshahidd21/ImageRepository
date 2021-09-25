require("dotenv").config();

import express from "express";
const app = express();
import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.listen(3000, () => console.log("Server Started"));
