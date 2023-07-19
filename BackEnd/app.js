"use strict"
//clase server

//imports
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//coneccion a la base de datos
const uri='mongodb://127.0.0.1:27017/Pookyzat'

mongoose.connect(uri).then((res)=>{ //aqui como tal se conecta y con el catch miramos si hay errores
console.log('Conexión exitosa');
}).catch((err)=>{
console.log('Error en la conexion: '+err);
}
)

app.use(express.urlencoded({extended:true})); //middleware
app.use(express.json());
