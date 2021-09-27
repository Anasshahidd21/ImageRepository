import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { ACCESS_KEY, SECRET_KEY, S3_BUCKET_REGION } from "./s3details";

const s3 = new aws.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: S3_BUCKET_REGION,
});

const upload = (bucket: string, image: string) => {
  multer({
    storage: multerS3({
      s3,
      bucket,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `${image}-${Date.now()}.jpeg`);
      },
    }),
  });
};

export default upload;
