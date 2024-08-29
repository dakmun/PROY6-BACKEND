const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Leer el encabezado Authorization
  const token = req.header('Authorization');

  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  try {
    // Eliminar "Bearer " de la cadena del token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded.id; // Establecer el ID del usuario en la solicitud
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = authMiddleware;
