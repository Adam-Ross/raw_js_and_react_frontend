const express = require('express');
const { Pool } = require('pg');
const cors = require('cors')



// Create a new pool instance with your database connection details
const pool = new Pool({
  user: 'garrettross',
  host: 'localhost',
  database: 'todo',
  password: '',
  port: 5432, // default PostgreSQL port
});

// Create a new Express app
const app = express();
app.use(cors())

// Parse JSON request bodies
app.use(express.json());

// Define routes for CRUD operations on todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching todos from database');
  }
});

app.post('/todos', async (req, res) => {
  const { todo_body } = req.body;
  try {
    const result = await pool.query('INSERT INTO todos (todo_body) VALUES ($1) RETURNING *', [todo_body]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting todo into database');
  }
});

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM todos WHERE todo_id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send('Todo not found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching todo from database');
  }
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { todo_body } = req.body;
  try {
    const result = await pool.query('UPDATE todos SET todo_body = $1 WHERE todo_id = $2 RETURNING *', [todo_body, id]);
    if (result.rowCount === 0) {
      res.status(404).send('Todo not found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating todo in database');
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM todos WHERE todo_id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      res.status(404).send('Todo not found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting todo from database');
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});


