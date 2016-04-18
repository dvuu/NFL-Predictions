var fs = require('fs');
var GAME_DATA = JSON.parse(fs.readFileSync('../data/games.json'));
var RESULT_DATA = JSON.parse(fs.readFileSync('../data/results.json'));
var _ = require('underscore');
var url = require('url');

var resultsData = RESULT_DATA;

module.exports = function(app) {

	app.get('/api/helloworld', function(req, res) {

		var result = {
			results: [ ]
		};
		for (var i = 0; i < resultsData.length; ++i ) {
			result.results.push(resultsData[i]);
		}
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

};