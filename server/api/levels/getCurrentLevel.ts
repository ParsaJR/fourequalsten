import { Level } from "~/server/models/Level";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const userlevel = await User.findById(session.user?.id).select({
    _id: 0,
    currentLevel: 1,
  });
  const userLevelNumbers = await Level.findOne({
    level: userlevel?.currentLevel,
  }).select({ _id: 0, levelNumbers: 1 });
  return userLevelNumbers?.levelNumbers;
});
