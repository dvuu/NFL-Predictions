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
// adds up all plays absolute WpDiff and return that number when called
Game.prototype.sumGameWPChange = function() {
	var changesInGame = 0;
	for (var i = 0; i < this.plays.length; i++) {
		if (i < this.plays.length - 1) {
			var changeInPlays = Math.abs(this.plays[i].homeWpDiff);
			changesInGame += changeInPlays;
		}
	}
	return changesInGame;
}

//tells the sort function to sort for the most exciting games to be up top
Game.compareWpDiffTotalDec = function(a, b) {
	return Math.abs(b.totalExcitement || 0) - Math.abs(a.totalExcitement || 0);
}
//tells the sort function to sort for the most boring games to be up top
Game.compareWpDiffTotalAsc = function(a, b) {
	return Math.abs(a.totalExcitement || 0) - Math.abs(b.totalExcitement || 0);
}

Game.compareWpDifference = function(play1, play2) {
	return Math.abs(play2.homeWpDiff || 0) - Math.abs(play1.homeWpDiff || 0);
}