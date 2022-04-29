const { Schema, model} = require('mongoose')

const RoleSchema = Schema({
    rol:{
        type: String,
        require: [true, 'El rol es obligatorio']
    }
})
//el nombre que quiero que tenga y exporto el schema
module.exports = model('Role', RoleSchema)