require("dotenv").config();
import { ACCESS_KEY, SECRET_KEY, S3_BUCKET_REGION } from "./s3details";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import shortid from "shortid";

export const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const fileFilter = (
  _req: any,
  file: { mimetype: string },
  cb: (arg0: Error, arg1: boolean) => void
) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: "myshopifybucket",
    metadata: function (req, _file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, `image-${shortid.generate()}${Date.now()}.jpeg`);
    },
  }),
});

export default upload;
