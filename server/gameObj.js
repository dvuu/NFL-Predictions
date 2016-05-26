module.exports.Game = function (game) {
	this.season = game.season;
	this.week = game.week;
	this.gameId = game.gameId;
	this.home = game.home;
	this.visitor = game.visitor;
	this.plays = game.playIds;
	this.ptsHome = game.ptsHome;
	this.ptsVisitor = game.ptsVisitor;
}