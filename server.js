//Dependencies
const express = require ('express')
const app = express()
const methodOverride = require('method-override')
const mongoose =require('mongoose')

//Configuration
require('dotenv').config()

//Routes
app.get('/',(req,res)=>{
    res.send('Welcome to my Bread World')
})

//Middleware
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

//Bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

const PORT = process.env.PORT || 3003
console.log(PORT)
mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true},() => {
        console.log('Connected to MongoDB:', process.env.MONGO_URI)
    })

//404 Page
app.get('*', (req, res) => {
  res.send('404')
})
 
//Listen
app.listen(process.env.PORT)
//(PORT,()=>{
//  console.log('Listening on port:',PORT)
//})