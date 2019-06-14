const express = require('express');
const jwt = require('jsonwebtoken');
const api = express.Router();
const userController = require('./Controller/Users');
const profileController = require('./Controller/Profile');

require('./Model/').connect();

const router=()=>{
    api.post('/user', userController.create);
    api.post('/login', userController.login);
    api.post('/create-profile', profileController.createProfile);
    api.get('/user', userController.getUsers);
    return api;
}

module.exports = router();