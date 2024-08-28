// Importación del modelo de Producto
const Product = require('../models/productModel');

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    try {
      const newProduct = new Product({
        nombre,
        descripcion,
        precio,
        userId: req.user, // Suponiendo que req.user contiene el ID del usuario autenticado
      });
      const savedProduct = await newProduct.save();
      res.status(201).json({ msg: 'Producto creado exitosamente', product: savedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { nombre, descripcion, precio },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
      }
      res.status(200).json({ msg: 'Producto actualizado exitosamente', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
      }
      res.status(200).json({ msg: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  

// Leer todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los productos', error: error.message });
  }
};

// Leer un producto específico por ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el producto', error: error.message });
  }
};

// Actualizar un producto por ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { nombre, descripcion, precio },
      { new: true } // Para devolver el producto actualizado
    );
    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.status(200).json({ msg: 'Producto actualizado exitosamente', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar el producto', error: error.message });
  }
};

// Eliminar un producto por ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.status(200).json({ msg: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar el producto', error: error.message });
  }
};
