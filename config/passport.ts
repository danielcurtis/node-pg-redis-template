const GoogleStrategy = require('passport-google-oauth20');

export default function (passport: any) {
  passport.use(
    new GoogleStrategy(
      {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        const googleId: string = profile.id;
        const firstName: string = profile.name.givenName;
        const lastName: string = profile.name.familyName;

        try {
          // write to postgres
          // let user = someNewUserFromPostgres();
          // done(null, user);
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user: any, done: any) => done(null, user.id));
  passport.deserializeUser((id: any, done: any) => {
    // User.findById(id, (err: any, user: any) => { // this wont work... basing off mongo
    //   done(err, user);
    // })
  });
}
