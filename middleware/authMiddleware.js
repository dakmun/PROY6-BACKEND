const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  // El encabezado Authorization debe tener el formato "Bearer token"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjuntar el ID del usuario al objeto req
    req.user = decoded.id;

    // Continuar con la siguiente función en la pila de middleware
    next();
  } catch (err) {
    // Manejar el caso de un token no válido
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = authMiddleware;
