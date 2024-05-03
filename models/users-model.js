const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { 
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
