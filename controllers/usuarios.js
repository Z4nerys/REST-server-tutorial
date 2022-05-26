//este archivo tiene que llamarse de la misma forma que en la ruta
//los archivos de routes y controllers tienen que llamarse igual

//aca se crean funciones y las exportamos. solamente eso
//const {response} = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario')

const usuariosGet = async (req, res) => {
    //en el get recibo las querys => /usuarios?q=hola&nombre=fernando&apikey=12345
    //el get es para mostrar datos
    
    const { limite = 5, desde = 0 } = req.query;

    const query = {estado: true}
    
    //puedo mandar todas las promesas para que se ejecuten al mismo tiempo. asi me ahorro tiempo
    //xq si uso await por separado uno tarda 3 seg y la otra 3 y son 6 segundos xq no se ejecuta la siguiente
    //si la primera no termina de ejecutarse pero de esta forma
    //mando todas a la vez, si las 2 duran 3 segundos, entonces todo dura 3 segundos
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(limite)
    ]);
    //desestructuración de objetos tmb es posible

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res = response) => {
    //el POST envia data x el body. el POST es para crear usuarios

    //recibo la data
    const {nombre, correo, password, rol} = req.body;

    //creo una instancia del schema de la base de datos con los datos recibidos en el body
    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    //dentro del genSaltSync va un numero y eso indica la cantidad de vueltas.
    //mientras mayor sea el numero, mas segura va a ser la contraseña. pero a su vez mas va a tardar el proceso
    //x defecto tiene el valor 10. genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en la base de datos
    await usuario.save();
    //muestro los datos 
    res.json(usuario);
}

const usuariosPut= async(req, res = response) => {
    //put es para actualizar usuarios
    //en el put puedo recibir por params => /:id
    const { id } = req.params;
    const {_id, password, google, ...resto} = req.body

    //validacion contra base de datos
    //hacer validacion del ID
    if ( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})

    res.json(usuario)
}


const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    //borrar fisicamente
    //const usuario = await Usuario.findByIdAndRemove(id);

    //elimino de esta forma asi no rompo con la integridad de la base de datos, lo que quiere decir es que si el usuario
    //eliminado hizo cosas cuando estaba activo, no se pierda esta referencia cuando se elimine.
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});
    
    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    
    res.json({
        msj: 'patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}