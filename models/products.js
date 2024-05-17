'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProductsSchema = Schema({
    sku_code: String,
    stock: Number,
    warning_stock: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Products', ProductsSchema)