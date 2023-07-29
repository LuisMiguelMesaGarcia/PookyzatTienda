"use strict"
//pooky@gmail.com
//123
const mongoose = require('mongoose');

//este es el esquema de la base de datos osea los atributos de la tabla y el tipo de datos
const clienteSchema = new mongoose.Schema({
    nombres: {type: String, require: true},
    apellidos: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    perfil: {type: String, default:'perfil.png', require: true},
    telefono: {type: String, require: true},
    fnacimiento: {type: String, require: true},
    genero:{type: String, require: true},
    DNI: {type: String, require: true}
})



module.exports = mongoose.model('Clientes', clienteSchema)//esto es lo que exporta la clase
