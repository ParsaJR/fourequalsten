import mongoose from "mongoose";
import { Level } from "../models/Level";

export default defineNitroPlugin(async (nitroapp) => {
  const config = useRuntimeConfig();
  try {
    await mongoose.connect(config.mongodbUri);
    if ((await Level.countDocuments()) === 0) {
      populateLevels();
    }
    console.log("server connected !!!!");
  } catch (error) {
    console.log(error);
  }
});

async function populateLevels() {
  try {
    await Level.insertMany([
      { level: 1, levelNumbers: [1, 2, 3, 4] },
      { level: 2, levelNumbers: [9, 1, 5, 5] },
      { level: 3, levelNumbers: [2, 2, 2, 5] },
      { level: 4, levelNumbers: [2, 5, 1, 7] },
      { level: 5, levelNumbers: [6, 2, 6, 5] },
    ]);
  } catch (error) {
    console.log(error);
  }
}
