const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async (correo = '') => {
    const email = await Usuario.findOne({ correo })
    if (email) {
        throw new Error(`El correo: ${correo} ya esta registrado `);
    }
}

module.exports = {
    esRoleValido,
    emailExiste
}