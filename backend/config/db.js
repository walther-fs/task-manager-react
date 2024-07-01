const mongoose = require("mongoose"); // Importamos la biblioteca Mongoose para interactuar con MongoDB
const dotenv = require("dotenv"); // Importamos dotenv para cargar variables de entorno desde un archivo .env

dotenv.config(); // Cargamos las variables de entorno definidas en el archivo .env en el proceso de Node.js

const connectDB = async () => {
  // Definimos una función asincrónica llamada connectDB para conectar a la base de datos
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // Conectamos a MongoDB usando la URI de conexión definida en .env
      useNewUrlParser: true, // Opciones para garantizar la compatibilidad con las nuevas versiones de MongoDB
      useUnifiedTopology: true, // Opciones para usar un nuevo motor de topología unificada en Mongoose
    });
    console.log("MongoDB connected..."); // Mensaje de éxito si la conexión es exitosa
  } catch (error) {
    console.error("Error connecting to MongoDB:", error); // Manejo de errores si la conexión falla
    process.exit(1); // Salimos del proceso de Node.js con código de salida 1 (indicando un error)
  }
};

module.exports = connectDB; // Exportamos la función connectDB para poder utilizarla desde otros archivos
