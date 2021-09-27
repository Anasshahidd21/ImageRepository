import express from "express";
const router = express.Router();
import Image from "../../../models/image.model";
import authenticateToken from "../../authRoute/authentication";

// Get all images
router.delete("/all", authenticateToken, async (req, res) => {
  try {
    const owner = req.body.user;
    const images = await Image.deleteMany({ owner });
    res.status(201).send("Deleted all the images from the repository!");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get By ID:
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const owner = req.body.user;
    const _id = req.params.id;
    const image = await Image.findOneAndDelete({ owner, _id });
    res.status(201).json(image);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
