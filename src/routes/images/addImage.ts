import express from "express";
import { ImagePermissions } from "../../../interfaces/image/imageInterfaces";
const router = express.Router();
import Image from "../../../models/image.model";

// Add bulk images
router.post("/all", async (req, res) => {
  try {
    const images = req.body.images;
    for (const image of images) {
      const imageDB = new Image({ ...image });
      await imageDB.save();
    }
    res.status(201).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const url = req.body.url;
    const permission = req.body.permission;
    permission === "PUBLIC"
      ? ImagePermissions.PUBLIC
      : ImagePermissions.PRIVATE;
    const image = new Image({
      name,
      url,
      permission:
        permission === "PUBLIC"
          ? ImagePermissions.PUBLIC
          : ImagePermissions.PRIVATE,
    });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update by ID
router.put("/:id", async (req, res) => {
  try {
    const permission = req.body.permission;
    const update = {
      permission:
        permission === "PUBLIC"
          ? ImagePermissions.PUBLIC
          : ImagePermissions.PRIVATE,
    };
    const image = await Image.findByIdAndUpdate(req.params.id, update);
    res.status(201).json(image);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
