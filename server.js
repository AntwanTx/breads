//Dependencies
const express = require ('express')

//Configuration
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
console.log(PORT)

//Routes
app.get('/',(req,res)=>{
    res.send('Welcome to my Bread World')
})

//Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

//Listen
app.listen(PORT,()=>{
    console.log('listening on port',PORT);
})