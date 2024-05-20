const express = require('express');

const { UserDelete } = require('../controllers/userDelete')

module.exports = function(router){
    router.delete('/users/:id', UserDelete);
}