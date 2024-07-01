const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Cargar variables de entorno desde el archivo .env
connectDB(); // Conectar a la base de datos MongoDB

const app = express();
app.use(express.json()); // Habilita el análisis del cuerpo de las solicitudes entrantes como JSON
app.use(cors()); // Habilita CORS para todas las rutas de la aplicación

// Importar rutas de autenticación
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
// Usar las rutas de autenticación en la aplicación Express
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000; // Obtener el puerto del entorno o usar el puerto 5000 por defecto

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
