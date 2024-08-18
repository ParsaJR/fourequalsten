import { Level } from "~/server/models/Level";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const userLevel = await User.findOne({ userId: session.user.sub },).select({
    currentLevel: 1,
    _id: 0
  });
  const allLevelCount = await Level.find().countDocuments();
  if(userLevel != null && allLevelCount != null)
  return [userLevel.currentLevel,allLevelCount];
});
