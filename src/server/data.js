var _ = require('underscore');
var csv = require('../utilities/csv.js');

// Game object contains information about the game
//    e.g. home, visitor, id
// ALSO contains a collection (array probably) of plays (Play objects)
var GameObj = require('./gameObj.js');
var Game = GameObj.Game;
// Play object contains information about the play -
//    e.g. id, time, ptso, etc...
var PlayObj = require('./playObj.js');
var Play = PlayObj.Play;
// Could optionally create a Season object

module.exports = {
    initialize: function(callback) {
        var self = this;
	csv.readCsv('../data/trained-data/GAME.csv', function(err, gamesDataRaw) {
            self.GAMES = createGames(gamesDataRaw);
    	    csv.readCsv('../data/trained-data/RESULTS.csv', function(err, playsDataRaw) {
                self.PLAYS = createPlays(playsDataRaw, gamesDataRaw, self.GAMES);
                self.gamesBySeasonsAndWeeks = createGamesBySeasonAndWeek(self.GAMES);
                callback && callback();
            });
        });
    },
    GAMES: null,
    PLAYS: null,
    gamesBySeasonsAndWeeks: null,
    getGamesBySeasonAndOrWeek: function(season, week) {
        var arr = [ ];
        if (week == undefined) {
            for (var curWeek in this.gamesBySeasonsAndWeeks[season]) {
                var gameIdsForCurWeek = this.getGamesBySeasonAndOrWeek(season, curWeek);
                arr = arr.concat(gameIdsForCurWeek);
            };
        }
        else {
            // var arr = this.gamesBySeasonsAndWeeks[season][week].map(function(gameId) {
            //    return this.GAMES[gameId];
            // });
            for (var i = 0; i < this.gamesBySeasonsAndWeeks[season][week].length; i++) {
                var gameId = this.gamesBySeasonsAndWeeks[season][week][i];
                arr.push(this.GAMES[gameId]);
            }
        }
        return arr;
    }
}

function createGamesBySeasonAndWeek(games) {
    var gamesBySeasonAndWeek = { };
    _.each(games, function(game) {
        // Create season object if it is not there
        if (!gamesBySeasonAndWeek[game.season]) {
            gamesBySeasonAndWeek[game.season] = { };
        }
        // Create week array if it is not there
        if (!gamesBySeasonAndWeek[game.season][game.week]) {
            gamesBySeasonAndWeek[game.season][game.week] = [ ];
        }
        // Add game to week
        gamesBySeasonAndWeek[game.season][game.week].push(game.gameId);
    });
    return gamesBySeasonAndWeek;
}

function createGames(gamesDataRaw) {
    var games = { };
    for (var i = 0; i < gamesDataRaw.length; i++) {
        var gameObj = new Game(gamesDataRaw[i]);
        games[gameObj.gameId] = gameObj;
    }
    return games;
}

function createPlays(playsDataRaw, gamesDataRaw, games) {
    var plays = [ ];
    var idx = 0;
    var gameIdx = 0;
    for (var i = 0; i < playsDataRaw.length; i++) {
        var isLastPlay = false;
        var currentPlay = playsDataRaw[i];
        var nextPlay = (i < playsDataRaw.length - 1) ? (playsDataRaw[i + 1]) : (null);
        var gameData = gamesDataRaw[gameIdx];
        if(!nextPlay || currentPlay.gid !== nextPlay.gid) {
            isLastPlay = true;
        }
        var playObj = new Play(currentPlay, nextPlay, idx, gameData, isLastPlay);
        var game = games[playObj.gameId];
        game.addPlay(playObj);
        plays.push(playObj);

        if (isLastPlay) {
            idx = 0;
            gameIdx++;
        }
        else {
            idx++;
        }
    }
    return plays;
}