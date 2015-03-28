var fetchFiles = {
	getCode : function(fs) {
		var file = __dirname + "/private/code/code.txt";
		var list = [];
		if (fs.existsSync(file)) {
			var data = fs.readFileSync(file).toString();
			list = data.split("\r\n-----\r\n");
			console.log(list);
			return list;
		}
		return list;
	},

	getFunctions : function(fs) {
		var file = __dirname + "/private/code/functions.txt";
		var list = [];
		if (fs.existsSync(file)) {
			var data = fs.readFileSync(file).toString();
			list = JSON.parse(data);
			console.log(list);
			return list;
		}
		return list;
	},

	removeNonFunctions : function(code) {
		var res = str.replace(/\".*\"/g, "\"\"");
		return res;
	},
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports.fetchFiles = fetchFiles;
}
