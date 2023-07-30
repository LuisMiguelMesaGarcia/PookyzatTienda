"use strict"
//clase server

//imports
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//coneccion a la base de datos
const uri='mongodb://127.0.0.1:27017/Pookyzat';
mongoose.connect(uri).then((res)=>{ //aqui como tal se conecta y con el catch miramos si hay errores
    console.log('Conexión exitosa');
    }).catch((err)=>{
    console.log('Error en la conexion: '+err);
    }
    )

//puerto de ejecucion
const port= 4201
app.listen(port,()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
});

app.use(express.urlencoded({extended:true})); //middleware
app.use(express.json());

//CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

const RouteCliente = require('./routes/RouteCliente');
const RouteAdmin = require('./routes/RouteAdmin');
const RouteProducto = require('./routes/RoutesProducto');

app.use('/api', RouteCliente);
app.use('/api', RouteAdmin);
app.use('/api', RouteProducto);



module.exports=app;
