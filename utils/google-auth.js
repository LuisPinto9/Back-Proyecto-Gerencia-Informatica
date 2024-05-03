const passport = require("passport");

// Configuración de autenticación de Google
const User = require("../models/users-model");

// Creamos estrategia a partir del modelo
passport.use(User.createStrategy());

// serializar - deserializar /////////////////
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = { passport, User };
