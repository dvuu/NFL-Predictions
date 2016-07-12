var express = require('express');
var app = express();
var api = require('./api.js')(app);

console.log(__dirname + '/../client');
app.use(express.static(__dirname + '/../client'));

app.get('/topGames', function(req, res) {
	var option = {
		root: __dirname + '/../client/'
	}
	res.sendFile('topGames.html', option, function(err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
		else {
			console.log('Sent: topGames.html');
		}
	});
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("App listening on port " + port);
});