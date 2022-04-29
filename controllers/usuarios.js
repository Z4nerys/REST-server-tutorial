//este archivo tiene que llamarse de la misma forma que en la ruta
//los archivos de routes y controllers tienen que llamarse igual

//aca se crean funciones y las exportamos. solamente eso
//const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario')

const usuariosGet = (req, res) => {
    //en el get recibo las querys => /usuarios?q=hola&nombre=fernando&apikey=12345
    const {q, nombre, apikey} = req.query;
    res.json({
        msj: 'get API - controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPut = (req, res = response) => {
    //en el put puedo recibir por params => /:id
    const id = req.params.id;
    console.log(id)
    res.json({
        msj: 'put API - controlador.',
        id
    })
}

const usuariosPost= async (req, res = response) => {
    //el POST envia data x el body

    //recibo la data
    const {nombre, correo, password, rol} = req.body;

    //creo una instancia del schema de la base de datos con los datos recibidos en el body
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar que el correo existe
    const emailExist = await Usuario.findOne({correo})
    if( emailExist ){
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        });
    }

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    //dentro del genSaltSync va un numero y eso indica la cantidad de vueltas.
    //mientras mayor sea el numero, mas segura va a ser la contraseña. pero a su vez mas va a tardar el proceso
    //x defecto tiene el valor 10. genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en la base de datos
    await usuario.save();

    //muestro los datos 
    res.json({
        usuario
    });
}

const usuariosDelete = (req, res = response) => {
    
    res.json({
        msj: 'delete API - controlador'
    })
}

const usuariosPatch = (req, res = response) => {
    
    res.json({
        msj: 'patch API - controlador'
    })
}

module.exports ={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}