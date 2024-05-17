'use strict'
var Product = require('../models/products')

var controller = {

    storeProduct: function(req, res){
        var storeProduct = new Product()
        var params = req.body;

        storeProduct.sku_code       = params.sku_code;
        storeProduct.stock          = params.stock;
        storeProduct.warning_stock  = params.warning_stock;
 
        storeProduct.save()
        .then(() => {
            return res.status(201).send({message: "Product stored"});
        })
        .catch(() =>{
            return res.status(500).send({message: "Error product cannot be stored"});
        })
    },
    getProducts: function(req,res){
        Product.find({}).sort('-created_at').exec()
        .then((products) => {
            res.status(200).send(products);
        })
        .catch(() => {
            return res.status(500).send({message: "An error ocurrered to get products"});
        });
    }
}

module.exports = controller 
