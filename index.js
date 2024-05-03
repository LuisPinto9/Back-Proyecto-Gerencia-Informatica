const express = require("express");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const session = require("express-session");

require("dotenv").config();
require("./mongo/connect-db");

const app = express();

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

const { passport } = require("./utils/google-auth");

app.use(passport.initialize());
app.use(passport.session());

const {  User } = require("./utils/google-auth")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/dashboard",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // User.findOrCreate(
      //   { googleId: profile.id },
      //   { username: profile.displayName },
      //   function (err, user) {
      //     return cb(err, user);
      //   }
      // );
    }
  )
);

app.use("/login", require("./routes/login"));

app.use("/", (req, res) =>
  res.send("API del proyecto de Gerencia Informática")
);

app.listen(app.get("PORT"), () =>
  console.log(`Server listen on PORT ${app.get("PORT")}`)
);

module.exports = app;
