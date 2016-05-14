'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var session = require('express-session');



var app = express();
require('dotenv').load();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

// middlewares 
app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));



// routes 
app.get('*', function(req, res, next) {
  //console.log("route req: " + req)
  next()
});

// prevent favicon to propagate further
app.get('/favicon.ico', function(req, res, next) {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} )
    res.end()
    //console.log('favicon requested')
})


routes(app);

//error handler
function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
  message: err.message,
  error: err
});
}

app.use(errorHandler);

var port = process.env.PORT || 8080;

// Start server 
if (require.main === module) { 
  app.listen(port,  function () {
	    console.log('Node.js listening on port ' + port + '...');
});
} 
 
// Expose app 
exports = module.exports = app; 
