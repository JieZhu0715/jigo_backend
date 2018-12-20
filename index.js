const express = require('express')
let serverConfig = require('config')

const app =express()

// Add Resources here
const items = require('./api/itemResources')

app.use('/items', items)
if (serverConfig.get('heroku'))
{
    console.log('server listening on' + process.env.PORT)
    app.listen(process.env.PORT)
}