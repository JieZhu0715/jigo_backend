const express = require('express')
const app =express()

// Add Resources here
const items = require('./api/itemResources')

app.use('/items', items)
app.listen(8889)