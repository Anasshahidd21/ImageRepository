import mongoose from "mongoose";
import { model, Schema, Model, Document } from "mongoose";
import { IUser } from "../interfaces/user/userInterface";

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("User", UserSchema);
export default User;
