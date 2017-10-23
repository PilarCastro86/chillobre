'use strict'
const app = require('./app')
const mongoose = require('mongoose')
const config = require('./config/config')


//================================ conexion a db con moongose ===========================//

mongoose.connection.openUri(config.db, (err, res) => {
    if(err) return console.log(`ERROR ${err}`)
    console.log('conexion establecida...') 
    app.listen(config.port, () => {
        console.log(`Example app listening on port: ${config.port}!`);
    })
}) 