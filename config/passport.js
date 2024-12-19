// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario'); // Tu modelo de usuario

// Configuración de Passport para el login
passport.use(new LocalStrategy({
    usernameField: 'email', // campo para la autenticación, cambia según tu formulario
    passwordField: 'password' // campo de contraseña
}, async(email, password, done) => {
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return done(null, false, { message: 'Correo electrónico no registrado' });
        }
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
        return done(null, usuario);
    } catch (error) {
        return done(error);
    }
}));

// Serialización y deserialización de usuario
passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const usuario = await Usuario.findById(id);
        done(null, usuario);
    } catch (error) {
        done(error);
    }
});