let tasks = [];

const addTask = (name) => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid task name');
  }
  const newTask = {
    id: Date.now(),
    name: name.trim()
  };
  tasks.push(newTask);
  return newTask;
};

const getTasks = () => {
  return tasks;
};

const deleteTask = (id) => {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  return tasks.length < initialLength;
};

const clearTasks = () => {
    tasks = [];
};

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  clearTasks
};
