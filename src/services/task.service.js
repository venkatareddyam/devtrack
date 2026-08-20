const { createTask } = require("../models/task.model");

const tasks = [];

const addTask = ({ title, description, priority }) => {
  const task = createTask({
    title,
    description,
    priority
  });

  tasks.push(task);

  return task;
};

const getTasks = () => {
  return tasks;
};

const getTaskById = (id) => {
  return tasks.find((task) => task.id === id);
};

const updateTask = (id, updates) => {
  const task = getTaskById(id);

  if (!task) {
    return null;
  }

  if (updates.title !== undefined) {
    task.title = updates.title;
  }

  if (updates.description !== undefined) {
    task.description = updates.description;
  }

  if (updates.priority !== undefined) {
    task.priority = updates.priority;
  }

  if (updates.status !== undefined) {
    task.status = updates.status;
  }

  task.updatedAt = new Date().toISOString();

  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);

  return true;
};

module.exports = {
  addTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
