const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // Agregamos esta línea
const Room = require('../db/spacesdb/spacesModels');

// Parse application/json
router.use(bodyParser.json());

// Endpoint para crear una nueva sala
router.post('/rooms', async (req, res) => {
    try {
        const { name } = req.body;
        const room = new Room({ name });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para obtener todas las salas
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
