var Game = require('./gameObj.js')
var Play = module.exports.Play = function (playDataRaw, nextPlayDataRaw, idx, gameDataRaw, isLastPlay) {
	this.idx = idx;

	// key value pairs from game
	this.gameId = gameDataRaw.gid;
	this.visitor = gameDataRaw.v;
	this.home = gameDataRaw.h;

	// key value pairs from play
	this.playId = playDataRaw.pid;
	this.offense = playDataRaw.off;
	this.defense = playDataRaw.def;
	this.type = playDataRaw.type;
	this.driveSequence = playDataRaw.dseq;
	this.length = playDataRaw.len;
	this.quarter = playDataRaw.qtr;
	this.minute = playDataRaw.MIN;
	this.seconds = playDataRaw.sec;
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
	this.homeWp = (1 - playDataRaw.VisitorWP);
	this.visitorWp = playDataRaw.VisitorWP;
	

	// Win Difference
	if (!isLastPlay) {
		this.homeWpDiff = ((1 - nextPlayDataRaw.VisitorWP) - this.homeWp);
		this.visitorWpDiff = (nextPlayDataRaw.VisitorWP - this.visitorWp);
	}

	// Overtime Fix
	var seconds = playDataRaw.Seconds;
	this.time = (this.inOvertime ? seconds = seconds - 900 : seconds);

	// Find points for home/visitor
	this.ptsHome = (this.home == this.offense ? this.ptsOffense : this.ptsDefense);
	this.ptsVisitor = (this.visitor == this.offense ? this.ptsOffense : this.ptsDefense);

	// Find Yards Gained
	if (!isLastPlay) {
		this.ydsGained = (nextPlayDataRaw.Yardline - this.offYardline);
	}
	
	this.ptsScored = pointLead(playDataRaw, nextPlayDataRaw);
	
	function pointLead(playDataRaw, nextPlayDataRaw) {
		// check to see if there is another play
		if (nextPlayDataRaw) {
		    var team1 = playDataRaw.off;
		    var team2 = playDataRaw.def;
		    var team1Pts = playDataRaw.ptso;
		    var team2Pts = playDataRaw.ptsd;
		    var nextTeam1Pts = nextPlayDataRaw.off == team1 ? nextPlayDataRaw.ptso : nextPlayDataRaw.ptsd;
		    var nextTeam2Pts = nextPlayDataRaw.def == team2 ? nextPlayDataRaw.ptsd : nextPlayDataRaw.ptso;
		    if (team1Pts != nextTeam1Pts) {
		        return nextTeam1Pts - team1Pts;
		    }
		    else if (team2Pts != nextTeam2Pts) {
		        return -(nextTeam2Pts - team2Pts);
		    }
		    else{
		    	return 0;
		    }
		}
		else {
			return 0;
		}
	}

	

	// Points Scored
	// if (!isLastPlay) {
	// 	var isHomeOffense = this.home === this.offense && this.home === nextPlayDataRaw.offense;
	// 	if (isHomeOffense) {
	// 		if (this.ptsOffense < nextPlayDataRaw.ptsOffense) {
	// 			this.ptsHomeScored = 
	// 		}
	// 	}
	// }
}



















