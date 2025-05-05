const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los personajes
router.get('/', (req, res) => {
    db.query('SELECT * FROM personajes', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        res.json(results);
    });
});

// Obtener un personaje por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM personajes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        if (results.length === 0) return res.status(404).json({ error: 'Personaje no encontrado' });
        res.json(results[0]);
    });
});

// Crear un nuevo personaje
router.post('/', (req, res) => {
    const { name, description, fuerza, magia, poder, vida } = req.body;
    if (!name || !description || fuerza == null || magia == null || poder == null || vida == null) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    db.query(
        'INSERT INTO personajes (name, description, fuerza, magia, poder, vida) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, fuerza, magia, poder, vida],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al insertar el personaje' });
            res.status(201).json({ message: 'Personaje creado', id: result.insertId });
        }
    );
});

// Actualizar un personaje existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, fuerza, magia, poder, vida } = req.body;

    if (!name || !description || fuerza == null || magia == null || poder == null || vida == null) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    db.query(
        'UPDATE personajes SET name = ?, description = ?, fuerza = ?, magia = ?, poder = ?, vida = ? WHERE id = ?',
        [name, description, fuerza, magia, poder, vida, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar el personaje' });
            res.json({ message: 'Personaje actualizado' });
        }
    );
});

// Eliminar un personaje
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM personajes WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el personaje' });
        res.json({ message: 'Personaje eliminado' });
    });
});

module.exports = router;
