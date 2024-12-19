const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Alumno = require('../models/Alumno');
const isAuthenticated = require('../middleware/isAuthenticated'); // Importa el middleware

// Ruta para mostrar todos los alumnos (protegida)
router.get('/alumnos', isAuthenticated, async(req, res) => {
    try {
        const alumnos = await Alumno.find({});
        res.render('index', { alumnos });
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para editar alumno (protegida)
router.get('/alumnos/edit/:id', isAuthenticated, async(req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        if (!alumno) {
            return res.status(404).send('Alumno no encontrado');
        }
        res.render('list', { alumno }); // Renderiza la vista list con el alumno
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
});

// Ruta para agregar un nuevo alumno (protegida)
router.post('/alumnos', isAuthenticated, async(req, res) => {
    try {
        const nuevoAlumno = new Alumno(req.body);
        await nuevoAlumno.save();
        res.redirect('/alumnos?success=Alumno agregado correctamente');
    } catch (error) {
        console.error('Error al agregar alumno:', error);
        res.status(500).send('Error al agregar alumno');
    }
});

// Ruta para actualizar un alumno (protegida)
router.put('/alumnos/:id', isAuthenticated, async(req, res) => {
    try {
        const alumnoActualizado = await Alumno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alumnoActualizado) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.redirect('/alumnos?success=Alumno actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar alumno:', error);
        res.status(500).json({ error: 'Error al actualizar alumno' });
    }
});

// Ruta para eliminar un alumno (protegida)
router.delete('/alumnos/:identifier', isAuthenticated, async(req, res) => {
    try {
        const identifier = req.params.identifier.trim();
        let alumnoEliminado;
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            alumnoEliminado = await Alumno.findByIdAndDelete(identifier);
        }
        if (!alumnoEliminado) {
            alumnoEliminado = await Alumno.findOneAndDelete({ NC: identifier });
        }
        if (!alumnoEliminado) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.redirect('/alumnos?success=Alumno eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar alumno:', error);
        res.status(500).json({ error: 'Error de servidor', details: error.message });
    }
});

module.exports = router;