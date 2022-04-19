const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
//express con clases
const data = {
    "data": {
        "students": [
            {
                "id": 1,
                "name": "gasty",
                "age": 23
            },
            {
                "id": 2,
                "name": "matias",
                "age": 18
            }
        ]
    }
}
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.conectarDB();
        //middlewares. funciones que añaden otra funcionalidad al webserver
        //siempre se ejecuta cuando levantamos el servidor
        //los middlewares se usan con => .use
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {
        //CORS
        //lo tengo que usar xq sino puedo tener problemas en la web, cuando haga peticiones
        this.app.use(cors())
        //no hace nada. solo es para que se puedan hacer peticiones


        //middlewares para recibir datos
        //lecutra y parseio del body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        //definiendo la ruta del endpoint y enlazando el archivo donde estan los endpoints
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto: ', this.port)
        })
    }

}


module.exports = Server;