const { Router } = require('express');
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');

const router = Router();
//este archivo tiene que llamarse de la misma forma que en el controlador
//los archivos de routes y controllers tienen que llamarse igual
//este archivo contiene las rutas

//endpoints
router.get('/', usuariosGet);
//mando la referencia a la funcion. no es que la este ejecutando. x eso va sin parentesis

router.put('/:id', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;