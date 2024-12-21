const express = require('express');
const { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/create', createProduct);
router.put('/update', updateProduct);
router.delete('/delete', deleteProduct);

module.exports = router;
