import express from "express";
import {
  ImagePermissions,
  ImageScheme,
} from "../../../interfaces/image/imageInterfaces";
import Image from "../../../models/image.model";
import authenticateToken from "../../authRoute/authentication";
const router = express.Router();

// Add bulk images
router.post("/all", authenticateToken, async (req, res) => {
  try {
    const owner = req.body.user;
    const images = req.body.images;
    for (const image of images) {
      const imageDB = new Image({ ...image, owner });
      await imageDB.save();
    }
    res.status(201).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const owner = req.body.user;
    const name = req.body.name;
    const url = req.body.url;
    const permission = req.body.permission;
    permission === "PUBLIC"
      ? ImagePermissions.PUBLIC
      : ImagePermissions.PRIVATE;
    const image = new Image({
      name,
      url,
      owner,
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

// update permissions
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const owner = req.body.user;
    const permission = req.body.permission;
    const filter = { owner, _id: req.params.id };
    const update: Partial<ImageScheme> = {
      permission:
        permission === "PUBLIC"
          ? ImagePermissions.PUBLIC
          : ImagePermissions.PRIVATE,
    };
    const image = await Image.findOneAndUpdate(filter, update);
    if (!image) {
      res.status(500).json({ message: "No image associated with this ID" });
      return;
    }
    res.status(201).json(image);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
