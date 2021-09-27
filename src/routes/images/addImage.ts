import express from "express";
import {
  ImagePermissions,
  ImageScheme,
} from "../../../interfaces/image/imageInterfaces";
import Image from "../../../models/image.model";
import authenticateToken from "../../authRoute/authentication";
import upload from "../../../s3";
import { String } from "aws-sdk/clients/apigateway";
const router = express.Router();

// Add bulk images
router.post(
  "/all",
  upload.array("file", 10),
  authenticateToken,
  async (req, res) => {
    try {
      const owner: String = req.body.user;
      const name: String = req.body.name;
      const url: [String] = (req.files as any).map(
        (file: { location: any }) => file.location
      );
      const permission: ImagePermissions =
        req.body.permission === "PUBLIC"
          ? ImagePermissions.PUBLIC
          : ImagePermissions.PRIVATE;

      const imageDB = new Image({ owner, name, url, permission });
      await imageDB.save();
      res.status(201).json({ imageDB, message: "Successfully Posted!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post("/", upload.single("file"), authenticateToken, async (req, res) => {
  try {
    const owner: String = req.body.user;
    const name: String = req.body.name;
    const url: String[] = (req.file as any).location;
    const permission: String = req.body.permission;
    permission === "PUBLIC"
      ? ImagePermissions.PUBLIC
      : ImagePermissions.PRIVATE;
    const image = new Image({
      owner,
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
