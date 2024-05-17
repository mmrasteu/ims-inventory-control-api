'use strict'
var Inventory = require('../models/inventory.model')

var controller = {
    storeInventory: async function(req, res) {
        try {
            var inventory = new Inventory();
            var params = req.body;
    
            if (!params.name || typeof params.name !== 'string') {
                return res.status(400).json({ error: 'El campo "name" es obligatorio y debe ser texto' });
            }
    
            if (params.description && typeof params.description !== 'string') {
                return res.status(400).json({ error: 'El campo "description" debe ser texto' });
            }
    
            inventory.name = params.name;
            inventory.description = params.description;
            inventory.products = {};
    
            const inventoryStored = await inventory.save();
            
            if (!inventoryStored) {
                return res.status(404).json({ error: 'No se ha podido guardar el inventario' });
            }
            
            return res.status(200).json({ inventory: inventoryStored });
        } catch (err) {
            return res.status(500).json({ error: 'Error al guardar el inventario' });
        }
    },
    getInventory: async function(req, res) {
        try {
            const inventoryName = req.params.name;
    
            if (!inventoryName) {
                return res.status(400).send({ message: 'Nombre del inventario no proporcionado' });
            }
    
            const inventory = await Inventory.findOne({ name: inventoryName });
    
            if (!inventory) {
                return res.status(404).send({ message: `No se ha encontrado el inventario ${inventoryName}` });
            }
    
            return res.status(200).send({ inventory });
        } catch (error) {
            console.error('Error al devolver los datos:', error);
            return res.status(500).send({ message: 'Error al devolver los datos' });
        }
    },
    getInventories: function(req,res){
        Inventory.find({}).sort('created_at').exec()
        .then((inventories) => {
            if(!inventories || Object.keys(inventories).length === 0){
                return res.status(404).send({message:"No hay inventarios"});
            }
            res.status(200).send(inventories);
        })
        .catch(() => {
            return res.status(500).send({message: "Error al devolver los datos"});
        });
    }

}

module.exports = controller 
