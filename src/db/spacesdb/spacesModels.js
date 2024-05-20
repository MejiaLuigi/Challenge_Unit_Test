// models/Room.js

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Room = mongoose.model('Room', roomSchema);

const createRoom = (values) => {
    const newRoom = new Room(values);
    // Guarda la nueva sala en la base de datos
    return newRoom.save();
};

module.exports = {
    Room,
    createRoom
};

