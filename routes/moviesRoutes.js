const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todas las películas
router.get('/', (req, res) => {
    db.query('SELECT * FROM peliculas', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        res.json(results);
    });
});

// Obtener una película por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM peliculas WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        if (results.length === 0) return res.status(404).json({ error: 'Película no encontrada' });
        res.json(results[0]);
    });
});

// Crear una nueva película
router.post('/', (req, res) => {
    const { title, length, sinopsis, year } = req.body;
    if (!title || !length || !sinopsis || !year) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    db.query(
        'INSERT INTO peliculas (title, length, sinopsis, year) VALUES (?, ?, ?, ?)',
        [title, length, sinopsis, year],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al insertar la película' });
            res.status(201).json({ message: 'Película creada', id: result.insertId });
        }
    );
});

// Actualizar una película existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, length, sinopsis, year } = req.body;

    db.query(
        'UPDATE peliculas SET title = ?, length = ?, sinopsis = ?, year = ? WHERE id = ?',
        [title, length, sinopsis, year, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar la película' });
            res.json({ message: 'Película actualizada' });
        }
    );
});

// Eliminar una película
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM peliculas WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar la película' });
        res.json({ message: 'Película eliminada' });
    });
});

module.exports = router;
