const { Router } = require('express');
const { check } = require('express-validator');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
} = require('../controllers/usuarios');

//como se llama index, no hace falta poner middlewares/index
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();
//este archivo tiene que llamarse de la misma forma que en el controlador
//los archivos de routes y controllers tienen que llamarse igual
//este archivo contiene las rutas

//endpoints
router.get('/',[
    check('limite', "limite tiene que ser un número").isNumeric(),
    check('desde', 'Desde tiene que ser un número').isNumeric(),
    validarCampos
], usuariosGet);
//mando la referencia a la funcion. no es que la este ejecutando. x eso va sin parentesis

router.put('/:id',[
    //hacer validaciones del id
    check('id', 'No es un ID válido de mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post('/',[
    check('nombre', 'El nombre es obligatorio y tiene que ser un string').not().isEmpty().isString(),
    check('password', 'El password es obligatorio, tiene que tener 6 letras o mas y ser un string').isLength({min: 6}).isString(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTA_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un ID válido de mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;