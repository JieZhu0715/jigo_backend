const express = require("express");
const itemResources = express.Router();
const ItemDao = require("../dao/itemDao")

const itemDao = new ItemDao()


itemResources.get("/find", function(req, res) {
  let _id = req.query._id
  if (!_id) 
  {
    res.json({ code: 600, msg: 'No id specified'})
    return
  }
  // itemDao.findOne({ id }, { __v: 0, _id: 0}).then(function(result) {
  itemDao.findOne({ _id }).then(function(result) 
  {
    if (!result)
    {
      res.json({code: 600,  msg: 'No item found', data: result})
      return
    }
    else
    {
      res.json({code: 200, msg: '', data: result})
      return
    }
  }, function(error) {
    console.log("Errors in itemDao.findAll: " + error)
    res.json({code: 700, msg:'Query error ' + error})
    return
  })
})



itemResources.get("/findByName", function(req, res) {
  let name = req.query.name
  if (!name) 
  {
    res.json({ code: 600, msg: 'No name specified'})
    return
  }
  // itemDao.findOne({ name: name }, { __v: 0, _id: 0}).then(function(result) {
  itemDao.findOne({ name: name }).then(function(result) {
    if (!result)
    {
      res.json({code: 600,  msg: 'No item found', data: result})
      return
    }
    else
    {
      res.json({code: 200, msg: '', data: result})
      return
    }
  }, function(error) {
    console.log("Errors in itemDao.findAll: " + error)
    res.json({code: 700, msg:'Query error ' + error})
    return
  })
})



itemResources.get('/all', function(req, res) {
  itemDao.findAll({}).then(function(result) {
    if (!result)
    {
      res.json({code: 600,  msg: 'No item found', data: result})
      return
    }
    else
    {
      res.json({code: 200, msg: '', data: result})
      return
    }
  }, function(error) {
    console.log("Errors in itemDao.findAll: " + error)
    res.json({code: 700, msg:'Query error ' + error})
    return
  })
})


itemResources.post("/add", function(req, res) {
  let name = req.body.name
  let description = req.body.description
  let content = req.body.content
  let created_by = req.body.created_by
  let image_url = req.body.image_url
  let price = req.body.price
  itemDao.create({ 
    name: name,
    description: description, 
    content: content,
    created_by: created_by,
    image_url: image_url, 
    price: price
  }).then(
    function(result) {
      console.log("New item added ")
      res.json({code: 200, msg: 'New item added: ', data: result})
      return
    }, 
    function(error) {
      console.log("Add new item failed: " + error)
      res.end({code: 700, msg:'Query error ' + error})
    }
  )
})
 

itemResources.all('*', function(req, res, next){
  next();
})

module.exports = itemResources;

