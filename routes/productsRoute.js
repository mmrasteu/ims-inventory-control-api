'use strict'

var express = require('express')
var ProductController = require('../controllers/productsController')

var router = express.Router();

// Middleware

// Rutas
router.post('/store-product', ProductController.storeProduct);
router.get('/products', ProductController.getProducts);

module.exports = router;