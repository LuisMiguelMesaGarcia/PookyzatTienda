'use strict'
const Cliente = require('../models/Cliente');
const bcrypt = require('bcrypt');//lo recomendable es encriptar strings menores a 72 bytes
const jwt= require('jsonwebtoken');
var moment = require('moment');

const secret = 'pookymesa' //no se si esto va en otro lado mas seguro

//post
async function registrarCliente(req, res){//creamos una funcion async(porque tenemos que esperar respuesta) la cual va a recibir req:que es donde viene el body en req.body y una res, que es la respuesta http de la peticion
    try {
        const dataBody=req.body; //guardamos body en una constante

        //verificamos si existe el cliente
        const existeCliente = await Cliente.findOne({email:dataBody.email})//utilizamos la funcion findOne porque si no encuentra al cliente da null si usaramos find() nunca daria null esta funcion recibe un objeto poner {email: }
        if(existeCliente){
            return res.status(400).json({ message: 'El cliente ya existe' });
        }else{
            if(dataBody.password){
                // Hashear la contraseña antes de guardarla
                bcrypt.hash(dataBody.password, 10, async function(err, hash) {
                    if(hash){
                        dataBody.password=hash;
                        const clienteNuevo= await Cliente.create(dataBody);//se crea el cliente y guardamos este dato en una constante para usarlo mas adelante
                    res.status(200).json({data:clienteNuevo})
                    }else{
                        console.log(err);
                        res.status(500).send({message:'ErrorServer', error:err})
                    }
                });
            }else{
                return res.status(400).send({ message: 'Ingrese una contraseña porfavor' });
            }
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al hacer registrar', error: error });
    }
       


}

//post
async function loginClientes(req,res){
    try {
        const body = req.body;
        if(body.email && body.password){
            //ecnontramos que el email exista

            const user = await Cliente.findOne({email:body.email});//aqui se encuentra el email dentro de la coleccion y trae todo el objeto
            if(!user){
                return res.status(401).json({ message: 'Email incorrecto' });
            }else{
                //verificamos contraseña
                // console.log(user);
                bcrypt.compare(body.password, user.password, function(err,result){
                    if(result){
                        //creamos el token
                        const payload = {
                            sub: user._id,
                            nombre: user.nombre,
                            apellido: user.apellido,
                            email: user.email,
                            iat: moment().unix(),//información de fecha y hora cuando el JWT fue usado;
                            exp: moment().add(7,'days').unix()//se usa unix porque se maneja en segundos
                        }
                        const token = jwt.sign(payload, secret);
                        //devolvemos el token
                        res.status(200).json({data: token})
                    }else{
                        console.log(err)
                        return res.status(401).send({ message: 'Contraseña incorrecta'});
                    }
                })
            }

        }else{
            return res.status(400).json({ message: 'Ingrese email y contraseña' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al hacer login', error });
    }
}

//GET
async function getAllClientes(req,res){
    //el {password:0} es para que no traiga los password si quiere con password simplemente pasa el metodo find vacio find();
    let user = await Cliente.find({},{password:0});
    return res.status(200).json(user)
}

//GET by id
async function getById(req,res){
    const userId =  req.params.id;
    let user = await Cliente.findById(userId)
    if(user){
        return res.status(200).json(user)
    }else{
        return res.status(200).send({message:"no se enncontro el usuario"})
    }
}

//PUT
async function updateCliente(req,res){
    const userId =  req.params.id;
    const userNuevo = req.body;
    let userActualizado = await Cliente.findOneAndUpdate({_id:userId},userNuevo,{new:true})
    if(userActualizado){
        return res.status(200).json(userActualizado)
    }else{
        return res.status(200).send({message:"no se enncontro el usuario"})
    }
}


module.exports={
    registrarCliente,
    loginClientes,
    getAllClientes,
    getById,
    updateCliente
}

