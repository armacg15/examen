//db.js
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://er663699:24688642@cluster0.alhgo.mongodb.net/Escuela';

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