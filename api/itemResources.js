const express = require("express");
const itemResources = express.Router();
const ItemDao = require("../dao/itemDao")

const itemDao = new ItemDao()


// itemResources.post('/remove', function(req, res) {
  
//   itemDao.remove()
// })


itemResources.get("/find", function(req, res) {
  let name = req.query.name
  if (!name) 
  {
    res.json({ code: 600, msg: 'No name specified'})
    return
  }
  itemDao.findOne({ name: name }, { __v: 0, _id: 0}).then(function(result) {
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



// itemResources.get('/all', function(req, res) {
//     itemDao.findAll({name: 'test_name'}, function(error, doc) {
//       if (error)
//       {
//         console.log("Item find error" + error)
//         res.json({code: 700, msg:'Query error ' + error})
//         return
//       }
//       else 
//       {
//         if (!doc)
//         {
//           res.json({code: 600,  msg: 'no item found', data: doc})
//           return
//         }
//         else
//         {
//           res.json({code: 200, msg: '', data: doc})
//           return
//         }
//       }
//     })
// })



itemResources.post("/add", function(req, res) {
  let name = req.query.name
  let description = req.query.description
  let created_by = req.query.created_by
  let image_url = req.query.image_url
  let price = req.query.price
  itemDao.create({ 
    name: name,
    description: description, 
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

