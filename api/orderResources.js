const express = require("express");
const orderResources = express.Router();
const OrderDao = require("../dao/orderDao")
const { responseClient } = require('../utils/crypto')

const orderDao = new OrderDao()

orderResources.post("/add", function(req, res) {
    let item_id = req.body.item_id
    let user_id = req.body.user_id
    let quantity = req.body.quantity
    orderDao.create({ item_id, user_id, quantity }).then(
      function(result) {
        console.log("New order added ")
        responseClient(res, 200, 0, 'New order added', result);
      }, 
      function(error) {
        responseClient(res, 700, 1, 'Query error');
      }
    )
  })
   
orderResources.get('/findUserOrders', (req, res) => {
    let { user_id } = req.query; 
    if ( !user_id )
    {
        responseClient(res, 400, 2, 'user_id is null', req);
		    return; 
    }
    orderDao.findAllAndPopulate({ user_id }, null, 'item_id').then(
        orders => {
            if (orders) 
            {
				      responseClient(res, 200, 0, '', orders);
            }
            else{
              responseClient(res, 200, 1, 'No oder found');
            }
        }
    ).catch(error => {
        responseClient(res);
    })
})

orderResources.get('/all', (req, res) => {
  orderDao.findAll({}).then(function(result) {
    if (!result)
    {
      responseClient(res, 600, 1, "No order found")
    }
    else
    {
      responseClient(res, 200, 0, '', result)
    }
  }, function(error) {
    console.log("Errors in itemDao.findAll: " + error)
    responseClient(res)
  })
})

  orderResources.all('*', function(req, res, next){
    next();
  })
  
  module.exports = orderResources;
  