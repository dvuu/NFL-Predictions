var _ = require('underscore');
var url = require('url');
var data = require('./data.js');
data.initialize(function() {
	console.log("Data has been parsed. App is now ready");
});


module.exports = function(app) {

	// Returns list of all games.
	app.get('/api/games', function(req, res) {
		console.log("Client requested list of all games...");
		res.writeHead(200,{'Content-Type': 'application/json'});
	    res.end(JSON.stringify(data.GAMES));
	});

	// Return list of games from a season.
	app.get('/api/games/:season', function(req, res) {
		var season = req.params.season;
		console.log("Client requested list of all games from season: " + season + "...");
		var result = [ ];
		_.each(data.GAMES, function (Game) {
			season == Game.season ? results.push(Game): null;
    	});
    	res.writeHead(200,{'Content-Type': 'application/json'});
	    res.end(JSON.stringify(result));
	});

	// Return list of all games from a week of a season.
	app.get('/api/games/:season/:week', function(req, res) {
		var season = req.params.season;
		var week = req.params.week;
		console.log("Client requested list of all games from season: " + season + ": Week " + week + "...");
		var result = [ ];
		_.each(data.GAMES, function (Game) {
			season == Game.season && week == Game.week ? results.push(Game) : null; 
		});
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

	// returns all plays
	app.get('/api/plays/:gameId', function(req, res) {
		var gameId = req.params.gameId;
		var plays = undefined;
		console.log("Client requested plays from game " + gameId + "...");
		_.each(data.GAMES, function (Game) {
			gameId == Game.gameId ? plays = Game.plays : null;
		});
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(plays));
    });

    // returns top 10 plays from a game
    app.get('/api/topTen/:gameId', function(req, res) {
    	var gameId = req.params.gameId;
    	var plays = undefined;
    	console.log("Client requested top ten plays for game " + gameId + "...");
    	_.each(data.GAMES, function (Game) {
			gameId == Game.gameId ? plays = Game.plays : null;
		});
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(findBiggestPlays(plays, 10)));
    });

    //returns top 10 plays from all games combined 
    app.get('/api/topTen', function(req, res) {
    	console.log("Client is requested Top Ten plays from all all games combined...")
    	var results = [ ];
    	for (var i = 0; i < data.PLAYS.length - 1; ++i) {
    		if (data.PLAYS[i].gid !== data.PLAYS[i + 1].gid) {
    			continue;
    		}
    		var curentWP = (1 - data.PLAYS[i].VisitorWP);
			var futureWP = (1 - data.PLAYS[i + 1].VisitorWP);
			var obj = {
    			gameId: data.PLAYS[i].gid,
				playId: data.PLAYS[i].pid,
				type: data.PLAYS[i].type,
				time: fixSecondsForOvertime(data.PLAYS[i].InOT, data.PLAYS[i].Seconds),
				homeWpDiff: futureWP - curentWP
    		};
	    	results.push(obj);	
    	}
	var allTopTen = findBiggestPlays(results, 100)
    	res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(allTopTen));
    });	

  //   app.get('/api/gamesByTeam/:teamAbbreviation', function(req, res) {
		// var team = req.params.teamAbbreviation;
		// console.log("Client requested list of all games from the selected team: " + team + "...");
		// var result = [ ];
		// for (var i = 0; i < data.GAMES.length; ++i) {
		//  	if(data.GAMES[i].visitor == team || data.GAMES[i].home == team){
		//  		result.push(data.GAMES[i]);
		//  	}
	 // 	}
		// res.writeHead(200,{'Content-Type': 'application/json'});
  //       res.end(JSON.stringify(result));
  //   });
};
