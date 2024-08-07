import { model, Schema } from "mongoose";

const LevelSchema = new Schema({
  level: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  levelNumbers: {
    type: [Number],
    required: true
  },
});

export const Level = model("Level", LevelSchema);
