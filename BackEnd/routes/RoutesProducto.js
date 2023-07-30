"use strict"

const ProductoController = require('../controllers/ProductoController')
const express = require('express')


const Router = express.Router();

Router.post('/registrarProducto', ProductoController.registrarProducto);
Router.get('/getAllProductos', ProductoController.getAllProductos);

module.exports= Router;


// "use strict"
// const ClienteController = require('../controllers/ClienteController');
// const express = require('express');

// const Router = express.Router();

// Router.post('/registrarCliente', ClienteController.registrarCliente);