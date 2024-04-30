const express = require("express");
// const swaggerUi = require("swagger-ui-express");
// const { swaggerSpecs } = require("./swagger");

require("dotenv").config();
// require("./mongo/connect-db");

const app = express();

//setters
app.set("PORT", process.env.PORT || 4000);

//middelware
app.use(express.json());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// app.use("/topics", require("./routes/topics"));
// app.use("/inscriptions", require("./routes/inscriptions"));
// app.use("/students", require("./routes/students"));

app.use("/", (req, res) =>
  res.send("API del proyecto de Gerencia Informática")
);

app.listen(app.get("PORT"), () =>
  console.log(`Server listen on PORT ${app.get("PORT")}`)
);

// Exportar la aplicación Express
module.exports = app;
