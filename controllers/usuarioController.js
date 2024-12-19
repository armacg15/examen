//usuarioController.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const isAuthenticated = require('../middleware/isAuthenticated'); // Importa el middleware

// Ruta para mostrar el formulario de registro (no protegida)
router.get('/register', (req, res) => {
    res.render('register');
});

// Ruta para manejar el registro (no protegida)
router.post('/register', async(req, res) => {
    try {
        const { username, password } = req.body;
        const usuarioExistente = await Usuario.findOne({ username });
        if (usuarioExistente) {
            return res.status(400).send('El nombre de usuario ya está en uso');
        }
        const nuevoUsuario = new Usuario({ username, password });
        await nuevoUsuario.save();
        res.redirect('/login?success=Usuario registrado correctamente');
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).send('Error al registrar usuario');
    }
});

// Ruta para mostrar el formulario de login (no protegida)
router.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para manejar el login
router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await Usuario.findOne({ username });

        if (!usuario || !(await usuario.comparePassword(password))) {
            return res.status(401).send('Usuario o contraseña incorrectos');
        }

        // Simula una sesión (sin cookies o JWT en esta implementación básica)
        req.session.user = usuario; // Almacena al usuario en la sesión
        res.redirect('/alumnos');
    } catch (error) {
        console.error('Error iniciando sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/'); // Redirige a la página principal si hay un error al destruir la sesión
        }
        res.redirect('/login'); // Redirige a la página de login después de cerrar sesión
    });
});

module.exports = router;