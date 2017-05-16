var express = require('express');
var path = require("path");
var cors = require("cors");
var config = require("../config/config.json");

// setup server
var app = express();

//Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Render index page
app.use(express.static('../client'))
app.get('/', function(req, res){
  res.sendFile(path.resolve('../client/index.html'));
});

// Start listening
app.listen(config.port, function(){
  console.log('listening on *:3000');
});
