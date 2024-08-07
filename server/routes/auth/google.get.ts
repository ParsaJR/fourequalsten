import { User } from "~/server/models/User";

export default oauthGoogleEventHandler({
  config: {
    authorizationParams: {
      access_type: "online",
    },
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        // gmail: user.email,
        name: user.name,
        // loggedInAt: new Date().toLocaleDateString(),
      },
    });
    const existingUser = user.email;
    if(await User.findOne({email:existingUser})){
      console.log('User Exist!!!!');
      return sendRedirect(event, "/");
    }
    else
    {
      try {
        User.create({
          name: user.name,
          email: user.email,
          lastLogin: new Date().toLocaleDateString(),
        });
      } catch (error) {
        console.log('somethings wrong',error);
      }  
    }
    return sendRedirect(event, "/");
  },
});
