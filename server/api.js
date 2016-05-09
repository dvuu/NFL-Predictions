var _ = require('underscore');
var url = require('url');
var data = require('./data.js');
data.initialize(function() {
	console.log("Data has been parsed. App is now ready");
});

// Creates array of plays
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
				offYardline: data.PLAYS[i].Yardline,
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
				time: fixSecondsForOvertime(data.PLAYS[i].InOT, data.PLAYS[i].Seconds),
				AdjustedScore: data.PLAYS[i].AdjustedScore,
				vegasSpread: data.PLAYS[i].Spread,
				actualGameOutcome: data.PLAYS[i].Result,
				homeWp: (1 - data.PLAYS[i].VisitorWP),
				visitorWp: data.PLAYS[i].VisitorWP,
				ptsHome: (findHomeScoreGained(data.PLAYS[i].v, data.PLAYS[i].off,
					data.PLAYS[i].def, data.PLAYS[i].ptso, data.PLAYS[i].ptsd)),
				ptsVisitor: (findVisitorScoreGained(data.PLAYS[i].v, data.PLAYS[i].off,
					data.PLAYS[i].ptso, data.PLAYS[i].ptsd))
			};
			plays.push(obj);
		}
	}
	var fix1 = addPointsGainPerPlay(plays);
	var fix2 = findYardsGainedPerPlay(fix1);
	var fixedPlays = addWinPredictionDifference(fix2);
	return fixedPlays;
}

// Finds home team
function findHomeTeam(visitor, off, def) {
	return (visitor == off ? def : off);
}

// Use InOT value evaluate if seconds left is in overtime
// if true, -900. assuming OT < 900secs (900 secs in a quarter)
function fixSecondsForOvertime(overtime, time) {
	return (overtime ? time = time - 900 : time);
}

// Finds home score gained per play from ptsOffense and ptsDefense
function findHomeScoreGained(visitor, off, def, ptsOff, ptsDef) {
	var home = findHomeTeam(visitor, off, def);
	return (home == off ? ptsOff : ptsDef);
}

// Finds visitor score gained per play from ptsOffense and ptsDefense
function findVisitorScoreGained(visitor, off, ptsOff, ptsDef) {
	return (visitor == off ? ptsOff : ptsDef);
}

// Finds home and visitor yards gained per play
function findYardsGainedPerPlay(plays) {
	var result = [ ];
	for (var i = 0; i < plays.length; ++i) {
		var notLastPlay = (i < (plays.length - 1));
		if (notLastPlay) {
			if (plays[i].home == plays[i].offense) {
				plays[i].homeYdsGained = (plays[i + 1].offYardline - plays[i].offYardline);
			}
			else {
				plays[i].visitorYdsGained = (plays[i + 1].offYardline - plays[i].offYardline);
			}
			result.push(plays[i]);
		}
	}
	return result;
}

// Calculates points gained per play propety
function addPointsGainPerPlay(plays) {
	var result = [ ];
	for (var i = 0; i < plays.length; ++i) {
		var notLastPlay = (i < (plays.length - 1));
		if (notLastPlay) {
			plays[i].ptsHomeGain = (plays[i + 1].ptsHome - plays[i].ptsHome);
			plays[i].ptsVisitorGain = (plays[i + 1].ptsVisitor - plays[i].ptsVisitor);
			result.push(plays[i]);
		}
	}
	return result;
}

// Calculates win prediction difference
function addWinPredictionDifference(plays) {
	var result = [ ];
	for (var i = 0; i < plays.length; ++i) {
		var notLastPlay = (i < (plays.length - 1));
		if (notLastPlay) {
			var currentHomeWp = (plays[i].homeWp);
			var futureHomeWp = (plays[i + 1].homeWp);
			var currentVisitorWp = (plays[i].visitorWp);
			var futureVisitorWp = (plays[i + 1].visitorWp);
			plays[i].homeWpDiff = (futureHomeWp - currentHomeWp);
			plays[i].visitorWpDiff = (futureVisitorWp - currentVisitorWp);
			result.push(plays[i]);
		}
	}
	return result;
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

	// returns all plays
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
