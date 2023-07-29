'use strict'

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    nombres:{type:String, require:true},
    apellidos:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    DNI:{type:String, require:true},
    rol:{type:String, require:true},
    telefono:{type:String, require:true},
})

module.exports=mongoose.model('Admin', AdminSchema);