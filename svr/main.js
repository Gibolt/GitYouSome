// Global Settings
var port = 3000;

// Downloaded Imports
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var fs         = require('fs');
app.use(express.static(__dirname + '/public'));

// Local Imports
var svr    = require('./serverFunctions').svr;

// Local Endpoints
var fetchFiles = require('./fetchFiles').fetchFiles;
var codeBlocks     = require('./codeBlocks').codeBlocks;
fetchFiles.init(app, fs);
codeBlocks.init(app, svr);

// var con = svr.mysqlConnection(mysql, config);

app.get('/', function(req, res) {
	console.log("Success!");
	res.send("Success!");
});

svr.init(app, port);
