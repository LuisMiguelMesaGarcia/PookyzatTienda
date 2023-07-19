'use strict'
const Cliente = require('../models/Cliente');


async function registrarCliente(req, res){//creamos una funcion async(porque tenemos que esperar respuesta) la cual va a recibir req:que es donde viene el body en req.body y una res, que es la respuesta http de la peticion

    try {
        const body=req.body; //guardamos en body en una variable

        //verificamos si existe el cliente
        const existeCliente = await Cliente.findOne(body.email)//guardamos el cliente si existe y ustilizamos la funcion findOne porque si no encuentra al cliente da null si usaramos find() nunca daria null 
        if(existeCliente){
            return res.status(400).json({ message: 'El cliente ya existe' });//si ya existe el cliente mandamos este error
        }else{
            const clienteNuevo= await Cliente.create()//se crea el cliente y guardamos esta dato para usarlo mas adelante
        }
    } catch (error) {
        
    }

}
// const registro_