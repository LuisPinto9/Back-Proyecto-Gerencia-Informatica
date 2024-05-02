const routes = require("express").Router();
const passport = require("../utils/google-auth");

routes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
routes.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("entraaa al callback");
    // Redirige al frontend con el token de sesión
    // const token = generateJWT(req.user);
    // res.redirect(`http://localhost:3000/login?token=${token}`);
    res.redirect(`http://localhost:3000/`);
  }
);
module.exports = routes;