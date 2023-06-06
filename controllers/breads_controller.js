const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

//Index
breads.get('/',(req,res)=>{
//res.send(Bread)
    res.render('Index',
    {
      breads:Bread,
      title:'Index Page'
    }
    )
  })
  
  // Update
  breads.put('/:arrayIndex', express.urlencoded({extended: true}), (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
  })

// New
breads.get('/new', (req, res) => {
  res.render('new')
})

// Edit
breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})


//Show
breads.get("/:arrayIndex", (req, res) => {
  // res.send(Bread[req.params.arrayIndex])
  if (Bread[req.params.arrayIndex]) {
    res.render("Show", {
      bread: Bread[req.params.arrayIndex],
      index: req.params.arrayIndex,
    })
  } else {
    res.send("404")
  }
})



//Create
breads.post('/', express.urlencoded({extended: true}),(req,res)=> {
  //console.log(req.body)
  if (!req.body.image) {
    req.body.image = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&w=400&q=80'
  }
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = 'true'
  } else {
    req.body.hasGluten = 'false'
  }
  Bread.push(req.body)
  res.redirect('/breads')
})

//Delete
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

module.exports = breads