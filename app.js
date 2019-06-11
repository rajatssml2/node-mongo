const express = require('express');
const api = express.Router();
const userController = require('./Controller/Users');

require('./Model/').connect();

const router=()=>{
    api.post('/user', userController.create);
    return api;
}

module.exports = router();