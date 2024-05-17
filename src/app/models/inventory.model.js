'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var InventorySchema = Schema({
    name: { type: String, unique: true },
    description:String,
    products:{
        sku_code: String,
        stock: Number,
        warning_stock: Number
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', InventorySchema)