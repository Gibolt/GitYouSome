var svr = {
	server : null,

	close : function(res) {
		console.log("Closed");
		res.set("Connection", "close");
		res.send();
	},

	init : function(app, port) {
		svr.server = app.listen(port, function(){
			console.log("We have started our server on port " + port);
		});
	},
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports.svr = svr;
}
