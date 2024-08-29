const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para registrar usuario
exports.registerUser = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
      }
      const user = new User({ nombre, email, password });
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Controlador para iniciar sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyToken = (req, res) => {
  // Busca el token en el encabezado 'Authorization'
  const token = req.header('Authorization');

  // Verifica que el token exista
  if (!token) return res.status(401).json({ msg: 'No token, autorización denegada' });

  try {
      // Elimina la palabra 'Bearer ' y verifica el token
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      res.status(200).json({ valid: true, userId: decoded.id });
  } catch (err) {
      res.status(401).json({ msg: 'Token no válido' });
  }
};


  exports.updateUser = async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user, // Suponiendo que el ID del usuario esté disponible en req.user
        { nombre, email, password },
        { new: true }
      );
      res.status(200).json({ msg: 'Información actualizada', user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

// Otros controladores como updateUser, verifyToken, etc.
