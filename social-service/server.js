const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); 
const app = express();
const port = 3001;

// Middleware para permitir CORS
app.use(cors()); 

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./database.db');

//Crear tablas
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, bio TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS friendship_requests (id INTEGER PRIMARY KEY AUTOINCREMENT, requester TEXT, requestee TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS friendships (id INTEGER PRIMARY KEY AUTOINCREMENT, user1 TEXT, user2 TEXT)");

  // ejeemplo
 // db.run('INSERT INTO users (username, password, bio) VALUES (?, ?, ?)', ['UsuarioEjemplo1', 'password123', 'Esta es la biografía del usuario de ejemplo']);
});



// Endpoint de registro de usuario
app.post('/signup', (req, res) => {
  const { username, password, bio } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  if (!/^[a-zA-Z0-9]{5,10}$/.test(username)) {
    return res.status(400).json({ error: 'Username must be 5 to 10 alphanumeric characters.' });
  }
  if (!/^[a-zA-Z0-9]{8,12}$/.test(password)) {
    return res.status(400).json({ error: 'Password must be 8 to 12 alphanumeric characters.' });
  }



  const stmt = db.prepare("INSERT INTO users (username, password, bio) VALUES (?, ?, ?)");
  stmt.run(username, password, bio || 'Default bio.', function(err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ error: 'Username already exists' });
      }
      return res.status(500).json({ error: 'Internal server error' });
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

// Endpoint de peticion de amistad
app.post('/friend-request', (req, res) => {
  const { requester, requestee } = req.body;


    // Verificar que no sea uno mismo

  if (requester === requestee) {
    return res.status(400).json({ error: 'You cannot send a friend request to yourself... find someone else.' });
  }

  // Verificar si los usuarios ya son amigos
  db.get('SELECT * FROM friendships WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)', [requester, requestee, requestee, requester], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking existing friendship' });
    }
    if (row) {
      return res.status(400).json({ error: 'You are already friends with this user' });
    }
    

  // Verificar si ya se ha enviado una solicitud de amistad
  db.get('SELECT * FROM friendship_requests WHERE requester = ? AND requestee = ?', [requester, requestee], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking friend request' });
    }
    if (row) {
      return res.status(400).json({ error: 'Friend request already sent, wait for the response' });
    }
      // Verificar si el requestee existe en la tabla users
      db.get('SELECT * FROM users WHERE username = ?', [requestee], (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Error checking user existence' });
        }
        if (!user) {
          return res.status(404).json({ error: 'The requested user does not exist' });
        }
      

      
      
      // Insertar nueva solicitud de amistad
      db.run('INSERT INTO friendship_requests (requester, requestee) VALUES (?, ?)', [requester, requestee], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Error sending friend request' });
        }
        res.json({ message: 'Friend request sent to ' + requestee });
      });
     });
    });
  });
});




// Endpoint para obtener solicitudes de amistad pendientes
app.get('/friend-requests', (req, res) => {
  const username = req.query.username;

  db.all('SELECT requester FROM friendship_requests WHERE requestee = ?', [username], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching friend requests' });
    }
    res.json(rows);
  });
});



// Endpoint de peticion de aceptar o rechazar solicitud
app.post('/accept-friend', (req, res) => {
  const { requester, requestee } = req.body;

  db.get('SELECT * FROM friendship_requests WHERE requester = ? AND requestee = ?', [requester, requestee], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking friend request' });
    }
    if (!row) {
      return res.status(400).json({ error: 'No friend request found' });
    }

    db.run('INSERT INTO friendships (user1, user2) VALUES (?, ?)', [requester, requestee], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error accepting friend request' });
      }

      db.run('DELETE FROM friendship_requests WHERE requester = ? AND requestee = ?', [requester, requestee], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Error deleting friend request' });
        }
        res.json({ message: 'Friend request accepted' });
      });
    });
  });
});

app.post('/decline-friend', (req, res) => {
  const { requester, requestee } = req.body;

  db.get('SELECT * FROM friendship_requests WHERE requester = ? AND requestee = ?', [requester, requestee], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking friend request' });
    }
    if (!row) {
      return res.status(400).json({ error: 'No friend request found' });
    }

    db.run('DELETE FROM friendship_requests WHERE requester = ? AND requestee = ?', [requester, requestee], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error deleting friend request' });
      }
      res.json({ message: 'Friend request declined' });
    });
  });
});




// Endpoint de lista de amigos

app.get('/friends', (req, res) => {
  const username = req.query.username;

  db.all('SELECT user2 AS friend FROM friendships WHERE user1 = ? UNION SELECT user1 AS friend FROM friendships WHERE user2 = ?', [username, username], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching friends' });
    }
    res.json(rows);
  });
});



app.get('/profile', (req, res) => {
  const { username } = req.query;

  db.get('SELECT username, bio, password FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user profile' });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(row);
  });
});

// // Endpoint de edicion de perfile
// app.post('/editprofile', (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).send('Username and password are required');
//   }
//   const stmt = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?");
//   stmt.get(username, password, (err, row) => {
//     if (err) {
//       return res.status(500).json({error:'Internal server error'});
//     }
//     if (!row) {
//       return res.status(400).json({error:'Invalid username or password'});
//     }
//     res.status(200).send({ id: row.id, username: row.username });
//   });
//   stmt.finalize();
// });

// Ruta raíz básica
app.get('/', (req, res) => {
  res.send('Welcome to the Social Service API');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
