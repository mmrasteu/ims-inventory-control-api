'use strict'

var express = require('express')
var InventoryController = require('../controllers/inventory.controller');

var router = express.Router();

// Middleware

// Rutas
router.post('/inventory', InventoryController.storeInventory);
router.get('/inventory/:slug', InventoryController.getInventory);
router.get('/inventories', InventoryController.getInventories);
//router.post('/inventory/add-product/:', InventoryController.addProduct);

module.exports = router;