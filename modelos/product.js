'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema
// schema es de moongose, lo defino en esa variable para no tener que tipearlo siempre.

// creamos nuestro esquema productSchema con los siguientes campos.

const ProductSchema = Schema({
    name: String,
    picture : String,
    price : {type : Number , default : 0}, // de tipo numero pero por default 0
    category : {type : String , enum :['computer', 'phone', 'accesorios']}, 
    description : String
})

// para exportar usamos metodo model de moongoose (nombre que quiera, nombre de esquema)

module.exports = mongoose.model('Product' , ProductSchema)
