const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); 
const app = express();
const port = 3001;

// Middleware para permitir CORS
app.use(cors()); /

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
  if (!/^[a-zA-Z0-9]{5,10}$/.test(username)) {
    return res.status(400).json({ error: 'Username must be 5 to 10 alphanumeric characters.' });
  }

  if (!/^[a-zA-Z0-9]{8,12}$/.test(password)) {
    return res.status(400).json({ error: 'Password must be 8 to 12 alphanumeric characters.' });
  }
  const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  stmt.run(username, password, function(err) {
    if (err) {
      return res.status(400).json({error:'Username already exists'});
    }
    res.status(201).send({ id: this.lastID, username });
  });
  stmt.finalize();
});
// Endpoint de inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?");
  stmt.get(username, password, (err, row) => {
    if (err) {
      return res.status(500).json({error:'Internal server error'});
    }
    if (!row) {
      return res.status(400).json({error:'Invalid username or password'});
    }
    res.status(200).send({ id: row.id, username: row.username });
  });
  stmt.finalize();
});
app.get('/profile', (req, res) => {
  // Aquí sacar los valores de la base de datos
  const user = {
    username: 'UsuarioEjemplo',
    bio: 'Esta es la biografía del usuario ejemplo',
    password: '1234'
  };
  res.json(user);
});

// Ruta raíz básica
app.get('/', (req, res) => {
  res.send('Welcome to the Social Service API');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
