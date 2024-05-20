const express = require('express');
const { getAllUsers } = require('../controllers/users');
const {isAuthenticated } = require('../middleware/index')

/** 
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Users not found
*/

module.exports = function (router) {
    router.get('/api/users', getAllUsers);
}
//fijma