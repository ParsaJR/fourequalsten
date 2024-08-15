import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  userId:{
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
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
    required: true,
    default: 1,
  },
});

export const User = model("User", UserSchema);
