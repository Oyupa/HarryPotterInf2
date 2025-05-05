const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los combates
router.get('/', (req, res) => {
    db.query('SELECT * FROM combates', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        res.json(results);
    });
});

// Obtener un combate por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM combates WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        if (results.length === 0) return res.status(404).json({ error: 'Combate no encontrado' });
        res.json(results[0]);
    });
});

// Crear un nuevo combate
router.post('/', (req, res) => {
    const { personaje1_id, personaje2_id, ganador_id } = req.body;
    if (!personaje1_id || !personaje2_id || !ganador_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    db.query(
        'INSERT INTO combates (personaje1_id, personaje2_id, ganador_id) VALUES (?, ?, ?)',
        [personaje1_id, personaje2_id, ganador_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al insertar el combate' });
            res.status(201).json({ message: 'Combate creado', id: result.insertId });
        }
    );
});

// Actualizar un combate existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { personaje1_id, personaje2_id, ganador_id } = req.body;

    db.query(
        'UPDATE combates SET personaje1_id = ?, personaje2_id = ?, ganador_id = ? WHERE id = ?',
        [personaje1_id, personaje2_id, ganador_id, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar el combate' });
            res.json({ message: 'Combate actualizado' });
        }
    );
});

// Eliminar un combate
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM combates WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el combate' });
        res.json({ message: 'Combate eliminado' });
    });
});

module.exports = router;
