'use strict'

const Product = require('../modelos/product')

function getProducts(req, res) {
    Product.find({}, (err,products) =>{
    if(err) return res.status(500).send({mensaje : 'error al buscar el producto'})
    if(!products) return res.status(404).send({mensaje: 'el producto no existe'})
    res.send(200, ({products}))
    })
}

function getProduct(req, res) {
    let productId = req.params.productId 
    Product.findById(productId, (err, products) => {
        if(err) return res.status(500).send({mensaje : 'error al buscar el producto'})
        if(!products) return res.status(404).send({mensaje: 'el producto no existe'})
        // si el producto existe
        res.status(200).send({products})
    })
}

function saveProduct(req, res) {
    console.log('POST api/products')
    console.log('json' ,req.body)
    let product = new Product() 
    product.name = req.body.name 
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category   
    product.description = req.body.description
    product.save((err, productStore) => {
        if(err) 
        return res.status(500).send({ mensaje : 'hubo un error al salvar en la bd'})
        return res.status(200).send({meeensaje : productStore})
    })
}

function updateProduct(id) {
    let productId = req.params.productId
    let update = req.body
    Product.findByIdAndUpdate(productId , update , (err, productUpdate) => {  
        if(err) return res.status(500).send({ mensaje : 'error al actualizar'})
        res.status(200).send({products : productUpdate})
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId
    
        Product.findById(productId , (err, products) => {
            if(err) return res.status(500).send({ mensaje : 'no se puedo eliminar producto'})
                products.remove(err => {
                if(err) return res.status(500).send({ mensaje : 'no se puedo eliminar producto'})
                res.status(200).send({mensaje : 'producto eliminado'})
            })
        })
}

module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}