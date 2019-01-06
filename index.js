const express = require('express')
const bodyParser = require('body-parser')
const serverConfig = require('config')
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express()

// Add Resources here
const items = require('./api/itemResources')
const users = require('./api/userResources')
const orders = require('./api/orderResources')
const requests = require('./api/requestResources')

// CORS on ExpressJS, Add Access-Control-Allow-Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('jigo_node_cookie'));
app.use(
	session({
		secret: 'jigo_node_cookie',
		// name: 'session_id', # 在浏览器中生成cookie的名称key，默认是connect.sid
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 60 * 1000 * 30, httpOnly: true }, //过期时间
	}),
);
app.use('/items', items)
app.use('/users', users)
app.use('/orders', orders)
app.use('/requests', requests)

if (serverConfig.get('heroku'))
{
    console.log('server listening on' + process.env.PORT)
    app.listen(process.env.PORT)
}
else
{
    app.listen(8889)
}