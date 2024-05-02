const mongoose = require("mongoose");

// Conexión remota
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jandnyi.mongodb.net/HandyFix_DB`;

mongoose.set("strictQuery", false);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected with database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
