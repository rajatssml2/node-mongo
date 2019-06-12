const express = require('express');
const jwt = require('jsonwebtoken');
const api = express.Router();
const userController = require('./Controller/Users');

require('./Model/').connect();

const router=()=>{
    api.post('/user', userController.create);
    api.get('/user', userController.getUsers);
    return api;
}

module.exports = router();