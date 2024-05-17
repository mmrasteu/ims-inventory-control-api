// Nombre de la base de datos
var dbName = process.env.MONGODB_DB;

// Nombre de la colección
var collectionName = 'inventory';

// Conexión a la base de datos
var db = db.getSiblingDB(dbName);

db.createUser({ 
    user: process.env.MONGODB_USERNAME,
    pwd: process.env.MONGODB_PASSWORD,
    roles: [ 
        { 
            role: 'dbOwner',
            db: 'sample_db', 
        }, 
    ], 
});

// Crear la colección
db.createCollection(collectionName);