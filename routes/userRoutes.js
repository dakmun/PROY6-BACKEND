const express = require('express');
const { 
  registerUser, 
  loginUser, 
  verifyToken, 
  updateUser 
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para verificar el token
router.get('/verifytoken', authMiddleware, verifyToken);

// Ruta para actualizar información del usuario
router.put('/update', authMiddleware, updateUser);

module.exports = router;
