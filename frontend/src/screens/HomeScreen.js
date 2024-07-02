import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import Header from "../components/Header";
import { Jumbotron, Button } from "react-bootstrap";
import EditTask from "../components/EditTask";

const HomeScreen = () => {
  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState([]);
  // Estado para almacenar el filtro de tareas completadas/no completadas
  const [filter, setFilter] = useState("");

  // Función para obtener las tareas del servidor
  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/tasks?completed=${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTasks(data); // Actualiza el estado con las tareas obtenidas
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Efecto para cargar las tareas al montar el componente o al cambiar el filtro
  useEffect(() => {
    fetchTasks(); // Llama a la función fetchTasks al montar y cuando cambia el filtro
  }, [filter]);

  // Función para marcar una tarea como completada
  const completeTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isCompleted: true }), // Envía la actualización como JSON
      });
      const updatedTask = await response.json();
      // Actualiza el estado de las tareas con la tarea completada
      setTasks(
        tasks.map((task) =>
          task._id === id
            ? { ...task, isCompleted: updatedTask.isCompleted }
            : task
        )
      );
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Actualiza el estado de las tareas filtrando la tarea eliminada
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <Header />
      <Jumbotron>
        <h1>Welcome to the Task Manager</h1>
        <p>Manage your tasks effectively and efficiently.</p>
        <p>
          <Button variant="primary" href="/register">
            Get Started
          </Button>
        </p>
      </Jumbotron>
      <h1>My Tasks</h1>
      {/* Mapea cada tarea para mostrarla utilizando el componente Task */}
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onComplete={completeTask}
          onDelete={deleteTask}
        />
      ))}
      {/* Incluye el componente EditTask si es necesario */}
      <EditTask task={tasks[0]} onUpdate={fetchTasks} />
    </div>
  );
};

export default HomeScreen;
