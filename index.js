'use stric'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const productCtrl = require('./controllers/product')

const port = process.env.PORT || 3001



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//================================= GET ====================================//

app.get('/api/products' , productCtrl.getProducts) 


app.get('/api/products/:productId' , productCtrl.getProduct)

//=============================== POST ====================================//

app.post('/api/products' , productCtrl.saveProduct)



app.put('/api/products/:productId' , productCtrl.updateProduct)

app.delete('/api/products/:productId' , productCtrl.deleteProduct)

//================================ conexion a db con moongose ===========================//

mongoose.connection.openUri('mongodb://localhost:27017/shop', (err, res) => {
    if(err) return console.log(`ERROR ${err}`)
    console.log('conexion establecida') 
    //si esto es exitoso quiero que se conecte a la api :
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}!`);
    })
}) 

// mongoose tiene un meteodo llamado conect en el que le pasamos un string con la url
// de donde se encuentra nuestar base de datos yy a traves de un callback nos permite empezar 
// a ejecutar nuestra aplicacion.
// la forma para llamar a la base de datos es mongodb: la url/ nombrebase y seguido de eso
// una funcion con los callbacks en caso de error y en caso de exito.
