const express = require("express");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("./utils/google-auth");
const cors = require("cors")
const session = require('express-session');
// const swaggerUi = require("swagger-ui-express");
// const { swaggerSpecs } = require("./swagger");

require("dotenv").config();
require("./mongo/connect-db");

const app = express();

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    //   callbackURL: "http://localhost:3000/auth/google/dashboard",
      callbackURL: "http://localhost:4000/auth/google",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.use("/login", require("./routes/login"));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// app.use("/topics", require("./routes/topics"));
// app.use("/inscriptions", require("./routes/inscriptions"));
// app.use("/students", require("./routes/students"));

app.use("/", (req, res) =>
  res.send("API del proyecto de Gerencia Informática")
);

app.listen(app.get("PORT"), () =>
  console.log(`Server listen on PORT ${app.get("PORT")}`)
);

// Exportar la aplicación Express
module.exports = app;
