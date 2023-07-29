"use strict"

const AdminController = require('../controllers/AdminController');
const express = require('express');

const Router = express.Router();

Router.post('/registrarAdmin', AdminController.registrarAdmin);
Router.post('/loginAdmin', AdminController.loginClientes);

module.exports = Router;
