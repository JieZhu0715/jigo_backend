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

orderResources.post('/resolveOrder', (req, res) => {
    let { order_id } = req.body.order_id
    if( !order_id )
    {
      responseClient(res, 400, 2, 'order_id is null', req);
      return;  
    }
    orderDao.findOne({ _id: order_id }).then(
      order => {
        order.status = 1;
        orderDao.save(order).then(
          result => {
            responseClient(res, 200, 0, '', result) 
          }
        ).catch(
          error => {
            responseClient(res) 
          }
        )
      }
    ).catch(error => {
      responseClient(res); })
})

orderResources.get('/all', (req, res) => {
  orderDao.findAllAndPopulate({}, null, 'item_id', 'user_id').then(function(result) {
    if (!result)
    {
      responseClient(res, 600, 1, "No order found")
    }
    else
    {
      responseClient(res, 200, 0, '', result)
    }
  }, function(error) {
    responseClient(res)
  })
})

  orderResources.all('*', function(req, res, next){
    next();
  })
  
  module.exports = orderResources;
  