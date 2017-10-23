'use strict'
const express = require('express')
const productCtrl = require('../controllers/product')
const api = express.Router(); // creo una variable con la fn express route para copiar nuestras rutas y en vez de app, ponerles api
 
api.get('/products' , productCtrl.getProducts) //tamebin cambio la ruta, ya no es mas api/...
api.get('/products/:productId' , productCtrl.getProduct)
api.post('/products' , productCtrl.saveProduct)
api.put('/products/:productId' , productCtrl.updateProduct)
api.delete('/products/:productId' , productCtrl.deleteProduct)

//exportamos el modulo
module.exports = api