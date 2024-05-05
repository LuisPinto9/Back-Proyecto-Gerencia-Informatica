const jwt = require("jwt-simple");
const moment = require("moment");
const libjwt = require("./jwt");
const secret = libjwt.secret;

exports.auth = (req, res, next) => {
  const localStorageKey = req.headers.authorization;

  if (!localStorageKey) {
    return res.status(403).send({
      status: "error",
      message: "La clave de autenticación no está presente en localStorage.",
    });
  }

  // Comprueba si llega la cabecera de autenticación
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "La petición no tiene la cabecera de autenticación.",
    });
  }
  
  // Decodificar el token
  try {
    let payload = jwt.decode(localStorageKey, secret);
    // Comprobar expiración
    if (payload.exp <= moment().unix()) {
      return res.status(404).send({
        status: "error",
        message: "Token expirado",
      });
    }

    // Datos de usuario a la request
    req.user = payload;
  } catch (error) {
    return res.status(401).send({
      status: "error",
      message: "Token inválido",
    });
  }

  // Pasar la ejecución de la acción
  next();
};
