var _ = require('underscore');
var url = require('url');
var data = require('./data.js');
data.initialize(function() {
	console.log("Data has been parsed. App is now ready");
});

// Changes overtime seconds to negative
// First solution: assumes that any play with game time greater than previous game is overtime
	// Penalties that give time back are assumed to be overtime, making this solution not work.
	// ----------------------------
	// var hitOT = false;
	// for (var i = 0; i < plays.length; ++i) {
	// 	var isNotFirstPlay = (i !== 0);
	// 	var isOutOfOrder = (isNotFirstPlay && (plays[i - 1].time < plays[i].time));
	// 	if (isOutOfOrder)
	// 		hitOT = true;
	// 	if (hitOT) {
	// ---------------------------
function fixSecondsForOvertime(plays) {
	var	result = [ ];
	for (var i = 0; i < plays.length; ++i) {
		if(plays[i].inOvertime){
			var play = {
				idx: i,
				gameId: data.PLAYS[i].gid,
				home: findHomeTeam(data.PLAYS[i].v, data.PLAYS[i].off, data.PLAYS[i].def),
				visitor: data.PLAYS[i].v,
				playId: data.PLAYS[i].pid,
				offense: data.PLAYS[i].off,
				defense: data.PLAYS[i].def,
				type: data.PLAYS[i].type,
				driveSequence: data.PLAYS[i].dseq,
				length: data.PLAYS[i].len,
				quarter: data.PLAYS[i].qtr,
				minute: data.PLAYS[i].MIN,
				seconds: data.PLAYS[i].sec,
				ptsOffense: data.PLAYS[i].ptso,
				ptsDefense: data.PLAYS[i].ptsd,
				timeoutsOffense: data.PLAYS[i].TIMO,
				timeoutsDefense: data.PLAYS[i].TIMD,
				down: data.PLAYS[i].Down,
				yardsToGoForFirstDown: data.PLAYS[i].YTG,
				yardLineFromOwnGoal: data.PLAYS[i].YardLine,
				fieldZone: data.PLAYS[i].zone,
				firstDown: data.PLAYS[i].fd,
				shotGun: data.PLAYS[i].sg,
				noHuddle: data.PLAYS[i].nh,
				pointsScored: data.PLAYS[i].pts,
				tackle: data.PLAYS[i].tck,
				sack: data.PLAYS[i].sk,
				penalty: data.PLAYS[i].pen,
				interception: data.PLAYS[i].ints,
				fumble: data.PLAYS[i].fum,
				safety: data.PLAYS[i].saf,
				block: data.PLAYS[i].blk,
				offensiveLineI: data.PLAYS[i].olid,
				winner: data.PLAYS[i].Winner,
				totalPtsScr: data.PLAYS[i].TOTp,
				scoreDiff: data.PLAYS[i].Score,
				inOvertime: data.PLAYS[i].InOT,
				time: (data.PLAYS[i].Seconds - 900),
				AdjustedScore: data.PLAYS[i].AdjustedScore,
				vegasSpread: data.PLAYS[i].Spread,
				actualGameOutcome: data.PLAYS[i].Result,
				homeWp: (1 - data.PLAYS[i].VisitorWP),
				visitorWp: data.PLAYS[i].VisitorWP
			}
		}
		else {
			var play = plays[i];
		}
		result.push(play);
	}
	return result;
}

function findHomeTeam(visitor, off, def) {
	return (visitor == off ? def : off);
}

function getPlaysForGame(gameId){
	var plays = [ ];
	var curIdx = 0;
	for (var i = 0; i < data.PLAYS.length; ++i) {
		if (gameId == data.PLAYS[i].gid) {
			var obj = {
				idx: curIdx++,
				gameId: data.PLAYS[i].gid,
				home: findHomeTeam(data.PLAYS[i].v, data.PLAYS[i].off, data.PLAYS[i].def),
				visitor: data.PLAYS[i].v,
				playId: data.PLAYS[i].pid,
				offense: data.PLAYS[i].off,
				defense: data.PLAYS[i].def,
				type: data.PLAYS[i].type,
				driveSequence: data.PLAYS[i].dseq,
				length: data.PLAYS[i].len,
				quarter: data.PLAYS[i].qtr,
				minute: data.PLAYS[i].MIN,
				seconds: data.PLAYS[i].sec,
				ptsOffense: data.PLAYS[i].ptso,
				ptsDefense: data.PLAYS[i].ptsd,
				timeoutsOffense: data.PLAYS[i].TIMO,
				timeoutsDefense: data.PLAYS[i].TIMD,
				down: data.PLAYS[i].Down,
				yardsToGoForFirstDown: data.PLAYS[i].YTG,
				yardLineFromOwnGoal: data.PLAYS[i].YardLine,
				fieldZone: data.PLAYS[i].zone,
				firstDown: data.PLAYS[i].fd,
				shotGun: data.PLAYS[i].sg,
				noHuddle: data.PLAYS[i].nh,
				pointsScored: data.PLAYS[i].pts,
				tackle: data.PLAYS[i].tck,
				sack: data.PLAYS[i].sk,
				penalty: data.PLAYS[i].pen,
				interception: data.PLAYS[i].ints,
				fumble: data.PLAYS[i].fum,
				safety: data.PLAYS[i].saf,
				block: data.PLAYS[i].blk,
				offensiveLineI: data.PLAYS[i].olid,
				winner: data.PLAYS[i].Winner,
				totalPtsScr: data.PLAYS[i].TOTp,
				scoreDiff: data.PLAYS[i].Score,
				inOvertime: data.PLAYS[i].InOT,
				time: data.PLAYS[i].Seconds,
				AdjustedScore: data.PLAYS[i].AdjustedScore,
				vegasSpread: data.PLAYS[i].Spread,
				actualGameOutcome: data.PLAYS[i].Result,
				homeWp: (1 - data.PLAYS[i].VisitorWP),
				visitorWp: data.PLAYS[i].VisitorWP
			};
			plays.push(obj);
		}
	}
	return (fixSecondsForOvertime(plays));
}

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
		for (var i = 0; i < data.GAMES.length; ++i) {
		 	if(data.GAMES[i].season == season){
		 		result.push(data.GAMES[i]);
		 	}
	 	}
		res.writeHead(200,{'Content-Type': 'application/json'});
    	res.end(JSON.stringify(result));
    });

	// Return list of all games from a week of a season.
	app.get('/api/games/:season/:week', function(req, res) {
		var season = req.params.season;
		var week = req.params.week;
		console.log("Client requested list of all games from season: " + season + ": Week " + week + "...");
		var result = [ ];
		for (var i = 0; i < data.GAMES.length; ++i) {
		 	if(data.GAMES[i].season == season && data.GAMES[i].week == week){
		 		result.push(data.GAMES[i]);
		 	}
	 	}
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

/**/

	app.get('/api/gamesByTeam/:teamAbbreviation', function(req, res) {
		var team = req.params.teamAbbreviation;
		console.log("Client requested list of all games from the selected team: " + team + "...");
		var result = [ ];
		for (var i = 0; i < data.GAMES.length; ++i) {
		 	if(data.GAMES[i].visitor == team || data.GAMES[i].home == team){
		 		result.push(data.GAMES[i]);
		 	}
	 	}
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

	//
	app.get('/api/plays/:gameId', function(req, res) {
		var gameId = req.params.gameId;
		console.log("Client requested plays from game " + gameId + "...");
		var plays = getPlaysForGame(gameId);
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(plays));
    });

    function wpDiffComparison(a, b) {
    	return Math.abs(b.homeWpDiff)- Math.abs(a.homeWpDiff);
    }
    function findBigestPlays(plays, n) {
    	var sortedPlays = plays.sort(wpDiffComparison);
		return sortedPlays.slice(0, n);
    }
    // returns top 10 plays from a game
    app.get('/api/topTen/:gameId', function(req, res) {
    	var gameId = req.params.gameId;
    	console.log("Client requested top ten plays for game " + gameId + "...");
    	var plays = getPlaysForGame(gameId);
    	for (var i = 0; i < plays.length; ++i) {
    		var notLastPlay = (i < (plays.length - 1));
			if (notLastPlay) {
				var curentWP = (1 - plays[i].visitorWp);
				var futureWP = (1 - plays[i + 1].visitorWp);
				plays[i].homeWpDiff = (futureWP - curentWP);
			}
		}
		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(findBigestPlays(plays, 10)));
    });
}

//     //returns top 10 plays from all games combined 
//     app.get('/api/topTen', function(req, res) {
//     	console.log("Client is requested Top Ten plays from all all games combined...")
//     	var results = [ ];
//     	for (var i = 0; i < data.PLAYS.length - 1; i++) {
//     		if (data.PLAYS[i].gid !== data.PLAYS[i + 1].gid) {
//     			continue;
//     		}
//     		var curentWP = (1 - data.PLAYS[i].VisitorWP);
// 			var futureWP = (1 - data.PLAYS[i + 1].VisitorWP);
// 			var obj = {
//     			gameId: data.PLAYS[i].gid,
// 				playId: data.PLAYS[i].pid,
// 				time: data.PLAYS[i].Seconds,
// 				type: data.PLAYS[i].type,
// 				homeWpDiff: futureWP - curentWP
//     		};
// 	    	results.push(obj);	
//     	}
//     	var allTopTen = findBigestPlays(results, 100)
//     	res.writeHead(200,{'Content-Type': 'application/json'});
//         res.end(JSON.stringify(allTopTen));
//     });
// }
