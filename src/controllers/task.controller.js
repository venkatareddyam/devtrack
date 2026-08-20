const taskService = require("../services/task.service");

const createTask = (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Task title is required"
    });
  }

  const task = taskService.addTask({
    title: title.trim(),
    description,
    priority
  });

  return res.status(201).json(task);
};

const listTasks = (req, res) => {
  return res.status(200).json(taskService.getTasks());
};

const getTask = (req, res) => {
  const task = taskService.getTaskById(req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  return res.status(200).json(task);
};

const updateTask = (req, res) => {
  const task = taskService.updateTask(req.params.id, req.body);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  return res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const deleted = taskService.deleteTask(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  return res.status(204).send();
};

module.exports = {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask
};
