const express = require("express");
const requestResources = express.Router();
const RequestDao = require("../dao/requestDao")
const { responseClient } = require('../utils/crypto')

const requestDao = new RequestDao()

requestResources.post("/add", function(req, res) {
    let user_id = req.body.user_id
    let description = req.body.description
    let reference = req.body.reference
    
    requestDao.create({ user_id, description, reference }).then(
      function(result) {
        console.log("New request added ")
        responseClient(res, 200, 0, 'New request added', result);
      }, 
      function(error) {
        responseClient(res, 700, 1, 'Query error');
      }
    )
  })
   
requestResources.get('/findUserRequests', (req, res) => {
    let { user_id } = req.query; 
    if ( user_id )
    {
        responseClient(res, 400, 2, 'user_id is null', req);
		    return; 
    }
    requestDao.findAll({ user_id }).then(
        requests => {
            if (requests) 
            {
                responseClient(res, 200, 0, '', requests);
            }
            else
            {
                responseClient(res, 200, 1, 'No oder found');
            }
        }
    ).catch(error => {
        responseClient(res);
    })
})


requestResources.all('*', function(req, res, next){
    next();
  })
  
  module.exports = requestResources;
  