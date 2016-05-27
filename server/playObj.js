var Game = require('./gameObj.js')
module.exports.Play = function (playDataRaw, playNumber, gameDataRaw, isLastPlay) {
	this.playNumber = playNumber;

	this.visitor = gameDataRaw.visitor;
	this.home = gameDataRaw.home;

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

	this.yardsGained(isLastPlay);
}

module.exports.Play.prototype.fixSecondsForOvertime = function(seconds) {
	return (this.inOvertime ? seconds = seconds - 900 : seconds);
}

module.exports.Play.prototype.findHomeScore = function() {
	return (this.home == this.offense ? this.ptsOffense : this.ptsDefense);
}

module.exports.Play.prototype.findVisitorScore = function() {
	return (this.visitor == this.offense ? this.ptsOffense : this.ptsDefense);
}

module.exports.Play.prototype.yardsGained = function(isLastPlay) {
	if (!isLastPlay) {
		if (this.home == this.offense) {
			this.homeYdsGained = (plays[i + 1].offYardline - this.offYardline);
		}
		else {
			this.visitorYdsGained = (plays[i + 1].offYardline - this.offYardline);
		}
	}
}