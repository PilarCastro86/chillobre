'use stric'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const productCtrl = require('./controllers/product')


module.exports = app