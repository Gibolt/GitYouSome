var codeBlocks = {
	init : function(app, svr) {
		console.log("init");
		app.get('/code', function(req, res) {
			var obj = req.body;
			// svr.close(res);
			if (obj.use) {
				res.send(codeBlocks.calculateScore(obj));
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

		app.get('/a', function(req, res) {
			res.send("Hello World");
		});
	},

	calculateScore : function(obj) {
		for (var prop in obj) {
			var values = obj[prop];
			for (var i=0; i<values.length; i++) {
			}
		}
	},
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports.codeBlocks = codeBlocks;
}
