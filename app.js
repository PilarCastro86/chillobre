'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes') // importo los modulos api de routes.
const productCtrl = require('./controllers/product')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api' , api) // importo api las fn


module.exports = app