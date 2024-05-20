const express = require('express');
const authentication = require('./authentication');
const users = require('./usersRouter');
const userDelete = require('./deleteUser')

// .Router para manejo de endpoints
const router = express.Router();
module.exports = () => {
    authentication(router);
    users(router);
    userDelete(router);
    
    return router;
};