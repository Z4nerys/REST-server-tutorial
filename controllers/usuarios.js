//este archivo tiene que llamarse de la misma forma que en la ruta
//los archivos de routes y controllers tienen que llamarse igual

//aca se crean funciones y las exportamos. solamente eso
const {response} = require('express');

const usuariosGet = (req, res = response) => {
    
    res.json({
        msj: 'get API - controlador'
    })
}

const usuariosPut = (req, res = response) => {
    
    res.json({
        msj: 'put API - controlador'
    })
}

const usuariosPost= (req, res = response) => {
    const {nombre, edad} = req.body;
    
    res.json({
        msj: 'post API - controlador',
        edad,
        nombre
    })
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