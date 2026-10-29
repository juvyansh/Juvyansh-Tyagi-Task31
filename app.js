const express = require('express');
const { randomUUID } = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '100kb' }));

// In-memory sample data for demonstrating API behavior.
// IMPORTANT: tasks reset when the server restarts. Use a database for persistence.
let tasks = [
  {
    id: 'task-1',
    title: 'Learn Express.js',
    description: 'Understand routes and HTTP methods',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'To-Do List API is running',
    student: 'Juvyansh Tyagi',
    endpoints: {
      health: 'GET /health',
      listTasks: 'GET /api/tasks',
      createTask: 'POST /api/tasks',
      getOneTask: 'GET /api/tasks/:id',
      replaceTask: 'PUT /api/tasks/:id',
      partiallyUpdateTask: 'PATCH /api/tasks/:id',
      deleteTask: 'DELETE /api/tasks/:id'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/tasks', (req, res) => {
  let result = tasks;
  if (req.query.completed === 'true') result = result.filter(task => task.completed);
  if (req.query.completed === 'false') result = result.filter(task => !task.completed);
  res.status(200).json(result);
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(item => item.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: { code: 'TASK_NOT_FOUND', message: 'No task was found with that ID.' } });
  }
  return res.status(200).json(task);
});

app.post('/api/tasks', (req, res) => {
  const { title, description = '' } = req.body || {};
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'A non-empty title is required.' } });
  }
  if (typeof description !== 'string') {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Description must be a string.' } });
  }

  const now = new Date().toISOString();
  const task = {
    id: randomUUID(),
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: now,
    updatedAt: now
  };
  tasks.push(task);
  return res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(item => item.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: { code: 'TASK_NOT_FOUND', message: 'No task was found with that ID.' } });
  }

  const { title, description = '', completed = false } = req.body || {};
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'A non-empty title is required.' } });
  }
  if (typeof description !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Description must be a string and completed must be a Boolean.' } });
  }

  task.title = title.trim();
  task.description = description.trim();
  task.completed = completed;
  task.updatedAt = new Date().toISOString();
  return res.status(200).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(item => item.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: { code: 'TASK_NOT_FOUND', message: 'No task was found with that ID.' } });
  }

  const body = req.body || {};
  const allowed = ['title', 'description', 'completed'];
  const keys = Object.keys(body);
  if (keys.length === 0 || keys.some(key => !allowed.includes(key))) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Provide at least one supported field: title, description, completed.' } });
  }
  if ('title' in body && (typeof body.title !== 'string' || !body.title.trim())) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Title must be a non-empty string.' } });
  }
  if ('description' in body && typeof body.description !== 'string') {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Description must be a string.' } });
  }
  if ('completed' in body && typeof body.completed !== 'boolean') {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Completed must be a Boolean.' } });
  }

  if ('title' in body) task.title = body.title.trim();
  if ('description' in body) task.description = body.description.trim();
  if ('completed' in body) task.completed = body.completed;
  task.updatedAt = new Date().toISOString();
  return res.status(200).json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(item => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: { code: 'TASK_NOT_FOUND', message: 'No task was found with that ID.' } });
  }
  tasks.splice(index, 1);
  return res.status(204).send();
});

// Consistent JSON response for malformed JSON and unexpected errors.
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: { code: 'INVALID_JSON', message: 'Request body must contain valid JSON.' } });
  }
  console.error(err);
  return res.status(500).json({ error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected server error occurred.' } });
});

app.listen(PORT, () => {
  console.log(`To-Do List API listening on port ${PORT}`);
});
