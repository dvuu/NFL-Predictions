var fs = require('fs');
var GAME_DATA = JSON.parse(fs.readFileSync('../data/games.json'));
var RESULT_DATA = JSON.parse(fs.readFileSync('../data/results.json'));
var _ = require('underscore');
var url = require('url');

function games() {
	var result = [ ];
	for (var i = 0; i < GAME_DATA.length; i++) {
		var obj = {
			gameId: GAME_DATA[i].gid,
			season: GAME_DATA[i].seas,
			home: GAME_DATA[i].h,
			visitor: GAME_DATA[i].v,
			week: GAME_DATA[i].wk
		};
		result.push(obj);
	}
	return result;
};

module.exports = function(app) {

	// Returns list of all games
	app.get('/api/games', function(req, res) {
		console.log("Client requested list of all games...");
		var result = games();
		res.writeHead(200,{'Content-Type': 'application/json'});
	    res.end(JSON.stringify(result));
	});
	// Return list of games from a season
	app.get('/api/gamesBySeason/:seas', function(req, res) {
		var season = req.params.seas;
		console.log("Client requested list of all games from season: " + season + "...");
		var allGames = games();
		var result = [ ];
		for (var i = 0; i < allGames.length; i++) {
		 	if(allGames[i].season == season){
		 		result.push(allGames[i]);
		 	}
	 	}
		res.writeHead(200,{'Content-Type': 'application/json'});
    	res.end(JSON.stringify(result));
    });

	app.get('/api/gamesByWeek/:seas/:week', function(req, res) {
		var season = req.params.seas;
		var week = req.params.week;

		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(plays));
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
				obj.homeWp = (1 - RESULT_DATA[i].VisitorWP);
				obj.visitorWp = RESULT_DATA[i].VisitorWP;
				// if (RESULT_DATA[i].v !== RESULT_DATA[i].off) {
				// 	obj.homePrediction = RESULT_DATA[i].OffWinPred;
				// 	obj.visitorPrediction = (1 - RESULT_DATA[i].OffWinPred);
				// }
				// else{
				// 	obj.homePrediction = (1 - RESULT_DATA[i].OffWinPred);
				// 	obj.visitorPrediction = RESULT_DATA[i].OffWinPred;
				// }
				plays.push(obj);
			}
		}
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(plays));
    });

};
