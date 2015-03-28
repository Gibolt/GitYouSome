var codeBlocks = {
	code : null,
	fnCount : null,
	init : function(app, svr) {
		console.log(codeBlocks.code);
		app.post('/code', function(req, res) {
			var obj = req.body;
			console.log(obj);
			if (obj) {
				var pos = codeBlocks.calculateScore(obj, codeBlocks.fnCount);
				res.send("a " + pos + "; " + codeBlocks.code[pos]);
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

	setup : function(code, fnCount) {
		codeBlocks.code    = code;
		console.log(code);
		codeBlocks.fnCount = fnCount;
	},

	calculateScore : function(user, counts, fn) {
		var scores = [];
		var count  = [];
		var keys   = [];
		var valid  = [];
		for (var i=0; i<counts.length; i++) {
			scores[i] = 0;
			count [i] = 0;
			keys  [i] = Object.keys(counts[i]).length;
			valid [i] = false;
		}
		for (var prop in user) {
			var values = user[prop];
			for (var i=0; i<counts.length; i++) {
				var obj = counts[i];
				if (obj[prop] === user[prop] && user[prop] !== undefined) {
					scores[i] += 5;
					count [i] += 1;
					valid [i] = true;
				}
				else if (obj[prop] <= user[prop]) {
					scores[i] += 2;
					count [i] += 1;
				}
				else if (user[prop] === true && obj[prop]) {
					scores[i] += obj[prop]/2;
					count [i] += 1;
				}
				// else if (obj[prop] >= user[prop]) {
				else {
					// valid[i] = false;
					continue;
				}
			}
		}
		console.log(keys);
		console.log(count);
		console.log(scores);
		var best = 0;
		var bestScore = 0;
		for (var i=0; i<scores.length; i++) {
			if (count[i] >= keys[i] && valid[i] && scores[i] > bestScore) {
				best = i;
				bestScore = scores[i];
			}
		}
		return best;
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
		var cleanCode = [];
		for (var j=0; j<code.length; j++) {
			list[j] = {};
			cleanCode[j] = codeBlocks.removeBadThings(code[j]);
		}
		// Iterate through functions
		for (var i=0; i<fn.length; i++) {
			var thisFn = fn[i];
			var regex = new RegExp(thisFn, "g");

			// Iterate through code blocks
			for (var j=0; j<code.length; j++) {
				var thisCode = code[j];
				// var thisCode = cleanCode[j];
				var num = (thisCode.match(regex) || []).length;
				if (num) {
					list[j][thisFn] = num;
				}
			}
		}
		return list;
	},

	removeBadThings : function(code) {
		code = codeBlocks.removeVariables(code);
		code = codeBlocks.removeStrings(code);
		return code;
	},

	removeVariables : function(code) {
		var res = code.replace(/var\s+[a-zA-Z_-](.*\=)/g, "var $1");
		return res;
	},

	removeStrings : function(code) {
		var res = code.replace(/\".*\"/g, "\"\"");
		return res;
	},
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports.codeBlocks = codeBlocks;
}
