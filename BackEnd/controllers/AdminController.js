'use strict'

const Admin = require('../models/Admin');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'pookymesaadmin';

async function registrarAdmin(req, res){
    try {
        const body = req.body;
        if(body.email && body.password){//confirmacion de que ingreso email y password
            const existeAdmin = await Admin.findOne({email:body.email});//Email unico
            if(existeAdmin){
                return res.status(400).json({ message: 'El admin ya existe' });
            }else{
                //hash password
                bcrypt.hash(body.password,10,async function(err,hash){
                    if(hash){
                        body.password = hash;
                        const nuevoAdmin= await Admin.create(body);//create
                        return res.status(200).json({data: nuevoAdmin});
                    }else{
                        return res.status(500).json({message: 'Error server'});
                    }
                })
            }
        
        }else{
            return res.status(400).json({ message: 'Ingrese email y password' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al hacer login'});
    }
} 

async function loginClientes(req, res){
    try {
        const body = req.body;
        if(body.email && body.password){
            const user = await Admin.findOne({body})
            if(!user){
                res.status(401).send({ message: 'Email incorrecto'});
            }else{
                bcrypt.compare(body.password, existeEmail.password, async function(err,result){
                    if(result){
                        //generamos token
                        const payload={
                            sub: user._id,
                            nombre: user.nombre,
                            apellido: user.apellido,
                            email: user.email,
                            rol:user.rol,
                            iat: moment().unix(),//información de fecha y hora cuando el JWT fue usado;
                            exp: moment().add(7,'days').unix()//se usa unix porque se maneja en segundos
                        }
                        const token = jwt.sign(payload,secret)
                        res.status(200).json({data: token});
                    }else{
                        res.status(401).send({ message: 'Contraseña incorrecta'});
                    }
                })
            }
        }else{
            return res.status(400).json({ message: 'Ingrese email y password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al hacer login'});
    }
}

module.exports={
    registrarAdmin,
    loginClientes
}