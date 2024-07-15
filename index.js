const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const multer =require("multer")

require("dotenv").config();
require("./mongo/connect-db");
require("./utils/google-auth");

const app = express();

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(cors());
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/login"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/users", require("./routes/users"));

app.use("/", (req, res) =>
  res.send("API del proyecto de Gerencia Informática")
);

app.listen(app.get("PORT"), () =>
  console.log(`Server listen on port: ${app.get("PORT")}`)
);
