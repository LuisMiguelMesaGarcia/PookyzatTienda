"use strict"
const Producto = require('../models/Producto');


//POST Registro
async function registrarProducto(req, res){
    const body = req.body;
    // const clienteNuevo= await Cliente.create(dataBody);
    const nuevoProducto= await Producto.create(body);
    res.status(200).json(nuevoProducto);
}

//GET all
async function getAllProductos(req, res){
    const productos = await Producto.find()
    return res.status(200).json(productos);
}


module.exports={
    registrarProducto,
    getAllProductos
}