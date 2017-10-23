module.exports = {
 port : process.env.PORT || 3001,
 db : process.env.MONGODB || 'mongodb://localhost:27017/shop'
 // en caso de tenes mas de una db, lo puedo levantar en otro puerto.
}