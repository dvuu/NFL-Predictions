var fs = require('fs');
var GAME_DATA = JSON.parse(fs.readFileSync('../data/games.json'));
var RESULT_DATA = JSON.parse(fs.readFileSync('../data/results.json'));
var _ = require('underscore');
var url = require('url');

module.exports = function(app) {

	app.get('/api/games', function(req, res) {
		var result = [ ];
		for (var i = 0; i < GAME_DATA.length; i++) {
			var obj = {};
			obj.gid = GAME_DATA[i].gid;
			obj.season = GAME_DATA[i].seas;
			obj.home = GAME_DATA[i].h;
			obj.visitor = GAME_DATA[i].v;
			obj.week = GAME_DATA[i].wk;
			result.push(obj);
		}
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

	app.get('/api/plays/:gid', function(req, res) {
		var gameId = req.params.gid;
		var plays = [ ];
		for (var i = 0; i < RESULT_DATA.length; i++) {
			if (gameId == RESULT_DATA[i].gid) {
				var obj = {};
				obj.playId = RESULT_DATA[i].pid;	
				obj.time = RESULT_DATA[i].Seconds;
				obj.type = RESULT_DATA[i].type;
				if (RESULT_DATA[i].v !== RESULT_DATA[i].off) {
					obj.homePrediction = RESULT_DATA[i].OffWinPred;
				}
				else{
					obj.homePrediction = (1 - RESULT_DATA[i].OffWinPred);
				}
				if (RESULT_DATA[i].v == RESULT_DATA[i].off) {
					obj.visitorPrediction = RESULT_DATA[i].OffWinPred;
				}
				else{
					obj.visitorPrediction = (1 - RESULT_DATA[i].OffWinPred);
				}
				plays.push(obj);
			}
		}
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(plays));
    });
};