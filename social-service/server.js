const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Agregar esta línea
const app = express();
const port = 3001;

// Middleware para permitir CORS
app.use(cors()); // Agregar esta línea

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./database.db');

// Crear tablas
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS friendships (id INTEGER PRIMARY KEY AUTOINCREMENT, requester_id INTEGER, receiver_id INTEGER, status TEXT)");
});

// Endpoint de registro de usuario
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  stmt.run(username, password, function(err) {
    if (err) {
      return res.status(400).send('Username already exists');
    }
    res.status(201).send({ id: this.lastID, username });
  });
  stmt.finalize();
});

// Ruta raíz básica
app.get('/', (req, res) => {
  res.send('Welcome to the Social Service API');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
