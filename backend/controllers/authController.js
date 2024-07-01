const User = require("../models/User"); // Importar el modelo de usuario
const jwt = require("jsonwebtoken"); // Importar JWT para generar tokens de autenticación
const bcrypt = require("bcryptjs"); // Importar bcryptjs para comparar y cifrar contraseñas

// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Obtener datos del cuerpo de la solicitud

  try {
    const userExists = await User.findOne({ email }); // Verificar si el usuario ya existe en la base de datos

    if (userExists) {
      // Si el usuario ya existe, devolver un mensaje de error
      return res.status(400).json({ message: "User already exists" });
    }

    // Crear un nuevo usuario en la base de datos
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generar un token de JWT para la autenticación del usuario
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // El token expirará en 30 días
    });

    // Enviar una respuesta con el usuario creado y el token generado
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    // Capturar y manejar errores del servidor
    res.status(500).json({ message: "Server error" });
  }
};

// Controlador para autenticar y hacer login de un usuario existente
exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // Obtener datos del cuerpo de la solicitud

  try {
    const user = await User.findOne({ email }); // Buscar al usuario por su email en la base de datos

    if (user && (await bcrypt.compare(password, user.password))) {
      // Verificar credenciales de usuario
      // Si las credenciales son válidas, generar un token de JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d", // El token expirará en 30 días
      });

      // Enviar una respuesta con el usuario autenticado y el token generado
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      // Si las credenciales no son válidas, devolver un mensaje de error de autenticación
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // Capturar y manejar errores del servidor
    res.status(500).json({ message: "Server error" });
  }
};
