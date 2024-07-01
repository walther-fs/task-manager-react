const mongoose = require("mongoose"); // Importar Mongoose para modelado de MongoDB
const bcrypt = require("bcryptjs"); // Importar bcryptjs para el cifrado de contraseñas

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Nombre es obligatorio
  },
  email: {
    type: String,
    required: true, // Email es obligatorio
    unique: true, // Email debe ser único
  },
  password: {
    type: String,
    required: true, // Contraseña es obligatoria
  },
});

// Middleware para cifrar la contraseña antes de guardarla
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // Verificar si la contraseña ha sido modificada
    next(); // Si no ha sido modificada, pasar al siguiente middleware
  }
  const salt = await bcrypt.genSalt(10); // Generar un salt (semilla) para el cifrado
  this.password = await bcrypt.hash(this.password, salt); // Cifrar la contraseña con el salt generado
});

const User = mongoose.model("User", userSchema); // Crear el modelo User basado en userSchema

module.exports = User; // Exportar el modelo User para su uso en otras partes de la aplicación
