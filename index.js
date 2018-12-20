const express = require('express')
let serverConfig = require('config')

const app =express()

// Add Resources here
const items = require('./api/itemResources')

// CORS on ExpressJS, Add Access-Control-Allow-Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/items', items)
if (serverConfig.get('heroku'))
{
    console.log('server listening on' + process.env.PORT)
    app.listen(process.env.PORT)
}