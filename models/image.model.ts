import mongoose from "mongoose";
import { model, Schema, Model, Document } from "mongoose";
import {
  ImagePermissions,
  ImageScheme,
} from "../interfaces/image/imageInterfaces";

const ImageSchema: Schema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: [String],
    required: true,
  },
  permission: {
    type: ImagePermissions,
    required: true,
  },
});

const Image = model<ImageScheme>("Image", ImageSchema);
export default Image;
