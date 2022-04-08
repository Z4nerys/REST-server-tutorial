//este archivo tiene que llamarse de la misma forma que en la ruta
//los archivos de routes y controllers tienen que llamarse igual

//aca se crean funciones y las exportamos. solamente eso
//const {response} = require('express');

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

const usuariosPost= (req, res = response) => {
    const {nombre, edad} = req.body;
    const id = req.params;
    res.json({
        msj: 'post API - controlador',
        edad,
        nombre,
        id
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