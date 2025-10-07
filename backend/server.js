const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://proyectoprueba-delta.vercel.app'], // Actualiza con tu dominio real de Vercel
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Base de datos simulada (en memoria)
let users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@email.com' },
  { id: 2, name: 'María García', email: 'maria@email.com' },
  { id: 3, name: 'Carlos López', email: 'carlos@email.com' }
];

let messages = [];

// RUTAS

// GET - Obtener todos los usuarios
app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});

// GET - Obtener un usuario específico
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }
  res.json({ success: true, data: user });
});

// POST - Crear nuevo mensaje
app.post('/api/messages', (req, res) => {
  const { name, email, message } = req.body;

  // Validación
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos los campos son requeridos' 
    });
  }

  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  messages.push(newMessage);
  
  res.status(201).json({ 
    success: true, 
    message: 'Mensaje enviado correctamente',
    data: newMessage 
  });
});

// GET - Obtener todos los mensajes
app.get('/api/messages', (req, res) => {
  res.json({ success: true, data: messages });
});

// POST - Crear nuevo usuario
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nombre y email son requeridos' 
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  
  res.status(201).json({ 
    success: true, 
    message: 'Usuario creado correctamente',
    data: newUser 
  });
});

// PUT - Actualizar usuario
app.put('/api/users/:id', (req, res) => {
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }

  users[userIndex] = { ...users[userIndex], name, email };
  
  res.json({ 
    success: true, 
    message: 'Usuario actualizado',
    data: users[userIndex] 
  });
});

// DELETE - Eliminar usuario
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }

  users.splice(userIndex, 1);
  
  res.json({ 
    success: true, 
    message: 'Usuario eliminado correctamente' 
  });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API funcionando correctamente',
    endpoints: {
      users: '/api/users',
      messages: '/api/messages'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});