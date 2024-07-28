const router = require("express").Router();
const passport = require("passport");
const jwtUtils = require("../utils/jwt");

require("../utils/google-auth");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/google/success", isLoggedIn, (req, res) => {
  const token = jwtUtils.createToken(req.user);
  // const username = req.user.displayName;
  const username = req.user.username;

  res.redirect(
    `${process.env.URI_FRONT}/home?token=${token}&username=${username}`
  );
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

router.get("/google/failure", (req, res) => {
  res.redirect(`${process.env.URI_FRONT}/`);
});

module.exports = router;
