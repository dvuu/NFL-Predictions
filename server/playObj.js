var Game = require('./gameObj.js')
var Play = module.exports.Play = function (playDataRaw, nextPlayDataRaw, idx, gameDataRaw, isLastPlay) {
	this.idx = idx;

	this.gameId = gameDataRaw.gid;
	this.visitor = gameDataRaw.v;
	this.home = gameDataRaw.h;

	this.playId = playDataRaw.pid;
	this.offense = playDataRaw.off;
	this.defense = playDataRaw.def;
	this.type = playDataRaw.type;
	this.driveSequence = playDataRaw.dseq;
	this.length = playDataRaw.len;
	this.quarter = playDataRaw.qtr;
	this.minute = playDataRaw.MIN;
	this.second = playDataRaw.sec;
	this.ptsOffense = playDataRaw.ptso;
	this.ptsDefense = playDataRaw.ptsd;
	this.timeoutsOffense = playDataRaw.TIMO;
	this.timeoutsDefense = playDataRaw.TIMD;
	this.down = playDataRaw.Down;
	this.yardsToGoForFirstDown = playDataRaw.YTG;
	this.offYardline = playDataRaw.Yardline;
	this.fieldZone = playDataRaw.zone;
	this.firstDown = playDataRaw.fd;
	this.shotGun = playDataRaw.sg;
	this.noHuddle = playDataRaw.nh;
	this.pointsScored = playDataRaw.pts;
	this.tackle = playDataRaw.tck;
	this.sack = playDataRaw.sk;
	this.penalty = playDataRaw.pen;
	this.interception = playDataRaw.ints;
	this.fumble = playDataRaw.fum;
	this.safety = playDataRaw.saf;
	this.block = playDataRaw.blk;
	this.offensiveLineI = playDataRaw.olid;
	this.winner = playDataRaw.Winner;
	this.totalPtsScr = playDataRaw.TOTp;
	this.scoreDiff = playDataRaw.Score;
	this.AdjustedScore = playDataRaw.AdjustedScore;
	this.vegasSpread = playDataRaw.Spread;
	this.actualGameOutcome = playDataRaw.Result;
	this.inOvertime = playDataRaw.InOT;
	this.visitorWp = playDataRaw.VisitorWP;
	this.homeWp = (1 - this.visitorWp);

	this.time = this.fixSecondsForOvertime(playDataRaw.Seconds);
	this.ptsHome = this.findHomeScore();
	this.ptsVisitor = this.findVisitorScore();

	this.yardsGained(isLastPlay, nextPlayDataRaw);
	this.addWinPredictionDifference(playDataRaw, nextPlayDataRaw, isLastPlay);
}

Play.prototype.fixSecondsForOvertime = function(seconds) {
	return (this.inOvertime ? seconds = seconds - 900 : seconds);
}

Play.prototype.findHomeScore = function() {
	return (this.home == this.offense ? this.ptsOffense : this.ptsDefense);
}

Play.prototype.findVisitorScore = function() {
	return (this.visitor == this.offense ? this.ptsOffense : this.ptsDefense);
}

Play.prototype.yardsGained = function(isLastPlay, nextPlayDataRaw) {
	if (!isLastPlay) {
		this.ydsGained = (nextPlayDataRaw.Yardline - this.offYardline);
	}
}

Play.prototype.addWinPredictionDifference = function(playDataRaw, nextPlayDataRaw, isLastPlay) {
	if (!isLastPlay) {
		this.homeWpDiff = ((1 - nextPlayDataRaw.VisitorWP) - this.homeWp);
		this.visitorWpDiff = (nextPlayDataRaw.VisitorWP - this.visitorWp);
	}
}

// // Creates array of plays
// function getPlaysForGame(gameId){
// 	var plays = [ ];
// 	var curIdx = 0;
// 	for (var i = 0; i < data.PLAYS.length; ++i) {
// 		if (gameId == data.PLAYS[i].gid) {
// 			var obj = {
// 				idx: curIdx++,
// 				gameId: data.PLAYS[i].gid,
// 				home: findHomeTeam(data.PLAYS[i].v, data.PLAYS[i].off, data.PLAYS[i].def),
// 				visitor: data.PLAYS[i].v,
// 				playId: data.PLAYS[i].pid,
// 				offense: data.PLAYS[i].off,
// 				defense: data.PLAYS[i].def,
// 				type: data.PLAYS[i].type,
// 				driveSequence: data.PLAYS[i].dseq,
// 				length: data.PLAYS[i].len,
// 				quarter: data.PLAYS[i].qtr,
// 				minute: data.PLAYS[i].MIN,
// 				seconds: data.PLAYS[i].sec,
// 				ptsOffense: data.PLAYS[i].ptso,
// 				ptsDefense: data.PLAYS[i].ptsd,
// 				timeoutsOffense: data.PLAYS[i].TIMO,
// 				timeoutsDefense: data.PLAYS[i].TIMD,
// 				down: data.PLAYS[i].Down,
// 				yardsToGoForFirstDown: data.PLAYS[i].YTG,
// 				offYardline: data.PLAYS[i].Yardline,
// 				fieldZone: data.PLAYS[i].zone,
// 				firstDown: data.PLAYS[i].fd,
// 				shotGun: data.PLAYS[i].sg,
// 				noHuddle: data.PLAYS[i].nh,
// 				pointsScored: data.PLAYS[i].pts,
// 				tackle: data.PLAYS[i].tck,
// 				sack: data.PLAYS[i].sk,
// 				penalty: data.PLAYS[i].pen,
// 				interception: data.PLAYS[i].ints,
// 				fumble: data.PLAYS[i].fum,
// 				safety: data.PLAYS[i].saf,
// 				block: data.PLAYS[i].blk,
// 				offensiveLineI: data.PLAYS[i].olid,
// 				winner: data.PLAYS[i].Winner,
// 				totalPtsScr: data.PLAYS[i].TOTp,
// 				scoreDiff: data.PLAYS[i].Score,
// 				inOvertime: data.PLAYS[i].InOT,
// 				time: fixSecondsForOvertime(data.PLAYS[i].InOT, data.PLAYS[i].Seconds),
// 				AdjustedScore: data.PLAYS[i].AdjustedScore,
// 				vegasSpread: data.PLAYS[i].Spread,
// 				actualGameOutcome: data.PLAYS[i].Result,
// 				homeWp: (1 - data.PLAYS[i].VisitorWP),
// 				visitorWp: data.PLAYS[i].VisitorWP,
// 				ptsHome: (findHomeScoreGained(data.PLAYS[i].v, data.PLAYS[i].off,
// 					data.PLAYS[i].def, data.PLAYS[i].ptso, data.PLAYS[i].ptsd)),
// 				ptsVisitor: (findVisitorScoreGained(data.PLAYS[i].v, data.PLAYS[i].off,
// 					data.PLAYS[i].ptso, data.PLAYS[i].ptsd))
// 			};
// 			plays.push(obj);
// 		}
		
// 	}
// 	addPointsGainPerPlay(plays);
// 	findYardsGainedPerPlay(plays);
// 	addWinPredictionDifference(plays);
// 	return plays;
// }

// // Finds home team
// function findHomeTeam(visitor, off, def) {
// 	return (visitor == off ? def : off);
// }

// // Use InOT value evaluate if seconds left is in overtime
// // if true, -900. assuming OT < 900secs (900 secs in a quarter)
// function fixSecondsForOvertime(overtime, time) {
// 	return (overtime ? time = time - 900 : time);
// }

// // Finds home score gained per play from ptsOffense and ptsDefense
// function findHomeScoreGained(visitor, off, def, ptsOff, ptsDef) {
// 	var home = findHomeTeam(visitor, off, def);
// 	return (home == off ? ptsOff : ptsDef);
// }

// // Finds visitor score gained per play from ptsOffense and ptsDefense
// function findVisitorScoreGained(visitor, off, ptsOff, ptsDef) {
// 	return (visitor == off ? ptsOff : ptsDef);
// }

// // Finds home and visitor yards gained per play
// function findYardsGainedPerPlay(plays) {
// 	for (var i = 0; i < plays.length; ++i) {
// 		var notLastPlay = (i < (plays.length - 1));
// 		if (notLastPlay) {
// 			if (plays[i].home == plays[i].offense) {
// 				plays[i].homeYdsGained = (plays[i + 1].offYardline - plays[i].offYardline);
// 			}
// 			else {
// 				plays[i].visitorYdsGained = (plays[i + 1].offYardline - plays[i].offYardline);
// 			}
// 		}
// 	}
// }

// // Calculates points gained per play propety
// function addPointsGainPerPlay(plays) {
// 	for (var i = 0; i < plays.length; ++i) {
// 		var notLastPlay = (i < (plays.length - 1));
// 		if (notLastPlay) {
// 			plays[i].ptsHomeGain = (plays[i + 1].ptsHome - plays[i].ptsHome);
// 			plays[i].ptsVisitorGain = (plays[i + 1].ptsVisitor - plays[i].ptsVisitor);
// 		}
// 	}
// }

// // Calculates win prediction difference
// function addWinPredictionDifference(plays) {
// 	for (var i = 0; i < plays.length; ++i) {
// 		var notLastPlay = (i < (plays.length - 1));
// 		if (notLastPlay) {
// 			plays[i].homeWpDiff = (plays[i + 1].homeWp - plays[i].homeWp);
// 			plays[i].visitorWpDiff = (plays[i + 1].visitorWp - plays[i].visitorWp);
// 		}
// 	}
// }

// function wpDiffComparison(a, b) {
// 	return Math.abs(b.homeWpDiff)- Math.abs(a.homeWpDiff);
// }
// function findBiggestPlays(plays, n) {
// 	var sortedPlays = plays.sort(wpDiffComparison);
// 	return sortedPlays.slice(0, n);
// }