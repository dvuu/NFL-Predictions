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
	this.homeWp = (1 - playDataRaw.VisitorWP);
	this.visitorWp = playDataRaw.VisitorWP;

	// Added properties and values
	this.wpDifference(isLastPlay, nextPlayDataRaw);
	this.fixSecondsForOvertime(playDataRaw.Seconds);
	this.findCurrentScore();
	this.yardsGained(isLastPlay, nextPlayDataRaw);
}

Play.prototype.fixSecondsForOvertime = function(seconds) {
	this.time = (this.inOvertime ? seconds = seconds - 900 : seconds);
}

Play.prototype.findCurrentScore = function() {
	this.ptsHome = (this.home == this.offense ? this.ptsOffense : this.ptsDefense);
	this.ptsVisitor = (this.visitor == this.offense ? this.ptsOffense : this.ptsDefense);
}

// TODO: Verify yardline gains whether to use prev or next play
Play.prototype.yardsGained = function(isLastPlay, nextPlayDataRaw) {
	if (!isLastPlay) {
		this.ydsGained = (nextPlayDataRaw.Yardline - this.offYardline);
	}
}

Play.prototype.wpDifference = function (isLastPlay, nextPlayDataRaw) {
	if (!isLastPlay) {
		this.homeWpDiff = ((1 - nextPlayDataRaw.VisitorWP) - this.homeWp);
		this.visitorWpDiff = (nextPlayDataRaw.VisitorWP - this.visitorWp);
	}
}






















