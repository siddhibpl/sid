var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, './web')));
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/web/" + "login.html");
});
app.listen(process.env.PORT || 8000, function(req, res) {
  console.log("server is listening port number 8000");
});
// for all api related to db mysql
var route = require('./route/app');
app.use('/route', route);
// contact us API
var contact = require('./route/contactUs');
app.use('/contact', contact);
// error handling for all Restfull Api's
app.use(function(err,req,res,next){
  console.log("error hendling");
  res.status(422).send({"resCode":"Error","msg":err.message});
});
