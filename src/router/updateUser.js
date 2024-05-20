const express = require('express');

const { UserUpdate } = require('../controllers/userUpdate');

module.exports = function(router){
    router.patch('/users/:id', UserUpdate);
}