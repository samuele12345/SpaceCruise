// Server Express con connessione PostgreSQL (pg).

const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// File statici frontend.
app.use(express.static(path.join(__dirname)));

// Pool PostgreSQL (configurare credenziali locali).
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'spacecruise',
  password: 'TomSawier2015',
  port: 5432,
});

// Endpoint lettura voli.
app.get('/api/flights', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flights');
    res.json(result.rows);
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Route principale.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
