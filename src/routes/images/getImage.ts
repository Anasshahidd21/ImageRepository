import express from "express";
import { ImagePermissions } from "../../../interfaces/image/imageInterfaces";
const router = express.Router();
import Image from "../../../models/image.model";
import authenticateToken from "../../authRoute/authentication";

/**
 * Endpoint: /get/
 * Endpoint for getting all the images that are public.
 * Authenticates the user before performing any action.
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = req.body.user;
    const images = await Image.find({ permission: ImagePermissions.PUBLIC });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Endpoint: /get/:id
 * Endpoint for getting image with an ID.
 * Authenticates the user before performing any action.
 */
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
