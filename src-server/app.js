var express = require('express');
var app = express();
var api = require('./api.js')(app);

console.log(__dirname + '/../src-client');
app.use(express.static(__dirname + '/../src-client'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("App listening on port " + port);
});