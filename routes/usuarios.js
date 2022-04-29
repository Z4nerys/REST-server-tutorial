const { Router } = require('express');
const { check } = require('express-validator');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');

const router = Router();
//este archivo tiene que llamarse de la misma forma que en el controlador
//los archivos de routes y controllers tienen que llamarse igual
//este archivo contiene las rutas

//endpoints
router.get('/', usuariosGet);
//mando la referencia a la funcion. no es que la este ejecutando. x eso va sin parentesis

router.put('/:id', usuariosPut)

router.post('/',[
    check('nombre', 'El nombre es obligatorio y tiene que ser un string').not().isEmpty().isString(),
    check('password', 'El password es obligatorio, tiene que tener 6 letras o mas y ser un string').isLength({min: 6}).isString(),
    check('correo', 'El correo no es valido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( async (rol = '') =>{
        const existeRol = await Role.findOne({ rol })
        if(!existeRol){
            throw new Error(`El rol ${rol} no está registrado en la BD`)
        }
    }),
    validarCampos
], usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;