const express = require('express');
const {get, merge,} = require('lodash');

const {getUsersByToken, getUsersById} = require('../db/users');

exports.isAutheticated = async (req, res, next) => {
    try{
        const sessionToken = req.cookies('JAMES-REST-API');
        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUsersByToken(sessionToken);

        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});

        return next();
    }catch(err){
        console.error(err);
        return res.sendStatus(401);
    }
}