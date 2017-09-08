var config = require('./config');
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../react-ui/dist')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../react-ui/dist/index.html'))
});

app.listen(config.port,
  console.log('Listening on port ', config.port));

