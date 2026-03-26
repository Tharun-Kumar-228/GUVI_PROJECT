const express = require('express');
const path = require('path');
const taskManager = require('./taskManager');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoints
app.post('/addTask', (req, res) => {
  try {
    const { name } = req.body;
    const newTask = taskManager.addTask(name);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/tasks', (req, res) => {
  res.json(taskManager.getTasks());
});

app.delete('/task/:id', (req, res) => {
  const { id } = req.params;
  const deleted = taskManager.deleteTask(id);
  if (deleted) {
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
