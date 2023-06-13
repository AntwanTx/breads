//Dependencies
const express = require ('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')

//Configuration
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//Routes
app.get('/',(req,res)=>{
    res.send('Welcome to my Bread World')
})

mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true},() => {
        console.log('Connected to MongoDB:', process.env.MONGO_URI)
    })


//Middleware
const breadsController = require('./controllers/breads_controller.js')
app.use(methodOverride('_method'))
app.use('/breads', breadsController)
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


// 404 Page
app.get('*', (req, res) => {
    res.send('404')
  })
 
//Listen
app.listen(PORT,()=>{
    console.log('Listening on port:',PORT)
})