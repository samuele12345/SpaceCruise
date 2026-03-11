// Simple Express server connecting to PostgreSQL via node-postgres (pg)
// To use this:
//   1. install dependencies: `npm install express pg`
//   2. ensure PostgreSQL is running and you have created a database/table via pgAdmin
//   3. run `node server.js` (or use nodemon for auto-reload)

const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// configure static files so you can serve your HTML/CSS/JS
app.use(express.static(path.join(__dirname)));

// create a connection pool - update with your pgAdmin credentials
const pool = new Pool({
  user: 'postgres',        // pgAdmin username
  host: 'localhost',       // your database host
  database: 'spacecruise', // the database you created
  password: 'TomSawier2015',
  port: 5432,
});

// an example endpoint to fetch flights from a table named "flights"
app.get('/api/flights', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flights');
    res.json(result.rows);
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// fallback serve home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
