import React, { useState } from "react";

const EditTask = ({ task, onUpdate }) => {
  // Estado local para el título y estado de completado del task
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);

  // Función para manejar el envío del formulario de actualización
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      // Enviar la solicitud PUT al servidor utilizando fetch
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT", // Método HTTP PUT para actualizar la tarea
        headers: {
          "Content-Type": "application/json", // Tipo de contenido JSON
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Token de autorización
        },
        body: JSON.stringify({ title, completed }), // Cuerpo de la solicitud en formato JSON
      });

      // Extraer la tarea actualizada desde la respuesta JSON
      const updatedTask = await response.json();

      // Llamar a la función onUpdate para actualizar el estado global de la tarea
      onUpdate(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error); // Manejar errores de la solicitud
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campo de entrada para el título de la tarea */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Actualizar el estado del título al cambiar
      />
      {/* Checkbox para el estado de completado de la tarea */}
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)} // Actualizar el estado de completado al cambiar
      />
      {/* Botón para enviar el formulario de actualización */}
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;
