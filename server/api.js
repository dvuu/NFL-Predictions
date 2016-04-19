var fs = require('fs');
var GAME_DATA = JSON.parse(fs.readFileSync('../data/games.json'));
var RESULT_DATA = JSON.parse(fs.readFileSync('../data/results.json'));
var _ = require('underscore');
var url = require('url');

module.exports = function(app) {

	app.get('/api/games', function(req, res) {
		var result = [
			{
				"gid": 1,
				"season": 2013,
				"home": "SEA",
				"visitors": "GB",
				"week": 2
			},
			{
				"gid": 2,
				"season": 2013,
				"home": "SEA",
				"visitors": "SF",
				"week": 3
			},
			{
				"gid": 3,
				"season": 2013,
				"home": "SEA",
				"visitors": "PI",
				"week": 4
			},
			{
				"gid": 4,
				"season": 2013,
				"home": "SEA",
				"visitors": "NE",
				"week": 6
			},
			{
				"gid": 5,
				"season": 2013,
				"home": "SEA",
				"visitors": "NY",
				"week": 7
			},
			{
				"gid": 6,
				"season": 2013,
				"home": "SEA",
				"visitors": "MI",
				"week": 10
			}
		];
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

	app.get('/api/plays/:gid', function(req, res) {

		var plays = [
			{
				"pid": 200,
				"time": 146,
				"type": "rush",
				"prediction": .1285
			},
			{
				"pid": 225,
				"time": 502,
				"type": "pass",
				"prediction": .1120
			},
			{
				"pid": 250,
				"time": 1023,
				"type": "pass",
				"prediction": .13
			},
			{
				"pid": 275,
				"time": 2253,
				"type": "rush",
				"prediction": .1259
			},
			{
				"pid": 300,
				"time": 2423,
				"type": "pass",
				"prediction": .5882
			},
			{
				"pid": 325,
				"time": 2901,
				"type": "rush",
				"prediction": .6002
			},		
			{
				"pid": 350,
				"time": 3004,
				"type": "rush",
				"prediction": .9234
			}
		];
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(plays));
    });
};