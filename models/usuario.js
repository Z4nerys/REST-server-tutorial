const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

})

//sobreescribir metodo toJSON
//es un metodo ya existente y no lo tengo que llamar xq se ejecuta cuando creo un usuario y me devuelve los datos que quiero
UsuarioSchema.methods.toJSON = function(){
    //desestructuro 2 elementos y el resto los almaceno en user
    const { __v, password, _id , ...user} = this.toObject();
    //renombrando la forma en como se muestra el id
    user.uid = _id
    return user;
}

module.exports = model( 'Usuario', UsuarioSchema )