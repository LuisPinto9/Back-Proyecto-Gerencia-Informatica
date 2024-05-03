const routes = require("express").Router();
const { passport } = require("../utils/google-auth");

routes.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
routes.get(
  "/auth/google/dashboard",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Redirige al frontend con el token de sesión
    // const token = generateJWT(req.user);
    // res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    res.redirect(`http://localhost:3000/dashboard`);
  }
);

module.exports = routes;
