const express = require("express");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate")
const passport = require("passport");
// const swaggerUi = require("swagger-ui-express");
// const { swaggerSpecs } = require("./swagger");

require("dotenv").config();
// require("./mongo/connect-db");

const app = express();

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(express.json());

// Configuración de autenticación de Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/dashboard",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

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
