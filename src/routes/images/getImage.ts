import express from "express";
const router = express.Router();
import Image from "../../../models/image.model";

// Get all images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get By ID:
router.get("/:id", async (req, res) => {
  let image;
  try {
    image = await Image.findById(req.params.id);
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
