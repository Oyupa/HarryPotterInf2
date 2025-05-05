const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta para obtener todas las películas
router.get('/', (req, res) => {
    db.query('SELECT * FROM peliculas', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Ruta para obtener una película por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM peliculas WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Película no encontrada' });
        } else {
            res.json(results[0]);
        }
    });
});

// Ruta para agregar una nueva película
router.post('/', (req, res) => {
    const { title, length, sinopsis, year } = req.body;
    db.query(
        'INSERT INTO peliculas (title, length, sinopsis, year) VALUES (?, ?, ?, ?)',
        [title, length, sinopsis, year],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: results.insertId, title, length, sinopsis, year });
            }
        }
    );
});

module.exports = router;
