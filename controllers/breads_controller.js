const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

//Index
breads.get('/',(req,res)=>{
  Bread.find()
    .then(foundBreads => { 
    res.render('Index', {
      breads: foundBreads,
      title:'Index Page'
    })
  })
})
 
// Update
  breads.put('/:id', 
  express.urlencoded({extended: true}), 
  (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body,{new:true})
    .then(updatedBread => {
      console.log(updatedBread);
    res.redirect(`/breads/${req.params.id}`)
  })
})

// New
breads.get('/new', (req, res) => {
  res.render('new')
})

// Edit
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
  .then(foundBread => {
  res.render('edit', {
    bread: foundBread
  })
})
})

//Show
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .then(foundBread => {
          res.render('Show', {
              bread: foundBread
          })
      })
      .catch(err => {
        res.send(`<h1>This is not the page you are looking for!<h1>`)
      })
})

//Create
breads.post('/', express.urlencoded({extended: true}),(req,res)=> {
  if (!req.body.image) {
    req.body.image = 'undefined'
  }
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = 'true'
  } else {
    req.body.hasGluten = 'false'
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

//Delete
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
  .then(deleteBread => {
  res.status(303).redirect('/breads')
})
})

module.exports = breads