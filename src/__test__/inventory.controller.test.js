const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Inventory = require('../app/models/inventory.model');
const inventoryRoutes = require('../app/routes/inventory.routes');

const app = express();
app.use(express.json());
app.use('/api', inventoryRoutes);

describe('Inventory Controller', () => {
  describe('POST /api/inventory', () => {
    it('should create a new inventory', async () => {
      const res = await request(app)
        .post('/api/inventory')
        .send({ name: 'Inventory1', description: 'Test description' });
        
      expect(res.statusCode).toBe(200);
      expect(res.body.inventory).toHaveProperty('_id');
      expect(res.body.inventory.name).toBe('Inventory1');
      expect(res.body.inventory.description).toBe('Test description');

      // Check database after insertion
      const inventories = await Inventory.find({});
      expect(inventories.length).toBe(1);
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app)
        .post('/api/inventory')
        .send({ description: 'Test description' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('El campo "name" es obligatorio y debe ser texto');

      // Check database should still be empty
      const inventories = await Inventory.find({});
      expect(inventories.length).toBe(0);
    });

    it('should return 400 if description is not a string', async () => {
      const res = await request(app)
        .post('/api/inventory')
        .send({ name: 'Inventory1', description: 123 });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('El campo "description" debe ser texto');

      // Check database should still be empty
      const inventories = await Inventory.find({});
      expect(inventories.length).toBe(0);
    });
  });

  describe('GET /api/inventory/:name', () => {
    it('should get an inventory by name', async () => {
      const inventory = new Inventory({ name: 'Inventory1', description: 'Test description' });
      await inventory.save();

      const res = await request(app).get('/api/inventory/Inventory1');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.inventory.name).toBe('Inventory1');

      // Check database has only one inventory
      const inventories = await Inventory.find({});
      expect(inventories.length).toBe(1);
    });

    it('should return 404 if inventory is not found', async () => {
      const res = await request(app).get('/api/inventory/NonExistentInventory');
      
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No se ha encontrado el inventario NonExistentInventory');

      // Check database should be empty
      const inventories = await Inventory.find({});
      expect(inventories.length).toBe(0);
    });
  });

  describe('GET /api/inventories', () => {
    it('should get all inventories', async () => {
      const inventory1 = new Inventory({ name: 'Inventory1', description: 'Test description' });
      const inventory2 = new Inventory({ name: 'Inventory2', description: 'Another description' });
      await inventory1.save();
      await inventory2.save();

      const res = await request(app).get('/api/inventories');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].name).toBe('Inventory1');
      expect(res.body[1].name).toBe('Inventory2');
    });
    it('should return 404 if no inventories found', async () => {
      // Ensure the database is empty before this test runs
      const res = await request(app).get('/api/inventories');
      console.log(res.body)
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No hay inventarios');

      // Check database should be empty
      const inventories = await Inventory.find({});
      expect(inventories.length).toBe(0);
    });
  });
});
