// // routes.js

// const express = require('express');
// const router = express.Router();
// const Room = require('../../controllers/spacesController/spaces');

// // Ruta para crear una nueva sala
// router.post('/rooms', async (req, res) => {
//   try {
//     const { name } = req.body;
//     const room = await Room.create({ name });
//     res.status(201).json(room);
//   } catch (error) {
//     res.status(500).json({ error: 'No se pudo crear la sala' });
//   }
// });

// module.exports = router;

