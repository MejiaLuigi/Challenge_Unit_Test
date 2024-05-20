const express = require('express');
const { register, login } = require('../controllers/authentication');

const {createRoom} = require('../controllers/spacesController/spaces')

/** 
 * @swagger
 * /api/register:
 *   post:
 *     summary: create new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: new user created
*/

module.exports = function(router) {
    router.post('/api/register', register);
    router.post('/api/login', login);
    router.post('/api/createRoom', createRoom);
};

