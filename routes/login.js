const router = require("express").Router();
const passport = require("passport");
require("../utils/google-auth");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/protected", isLoggedIn, (req, res) => {
  console.log(req);
  res.send(`Hello ${req.user.displayName}`);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

module.exports = router;
