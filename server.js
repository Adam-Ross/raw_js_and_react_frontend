

const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config() 

const PORT = process.env.PORT 


const pool = new Pool({
  user: 'garrettross',
  host: 'localhost',
  database: 'todo',
  password: '',
  port: 5432
})


const app = express();
app.use(cors())


app.use(express.static('./public'))
app.use(express.json());

// Define routes for CRUD operations on todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching todos from database');
  }
});

// app.post('/todos', async (req, res) => {
//   const { todo_body } = req.body;
//   try {
//     await pool.query('INSERT INTO todos (todo_body) VALUES ($1)', [todo_body]);
//     const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error inserting todo into database');
//   }
// });

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
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
    await pool.query('UPDATE todos SET todo_body = $1 WHERE id = $2', [todo_body, id]);
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating todo in database');
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
    res.status(201).json(result.rows);  
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting todo from database');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log('Server started on port 3001');
});




