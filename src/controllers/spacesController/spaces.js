// controllers/roomController.js

const Room = require('../../db/spacesdb/spacesModels');

exports.createRoom = async (req, res) => {
    try {
        const { name } = req.body;
        // Creamos una nueva sala con el nombre proporcionado
        const newRoom = await Room.createRoom({ name });
        return res.status(201).json(newRoom);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear la sala" });
    }
};

