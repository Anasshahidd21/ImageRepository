import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/user.model";
import { IUser } from "../../interfaces/user/userInterface";
require("dotenv").config();

const router = express.Router();

/**
 * Endpoint to login user
 * This is one of the first entry points, because non-authorized users can't do anything.
 */
router.post("/login", async (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = await User.findOne({ username });
  if (!user) {
    const message = "No users associated with this username";
    res.status(500).json({ message });
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    res.status(500).json({ message: "Invalid password!" });
    return;
  }
  //
  const accessToken = generateAccessToken(username);
  res.json({ accessToken, message: "Successfully Authenticated!" });
});

/**
 * Endpoint for user signup, if they don't exist in the system.
 * Only unique usernames are added, duplicacy is not allowed(used as primary)
 */
router.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const isUserFound = await User.exists({ username });
    if (isUserFound) {
      const message =
        "This username is already taken, please choose another one!";
      res.json({ message });
      return;
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/**
 * Utility function to assign a token to the user.
 * @param user username of the user.
 * @returns a signed access token.
 */
function generateAccessToken(user: string) {
  return jwt.sign(user, process.env.JWT_SECRET);
}

export default router;
