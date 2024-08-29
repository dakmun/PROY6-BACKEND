const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Agregar log para verificar el valor del encabezado Authorization
  const token = req.header('Authorization');
  console.log('Authorization Header:', token);  // <-- Agrega este log

  if (!token) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  try {
    // Verifica si el token tiene la estructura correcta y se puede decodificar
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);  // <-- Agrega este log
    req.user = decoded.id;
    next();
  } catch (err) {
    console.log('JWT Error:', err.message);  // <-- Agrega este log para ver cualquier error relacionado con JWT
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = authMiddleware;
