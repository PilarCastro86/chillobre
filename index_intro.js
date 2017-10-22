'use stric'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//================================= GET ====================================//

app.get('/api/products' , (req, res) => {
    res.send(200, {products : []} )
})

//================================= GET dinamico  ==========================//

app.get('/api/products/:productId' , (req, res) => { })

//=============================== POST ====================================//

app.post('/api/products' , (req, res) => {
    console.log(req.body)
    res.send(200 , {mensaje: 'el producto se ha recibido'})
})

//=============================== PUT ====================================//

app.put('/api/products/:productId' , (req, res) => { })

//=============================== DELETE ====================================//

app.delete('/api/products/:productId' , (req, res) => { })

//=============================== LISTEN ====================================//
// app.listen(3000, function () {
//     console.log(`Example app listening on port: ${port}!`);
// });