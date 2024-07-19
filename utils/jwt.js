const jwt = require("jwt-simple");
const moment = require("moment");

require("dotenv").config();

const secret = process.env.SECRET;

const createToken = (user) => {
  const payload = {
    id: user.googleId,
    name: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  return jwt.encode(payload, secret);
};

module.exports = {
  secret,
  createToken,
};
