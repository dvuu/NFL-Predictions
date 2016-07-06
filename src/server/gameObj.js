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

Game.prototype.sumGameStateChange = function() {
	var changesInGame = 0;
	for (var i = 0; i < this.plays.length; i++) {
		if (i < this.plays.length - 1) {
			var changeInPlays = Math.abs(this.plays[i].homeWpDiff);
			changesInGame += changeInPlays;
		}
	}
	return changesInGame;
}

Game.compareWpDifference = function(play1, play2) {
	return Math.abs(play2.homeWpDiff || 0) - Math.abs(play1.homeWpDiff || 0);
}