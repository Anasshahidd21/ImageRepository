import express from "express";
const router = express.Router();
import Image from "../../../models/image.model";
import authenticateToken from "../../authRoute/authentication";

// Get all images
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = req.body.user;
    const images = await Image.find({ owner: user });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get By ID:
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const image = await Image.findOne({
      _id: req.params.id,
      owner: req.body.user,
    });

    if (!image) {
      return res
        .status(404)
        .json({ message: "No Image associated with this ID" });
    } else {
      res.json(image);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
