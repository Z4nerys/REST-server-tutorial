
//los middlewares reciben la req y las res y el next
const esAdminRole = (req, res, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede realizar esta accion`
        });
    }
    next();
}

const tieneRole = (...roles) => {
    //en el parametro pongo con 3 puntos para recibir x cantidad de argumentos y se quedan todos en un array

    //este return es para que esta funcion regrese una funcion. esto sirve para poder enviar argumentos a la funcion
    return (req, res, next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicico requiere uno de estos roles ${ roles }`
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}