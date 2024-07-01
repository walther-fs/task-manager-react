const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({
      user: req.user.id,
      title,
      description,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.isCompleted =
      isCompleted !== undefined ? isCompleted : task.isCompleted;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await task.remove();
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
