var express = require('express');
var path = require('path');

var app = express();
var lessMiddleware = require("less-middleware")

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, 'public/test.html'))
})

module.exports = app;
