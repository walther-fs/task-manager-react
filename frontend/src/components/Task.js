import React from "react";

const Task = ({ task, onComplete, onDelete }) => {
  return (
    <div>
      {/* Título de la tarea */}
      <h3>{task.title}</h3>
      {/* Descripción de la tarea */}
      <p>{task.description}</p>
      {/* Botón para marcar la tarea como completada */}
      <button onClick={() => onComplete(task._id)}>Complete</button>
      {/* Botón para eliminar la tarea */}
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default Task;
