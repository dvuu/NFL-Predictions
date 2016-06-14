var _ = require('underscore');
var helpers = require('../utilities/helpers.js');

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

Game.prototype.findBiggestPlays = function (n) {
	return helpers.topN(this.plays, n, Game.compareWpDifference);
}

Game.prototype.toJSON = function () {
	var copy = _.clone(this);
	delete copy.plays;
	return copy;
}

Game.compareWpDifference = function(a, b) {
	return Math.abs(b.homeWpDiff || 0) - Math.abs(a.homeWpDiff || 0);
}
