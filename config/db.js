//db.js
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://123456:FaHBs73ng-NEnBE@cluster0.qi7qa.mongodb.net/';

// Configuración de strictQuery
mongoose.set('strictQuery', false); // O puedes usar true si prefieres el comportamiento actual

// Conectar a la base de datos
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conectado a MongoBD');
    })
    .catch((error) => {
        console.error('Error conectando a MongoBD:', error);
    });
