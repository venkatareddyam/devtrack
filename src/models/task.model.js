const createTask = ({ title, description = "", priority = "medium" }) => {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title,
    description,
    priority,
    status: "pending",
    createdAt: now,
    updatedAt: now
  };
};

module.exports = {
  createTask
};
