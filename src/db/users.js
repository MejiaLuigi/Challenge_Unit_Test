const mongoose = require('mongoose');

// Definimos estructura de Doc dentro de una coleccion de usuarios en mongoo
const UserSchema = new mongoose.Schema({
    email: String,
    authentication: {
        password: { type: String, required: true },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});
// .-Modelo de usuarios
const UserModel = mongoose.model('User', UserSchema);

// Definimos funciones para interactuar con la base de datos.
const getUsers = () => UserModel.find();
const getUsersByEmail = (email) => UserModel.findOne({ email });

const getUsersByToken = (sessionToken) => UserModel.findOne({ 'authentication.sessionToken' : sessionToken }); 

const getUsersById = (id) => UserModel.findById(id);
const createUser = (values) => {
    const newUser = new UserModel(values);
    // -guarda el nuevo usuario en la base de datos
    return newUser.save();
};
const deleteUserById = (id) => UserModel.findByIdAndDelete(id);
const updateUser = (id, values) => UserModel.findByIdAndUpdate(id, values, { new: true });

module.exports = {
    getUsers,
    UserModel,
    getUsersByEmail,
    getUsersById,
    createUser,
    deleteUserById,
    updateUser,
    getUsersByToken,
};
