// Global Settings
var port = 3000;

// Downloaded Imports
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var fs         = require('fs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// var parser = bodyParser.json();

// Local Imports
var svr = require('./serverFunctions').svr;

// Local Endpoints
var fetchFiles = require('./fetchFiles').fetchFiles;
var codeBlocks = require('./codeBlocks').codeBlocks;
var code      = fetchFiles.getCode(fs);
var functions = fetchFiles.getFunctions(fs);

var fnCount = codeBlocks.countFunctions(functions, code);
console.log("Length: " + fnCount.length + ", " + code.length);
codeBlocks.cleanEmpty(fnCount, code);
var fnCount = codeBlocks.compressArray(fnCount);
var code    = codeBlocks.compressArray(code);
// console.log(fnCount);
// console.log(code);
console.log("Length: " + fnCount.length + ", " + code.length);
// console.log(JSON.stringify(fnCount));
codeBlocks.setup(code, fnCount);
codeBlocks.init(app, svr);

// var userList = {"for":true, "var":true, "if":1};
// codeBlocks.calculateScore(userList, fnCount);

// var con = svr.mysqlConnection(mysql, config);

app.get('/', function(req, res) {
	console.log("Success!");
	res.send("Success!");
});

svr.init(app, port);
