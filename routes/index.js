'use stric'
const express = require('express')

app.get('/api/products' , productCtrl.getProducts) 
app.get('/api/products/:productId' , productCtrl.getProduct)
app.post('/api/products' , productCtrl.saveProduct)
app.put('/api/products/:productId' , productCtrl.updateProduct)
app.delete('/api/products/:productId' , productCtrl.deleteProduct)