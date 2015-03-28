var fetchFiles = {
	init : function(app, fs) {
		app.get('/down/:to/:from', function(req, res, next) {
			var to   = req.params.to;
			var from = req.params.from;
			var pack = __dirname + "/public/pack/" + to + "_" + from;
			if (fs.existsSync(pack)) {
				res.sendFile(pack);
				return;
			}
			var lang = __dirname + "/public/lang/" + to + ".txt";
			if (fs.existsSync(lang)) {
				res.sendFile(lang);
				return;
			}
			else {
				res.sendStatus(401);
			}
		});
	},
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports.fetchFiles = fetchFiles;
}
