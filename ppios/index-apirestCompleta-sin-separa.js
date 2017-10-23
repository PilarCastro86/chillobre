'use stric'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const Product = require('./modelos/product')
const port = process.env.PORT || 3001



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//================================= GET ====================================//

app.get('/api/products' , (req, res) => {
// usamos el objeto product y find de mongoose para que me traiga todos los productos.
Product.find({}, (err,products) =>{
    if(err) return res.status(500).send({mensaje : 'error al buscar el producto'})
    if(!products) return res.status(404).send({mensaje: 'el producto no existe'})
    res.send(200, ({products}))
    })
})


app.get('/api/products/:productId' , (req, res) => {
    let productId = req.params.productId // guargo en una variable el valor del id que obtuve.
    // uso params porque es un parametro de la url

    //hacemos una funcion que busque por id y recibe dos parametros uno si es error y otro si esta ok es el producto que busco
    Product.findById(productId, (err, products) => {
        if(err) return res.status(500).send({mensaje : 'error al buscar el producto'})
        if(!products) return res.status(404).send({mensaje: 'el producto no existe'})
        // si el producto existe
        res.status(200).send({products})
    })
})

//=============================== POST ====================================//

app.post('/api/products' , (req, res) => {
    console.log('POST api/products')
    console.log('json' ,req.body) // me treae todo el json

    //alamaceno en la base de datos
    let product = new Product() //product es el nombre del ficehero d nuestra bd
    // le añado los campos que habia creado en el schema.
    product.name = req.body.name // voy parseando por campo
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category   
    product.description = req.body.description
    // hasta aca no tenemos almacenado el producto solo lo creamos y le anadimos sus propiedades.
    // para guardarlo, como es de mongoose podemos usar el metodo save, que revibe una funcion
    // con los callbacks, un err en caso de que haya y un productsave
    product.save((err, productStore) => {
        if(err) return res.status(500).send({ mensaje : 'hubo un error al salvar en la bd'})
        return res.status(200).send({meeensaje : productStore})
    })//cuando se almacene mongo le va a agregar un id unico con el qe podemos acceder a el, queda indetificado
})



app.put('/api/products/:productId' , (req, res) => {
    let productId = req.params.productId
    let update = req.body
    // otra fn de mongoose.findByIdAndUpdate
    // si no hay error el productupdate se guarda el producto actualizado
    Product.findByIdAndUpdate(productId , update , (err, productUpdate) => {  // le paso como primer parametro el id, y como segundo un objeto con los campor a actualiza que estan en el body
        if(err) return res.status(500).send({ mensaje : 'error al actualizar'})
        res.status(200).send({products : productUpdate})
    })
})

app.delete('/api/products/:productId' , (req, res) => {
    let productId = req.params.productId

    Product.findById(productId , (err, products) => {
        if(err) return res.status(500).send({ mensaje : 'no se puedo eliminar producto'})
            products.remove(err => {
            if(err) return res.status(500).send({ mensaje : 'no se puedo eliminar producto'})
            res.status(200).send({mensaje : 'producto eliminado'})
        })
    })
})


//================================ conexion a db con moongose ===========================//

mongoose.connection.openUri('mongodb://localhost:27017/shop', (err, res) => {
    if(err) {
        return console.log(`ERROR ${err}`)
    }
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
