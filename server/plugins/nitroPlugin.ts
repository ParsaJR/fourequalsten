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
      { level: 3, levelNumbers: [7, 1, 1, 1] },
      { level: 4, levelNumbers: [9, 9, 9, 9] },
      { level: 5, levelNumbers: [9, 9, 9, 9] },
    ]);
  } catch (error) {
    console.log(error);
  }
}
