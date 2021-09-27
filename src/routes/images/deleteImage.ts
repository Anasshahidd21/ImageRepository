import express from "express";
const router = express.Router();
import Image from "../../../models/image.model";
import authenticateToken from "../../authRoute/authentication";
import { s3 } from "../../../s3";
import url from "url";
require("dotenv").config();

/**
 * Endpoint: /delete/all
 * Endpoint for deleting all the images created by the user.
 * Authenticates the user before performing any action.
 */
router.delete("/all", authenticateToken, async (req, res) => {
  try {
    const owner = req.body.user;
    const images = await Image.find({ owner });
    for (const image of images) {
      const urls = image.url;
      for (const uri of urls) {
        const pathname = url.parse(uri).pathname.slice(1);
        var params = { Bucket: process.env.BUCKET, Key: pathname };
        s3.deleteObject(params, function (err, data) {
          if (err) console.log(err, err.stack);
        });
      }
    }
    await Image.deleteMany({ owner });
    res
      .status(201)
      .send({ message: "Deleted all the images from the repository!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Endpoint: /delete/:id
 * Endpoint for deleting the images created by the user with a specific id.
 * Authenticates the user before performing any action.
 */
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const owner = req.body.user;
    const _id = req.params.id;
    const image = await Image.findOneAndDelete({ owner, _id });
    const urls = image.url;
    for (const uri of urls) {
      const pathname = url.parse(uri).pathname.slice(1);
      var params = { Bucket: process.env.BUCKET, Key: pathname };
      s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
      });
    }
    res.status(201).json({ image, message: "Files successfully deleted!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
