const express = require('express');
const routes = express.Router();
const UserController = require('../src/controllers/UserController');

routes.get('/', (req, res) => {
    res.send('Hello from Nodemon')
});

routes.post('/register', UserController.store);

module.exports = routes;