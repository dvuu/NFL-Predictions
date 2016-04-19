var fs = require('fs');
var GAME_DATA = JSON.parse(fs.readFileSync('../data/games.json'));
var RESULT_DATA = JSON.parse(fs.readFileSync('../data/results.json'));
var _ = require('underscore');
var url = require('url');

// function filterGames(minGameId) {
// 	var i = 0;
// 	while (i < minGameId) {
// 		GAME_DATA.shift();
// 		++i;
// 	}
// }
// filterGames(2980);

// grabs basic information from all games
function allGames() {
	var result = [ ];
	for (var i = 2980; i < GAME_DATA.length; ++i) {
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
var ALL_GAMES = allGames();

module.exports = function(app) {

	// Returns list of all games.
	app.get('/api/games', function(req, res) {
		console.log("Client requested list of all games...");
		res.writeHead(200,{'Content-Type': 'application/json'});
	    res.end(JSON.stringify(ALL_GAMES));
	});

	// Return list of games from a season.
	app.get('/api/gamesBySeason/:season', function(req, res) {
		var season = req.params.season;
		console.log("Client requested list of all games from season: " + season + "...");
		var result = [ ];
		for (var i = 0; i < ALL_GAMES.length; ++i) {
		 	if(ALL_GAMES[i].season == season){
		 		result.push(ALL_GAMES[i]);
		 	}
	 	}
		res.writeHead(200,{'Content-Type': 'application/json'});
    	res.end(JSON.stringify(result));
    });

	// Return list of all games from a week of a season.
	app.get('/api/gamesByWeek/:season/:week', function(req, res) {
		var season = req.params.season;
		var week = req.params.week;
		console.log("Client requested list of all games from season: " + season + ": Week " + week + "...");
		var result = [ ];
		for (var i = 0; i < ALL_GAMES.length; ++i) {
		 	if(ALL_GAMES[i].season == season && ALL_GAMES[i].week == week){
		 		result.push(ALL_GAMES[i]);
		 	}
	 	}


		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

	//
	app.get('/api/plays/:gameId', function(req, res) {
		var gameId = req.params.gameId;
		var plays = [ ];
		for (var i = 0; i < RESULT_DATA.length; ++i) {
			if (gameId == RESULT_DATA[i].gid) {
				var obj = {
					playId: RESULT_DATA[i].pid,
					time: RESULT_DATA[i].Seconds,
					type: RESULT_DATA[i].type,
					homeWp: (1 - RESULT_DATA[i].VisitorWP),
					visitorWp: RESULT_DATA[i].VisitorWP
				};

				// Solution 1: didn't know about visitorWP
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
