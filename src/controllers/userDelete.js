const express = require('express');

const { deleteUserById } = require('../db/users');


//REPRESENTA UN OBJETO DE SOLICITUD EL LOS DOS ARUMENTOS
exports.UserDelete = async (req, res) => {
    try {
        //EXTRAE EL ID DE LA SOLICITUD
    const { id } = req.params
    const deletedUser = await deleteUserById(id);
    return res.json(deletedUser);

    } catch (error) {
        return res.sendStatus(400);    }
}
