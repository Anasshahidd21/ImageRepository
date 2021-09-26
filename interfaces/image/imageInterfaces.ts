import { Document } from "mongoose";

export enum ImagePermissions {
  PUBLIC,
  PRIVATE,
}

export interface ImageScheme extends Document {
  name: string;
  url: string;
  permission: ImagePermissions;
}
