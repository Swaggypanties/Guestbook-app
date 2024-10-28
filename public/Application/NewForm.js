var express = require('express')
var fs = require('fs')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: True}));