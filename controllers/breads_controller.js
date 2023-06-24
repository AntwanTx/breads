const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')


// In the new route
breads.get('/new', (req, res) => {
  Baker.find()
      .then(foundBakers => {
          res.render('new', {
              bakers: foundBakers
          })
    })
})


// Index:
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(9).lean()
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
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

// // Edit
// breads.get('/:id/edit', (req, res) => {
//   Bread.findById(req.params.id)
//   .then(foundBread => {
//   res.render('edit', {
//     bread: foundBread
//   })
// })
// })

//Show
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
      .then(foundBread => {
        const bakedBy = foundBread.getBakedBy()
        console.log(bakedBy)
          res.render('Show', {
              bread: foundBread
          })
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