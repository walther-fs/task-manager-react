const mongoose = require("mongoose"); // Importa Mongoose para la modelación de datos

// Define el esquema de la tarea utilizando mongoose.Schema
const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Tipo de dato para el ID del usuario relacionado
      required: true, // Campo obligatorio
      ref: "User", // Referencia al modelo de usuario
    },
    title: {
      type: String, // Tipo de dato para el título de la tarea
      required: true, // Campo obligatorio
    },
    description: {
      type: String, // Tipo de dato para la descripción de la tarea
    },
    isCompleted: {
      type: Boolean, // Tipo de dato para el estado de completado de la tarea
      default: false, // Valor por defecto cuando no se especifica
    },
  },
  {
    timestamps: true, // Opción para añadir timestamps automáticamente (createdAt, updatedAt)
  }
);

// Define el modelo de Task utilizando el esquema creado
const Task = mongoose.model("Task", taskSchema);

module.exports = Task; // Exporta el modelo de Task para ser utilizado en otras partes de la aplicación
