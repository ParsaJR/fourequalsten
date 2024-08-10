import { User } from "~/server/models/User";

export default oauthGoogleEventHandler({
  config: {
    authorizationParams: {
      access_type: "online",
    },
  },
  async onSuccess(event, { user }) {
    const existingUser = user.email;
    if (await User.findOne({ email: existingUser })) {
      console.log("User Exist!!!!");
    } else {
      try {
        await User.create({
          name: user.name,
          email: user.email,
          lastLogin: new Date().toLocaleDateString(),
        });
      } catch (error) {
        console.log("somethings wrong", error);
      }
    }
    await setUserSession(event, {
      user: {
        id: await User.findOne({email: user.email}).select('_id'),
        name: user.name,
        loggedInAt: new Date().toLocaleDateString(),
      },
    });

    return sendRedirect(event, "/");
  },
});
