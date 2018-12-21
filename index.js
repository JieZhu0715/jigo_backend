const express = require('express')
var bodyParser = require('body-parser')
let serverConfig = require('config')

const app =express()

// Add Resources here
const items = require('./api/itemResources')
const users = require('./api/userResources')

// CORS on ExpressJS, Add Access-Control-Allow-Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/items', items)
app.use('/users', users)

if (serverConfig.get('heroku'))
{
    console.log('server listening on' + process.env.PORT)
    app.listen(process.env.PORT)
}