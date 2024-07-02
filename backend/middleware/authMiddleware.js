const jwt = require("jsonwebtoken"); // Importa la biblioteca jsonwebtoken para manejar tokens JWT
const User = require("../models/User"); // Importa el modelo de usuario para consultar en la base de datos

// Middleware protect: verifica y protege las rutas que requieren autenticación
const protect = async (req, res, next) => {
  let token; // Variable para almacenar el token JWT

  // Verifica si existe la cabecera Authorization y si comienza con "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extrae el token de la cabecera Authorization
      token = req.headers.authorization.split(" ")[1];

      // Verifica y decodifica el token usando el JWT_SECRET definido en el entorno
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca al usuario en la base de datos por su ID almacenado en el token
      // Excluye el campo password del usuario en la respuesta
      req.user = await User.findById(decoded.id).select("-password");

      // Llama a la siguiente función en la cadena de middleware
      next();
    } catch (error) {
      // Si hay algún error en la verificación del token, responde con un estado de 401 (No autorizado)
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // Si no se encuentra ningún token válido
  if (!token) {
    // Responde con un estado de 401 (No autorizado) y un mensaje correspondiente
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Exporta el middleware protect para ser utilizado en otras partes de la aplicación
module.exports = { protect };
