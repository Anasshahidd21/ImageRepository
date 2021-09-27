require("dotenv").config();

import express from "express";
const app = express();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.body.user = user;
    next();
  });
}
