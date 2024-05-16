// Nombre de la base de datos
var dbName = process.env.MONGODB_DB;

// Nombre de la colección
var collectionName = 'inventory';

// Conexión a la base de datos
var db = db.getSiblingDB(dbName);

// Crear la colección
db.createCollection(collectionName);