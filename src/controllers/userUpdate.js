const express = require('express');

const { updateUser } = require('../db/users');

exports.UserUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await getUsersById(id);
        return res.status(200).json(user).end();
    } catch (error) {
    console.log(error);
    return res.sendStatus(400);    
    }
}