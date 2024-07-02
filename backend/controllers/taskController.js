const Task = require("../models/Task"); // Importa el modelo Task para interactuar con la base de datos

// Controlador para obtener tareas filtradas por usuario y completadas
exports.getTasks = async (req, res) => {
  const { completed } = req.query; // Obtiene el parámetro de consulta "completed" de la solicitud

  try {
    // Busca tareas en la base de datos que pertenezcan al usuario actual y opcionalmente filtradas por "completed"
    const tasks = await Task.find({
      user: req.user.id, // Filtra por el ID del usuario almacenado en req.user desde el middleware protect
      ...(completed !== undefined && { completed }), // Operador spread para incluir el filtro completed si está definido
    });
    res.json(tasks); // Responde con las tareas encontradas en formato JSON
  } catch (error) {
    res.status(500).json({ message: "Server error" }); // Responde con un error 500 si hay un problema en el servidor
  }
};

// Controlador para crear una nueva tarea
exports.createTask = async (req, res) => {
  const { title, description } = req.body; // Obtiene title y description del cuerpo de la solicitud

  try {
    // Crea una nueva instancia de Task utilizando los datos proporcionados y el ID de usuario del middleware protect
    const task = new Task({
      user: req.user.id,
      title,
      description,
    });

    // Guarda la nueva tarea en la base de datos
    const createdTask = await task.save();
    res.status(201).json(createdTask); // Responde con la tarea creada y un estado 201 (creado)
  } catch (error) {
    res.status(500).json({ message: "Server error" }); // Responde con un error 500 si hay un problema en el servidor
  }
};

// Controlador para actualizar una tarea existente por su ID
exports.updateTask = async (req, res) => {
  const { id } = req.params; // Obtiene el ID de la tarea de los parámetros de la solicitud
  const { title, description, isCompleted } = req.body; // Obtiene title, description y isCompleted del cuerpo de la solicitud

  try {
    // Busca la tarea por su ID en la base de datos
    const task = await Task.findById(id);

    // Verifica si la tarea existe
    if (!task) {
      return res.status(404).json({ message: "Task not found" }); // Responde con un error 404 si la tarea no existe
    }

    // Verifica si el usuario actual es el propietario de la tarea
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" }); // Responde con un error 401 si el usuario no está autorizado
    }

    // Actualiza los campos de la tarea con los datos proporcionados o mantiene los valores actuales si no se proporcionan
    task.title = title || task.title;
    task.description = description || task.description;
    task.isCompleted =
      isCompleted !== undefined ? isCompleted : task.isCompleted;

    // Guarda la tarea actualizada en la base de datos
    const updatedTask = await task.save();
    res.json(updatedTask); // Responde con la tarea actualizada en formato JSON
  } catch (error) {
    res.status(500).json({ message: "Server error" }); // Responde con un error 500 si hay un problema en el servidor
  }
};

// Controlador para eliminar una tarea por su ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params; // Obtiene el ID de la tarea de los parámetros de la solicitud

  try {
    // Busca la tarea por su ID en la base de datos
    const task = await Task.findById(id);

    // Verifica si la tarea existe
    if (!task) {
      return res.status(404).json({ message: "Task not found" }); // Responde con un error 404 si la tarea no existe
    }

    // Verifica si el usuario actual es el propietario de la tarea
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" }); // Responde con un error 401 si el usuario no está autorizado
    }

    // Elimina la tarea de la base de datos
    await task.remove();
    res.json({ message: "Task removed" }); // Responde con un mensaje indicando que la tarea fue eliminada correctamente
  } catch (error) {
    res.status(500).json({ message: "Server error" }); // Responde con un error 500 si hay un problema en el servidor
  }
};
