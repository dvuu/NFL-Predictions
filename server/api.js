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
		_.each(data.GAMES, function (game) {
			if (season == game.season) {
				result.push(game);
			}
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
		_.each(data.GAMES, function (game) {
			if (season == game.season && week == game.week) {
				result.push(game);
			}
		});
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

	// returns all plays
	app.get('/api/plays/:gameId', function(req, res) {
		var gameId = req.params.gameId;
		console.log("Client requested plays from game " + gameId + "...");
		var game = data.GAMES[gameId];
		var plays = game.plays;
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(plays));
    });

    // returns top 10 plays from a game
    app.get('/api/topTen/:gameId', function(req, res) {
    	var gameId = req.params.gameId;
    	console.log("Client requested top ten plays for game " + gameId + "...");
    	var game = data.GAMES[gameId];
    	var topPlays = game.findBiggestPlays(10);
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(topPlays));
    });

    //returns top 10 plays from all games combined 
    app.get('/api/topTen', function(req, res) {
    	console.log("Client is requested Top Ten plays from all all games combined...")
	// TODO:
	// 1. get top n plays from each game, store in an array
	// 2. sort that array
	// 3. return first n plays from that array
	    	
  //   	var result = [ ];
  //   	for (var i = 0; i < data.PLAYS.length - 1; ++i) {
  //   		if (data.PLAYS[i].gid !== data.PLAYS[i + 1].gid) {
  //   			continue;
  //   		}
  //   		var curentWP = (1 - data.PLAYS[i].VisitorWP);
		// 	var futureWP = (1 - data.PLAYS[i + 1].VisitorWP);
		// 	var obj = {
  //   			gameId: data.PLAYS[i].gid,
		// 		playId: data.PLAYS[i].pid,
		// 		type: data.PLAYS[i].type,
		// 		time: fixSecondsForOvertime(data.PLAYS[i].InOT, data.PLAYS[i].Seconds),
		// 		homeWpDiff: futureWP - curentWP
  //   		};
	 //    	result.push(obj);	
  //   	}
		// var allTopTen = findBiggestPlays(result, 100)
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
