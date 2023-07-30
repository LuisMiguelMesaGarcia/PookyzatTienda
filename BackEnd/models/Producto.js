'use strict'

const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    titulo:{type:String, require:true},
    slug:{type:String, require:true},
    portada:{type:String, require:true},
    precio:{type:String, require:true},
    descripcion:{type:String, require:true},
    contenido:{type:String, require:true},
    stock:{type:String, require:true},
})

module.exports=mongoose.model('Producto', ProductoSchema);
