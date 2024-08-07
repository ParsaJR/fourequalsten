import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: String,
    required: true,
  },
  currentLevel: {
    type: Number,
    default: 0,
  },
});

export const User = model("User", UserSchema);
