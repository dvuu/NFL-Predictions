var _ = require('underscore');

var Game = module.exports.Game = function (gameDataRaw) {
	this.gameId = gameDataRaw.gid;
	this.season = gameDataRaw.seas;
	this.week = gameDataRaw.wk;
	this.home = gameDataRaw.h;
	this.visitor = gameDataRaw.v;
	this.ptsHome = gameDataRaw.ptsh;
	this.ptsVisitor = gameDataRaw.ptsv;
	this.plays = [ ];
}

Game.prototype.addPlay = function (play) {
	this.plays.push(play);
}

function compareWpDifference (a, b) {
	return Math.abs(b.homeWpDiff) - Math.abs(a.homeWpDiff);
}

Game.prototype.findBiggestPlays = function (plays, n) {
	var sortedPlays = this.plays.sort(compareWpDifference);
	return sortedPlays.slice(0, n);
}

Game.prototype.toJSON = function () {
	var copy = _.clone(this);
	delete copy.plays;
	return copy;
}