//Dependencies
const express = require ('express')
const app = express()

//Configuration
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//Routes
app.get('/',(req,res)=>{
    res.send('Welcome to my Bread World')
})

//Middleware
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)
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
    console.log('listening on port',PORT)
})