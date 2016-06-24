var _ = require('underscore');
var data = require('./data.js');
data.initialize(function() {
	console.log("Data has been parsed. App is now ready");
});
var helpers = require('../utilities/helpers.js');
var Game = require('./gameObj.js').Game;

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
		var result = data.getGamesBySeasonAndOrWeek(season);
    	res.writeHead(200,{'Content-Type': 'application/json'});
	    res.end(JSON.stringify(result));
	});

	// Return list of all games from a week of a season.
	app.get('/api/games/:season/:week', function(req, res) {
		var season = req.params.season;
		var week = req.params.week;
		console.log("Client requested list of all games from season: " + season + ": Week " + week + "...");
		var result = [ ];
		var result = data.getGamesBySeasonAndOrWeek(season, week);
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

	// returns all plays
	app.get('/api/plays/:gameId', function(req, res) {
		var gameId = req.params.gameId;
		var plays = undefined;
		console.log("Client requested plays from game " + gameId + "...");
		var game = data.GAMES[gameId];
		if (gameId == game.gameId) {
 			var plays = game.plays;
 		}
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(plays));
    });

    // returns top 10 plays from a game
    app.get('/api/topTen/:gameId', function(req, res) {
    	var gameId = req.params.gameId;
    	console.log("Client requested top ten plays for game " + gameId + "...");
    	var game = data.GAMES[gameId];
    	var topTenPlays = game.findBiggestPlays(10);
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(topTenPlays));
    });

    //returns top 10 plays from all games combined 
    app.get('/api/topTen', function(req, res) {
    	var topTenArr = [ ];
    	var topTenPlaysPerGameArr = undefined;
    	// 1) Get top n plays from each game, store in an array
    	_.each(data.GAMES, function (game) {
			topTenPlaysPerGamesArr = game.findBiggestPlays(10);
			for (var i = topTenPlaysPerGamesArr.length - 1; i >= 0; i--) {
				topTenArr.push(topTenPlaysPerGamesArr[i]);
			}
		});
        // 2) Return top n plays from that array
        var results = helpers.topN(topTenArr, 10, Game.compareWpDifference);
    	res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(results));
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
