const jwt = require("jwt-simple");
const moment = require("moment");

require("dotenv").config();

const secret = process.env.SECRET;

// Función para generar un token JWT
const createToken = (user) => {
  const payload = {
    name: user.username,
    id: user.googleId,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, secret);
};

module.exports = {
  secret,
  createToken,
};
