const express = require("express"); // Importa Express para configurar las rutas
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController"); // Importa los controladores de tareas desde taskController.js
const { protect } = require("../middleware/authMiddleware"); // Importa el middleware de autenticación

const router = express.Router(); // Crea un nuevo enrutador de Express

// Rutas para manipular tareas
router.route("/").get(protect, getTasks).post(protect, createTask);

// Ruta dinámica para manipular una tarea específica por su ID
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router; // Exporta el enrutador para ser utilizado por la aplicación de Express
