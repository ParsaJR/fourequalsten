import { Level } from "~/server/models/Level";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const currentLevel = await User.findOne(
    { userId: session.user.sub },
    { currentLevel: 1 }
  );
  console.log(session);
  
  const futureLevel: number = currentLevel?.currentLevel + 1;

  const IsExist = await Level.findOne({ level: futureLevel });
  if (IsExist) {
    await User.updateOne(
      { userId: session.user.sub },
      { $inc: { currentLevel: 1 } }
    );
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: "You've reached the end of the levels! More levels are coming in the future!",
      fatal: false
    });
  }
  return "All Good";
});
