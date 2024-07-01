const express = require("express"); // Importar Express para manejar rutas y middlewares
const { registerUser, loginUser } = require("../controllers/authController"); // Importar los controladores de autenticación

const router = express.Router(); // Crear una instancia de Router de Express

// Definir rutas y asociarlas a los controladores correspondientes
router.post("/register", registerUser); // Ruta POST para registrar un nuevo usuario
router.post("/login", loginUser); // Ruta POST para autenticar y hacer login de un usuario existente

module.exports = router; // Exportar el enrutador para que pueda ser utilizado por la aplicación principal
