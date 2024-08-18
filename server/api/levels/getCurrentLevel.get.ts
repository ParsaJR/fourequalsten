import { Level } from "~/server/models/Level";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const userlevel = await User.findOne(
    { userId: session.user.sub },
    { currentLevel: 1 }
  );
  const userLevelNumbers = await Level.findOne({
    level: userlevel?.currentLevel,
  }).select({ _id: 0, levelNumbers: 1 });
  return userLevelNumbers?.levelNumbers;
});
