const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Ruta para crear un nuevo producto
router.post('/create', authMiddleware, createProduct);

// Ruta para obtener todos los productos
router.get('/readall', getAllProducts);

// Ruta para obtener un producto específico por ID
router.get('/readone/:id', getProductById);

// Ruta para actualizar un producto por ID
router.put('/update/:id', authMiddleware, updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/delete/:id', authMiddleware, deleteProduct);

module.exports = router;
