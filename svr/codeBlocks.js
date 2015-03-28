var codeBlocks = {
	init : function(app, svr) {
		app.post('/code', function(req, res) {
			var obj = req.body;
			if (obj) {
				res.send(obj);
			}
		});

		app.get('/test', function(req, res) {
			var obj = req.body;
			// svr.close(res);
			if (obj) {
				res.send(obj);
			}
			else {
				res.send("Hello World");
			}
		});
	},

	calculateScore : function(obj) {
		for (var prop in obj) {
			var values = obj[prop];
			for (var i=0; i<values.length; i++) {
			}
		}
	},

	cleanEmpty : function(list, code) {
		for (var i=0; i<list.length; i++) {
			var node = list[i];
			if (Object.keys(node).length === 0) {
				list[i] = undefined;
				code[i] = undefined;
			}
		}
	},

	compressObj : function(array) {
		list = [];
		for (var key in array) {
			list.push(array[key]);
		}
		return list;
	},

	compressArray : function(array) {
		list = [];
		for (var i=0; i<array.length; i++) {
			if (array[i] != undefined) {
				list.push(array[i]);
			}
		}
		return list;
	},

	countFunctions : function(fn, code) {
		var list = [];
		for (var j=0; j<code.length; j++) {
			list[j] = {};
		}
		// Iterate through functions
		for (var i=0; i<fn.length; i++) {
			var thisFn = fn[i];
			var regex = new RegExp(thisFn, "g");

			// Iterate through code blocks
			for (var j=0; j<code.length; j++) {
				var thisCode = code[j];
				var num = (thisCode.match(regex) || []).length;
				if (num) {
					list[j][thisFn] = num;
				}
			}
		}
		return list;
	},
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports.codeBlocks = codeBlocks;
}
