const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user-model");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_OAUTH,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.URI_BACK}/auth/google/callback`,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { googleId: profile.id },
        {
          username: profile.displayName,
          email: profile.email,
          profilePicture: profile.picture,
        },
        (err, user) => {
          return done(err, user);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
