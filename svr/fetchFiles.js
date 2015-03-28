var fetchFiles = {
	getCode : function(fs) {
		var file = __dirname + "/private/code/code.txt";
		var list = [];
		if (fs.existsSync(file)) {
			var data = fs.readFileSync(file).toString();
			list = data.split("\n-----\n");
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
			return list;
		}
		return list;
	},
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports.fetchFiles = fetchFiles;
}
