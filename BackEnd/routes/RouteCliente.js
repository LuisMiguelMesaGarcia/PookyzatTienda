"use strict"
const ClienteController = require('../controllers/ClienteController');
const express = require('express');

const Router = express.Router();

Router.post('/registrarCliente', ClienteController.registrarCliente);
Router.post('/loginClientes', ClienteController.loginClientes);
Router.get('/getAllClientes', ClienteController.getAllClientes);
Router.get('/getAllClientes/:id', ClienteController.getById);
Router.put('/updateCliente/:id', ClienteController.updateCliente);

module.exports = Router;
