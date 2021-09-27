import express from "express";
const router = express.Router();
import Image from "../../../models/image.model";
import authenticateToken from "../../authRoute/authentication";

// Get all images
router.delete("/all", authenticateToken, async (req, res) => {
  try {
    const images = await Image.deleteMany({});
    res.status(201).send("Deleted all the images from the repository!");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get By ID:
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    await Image.findByIdAndRemove(req.params.id);
    res.status(201).json(image);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
