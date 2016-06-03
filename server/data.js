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
        csv.readCsv('../data/GAME.csv', function(err, gamesDataRaw) {
            self.GAMES = createGames(gamesDataRaw);
    	    csv.readCsv('../data/PLAY_WITH_RESULTS.csv', function(err, playsDataRaw) {
                self.PLAYS = createPlays(playsDataRaw, gamesDataRaw, self.GAMES);
                callback && callback();
            });
        });
    },
    GAMES: null,
    PLAYS: null,
}

function createGames(gamesDataRaw) {
    var games = { };
    for (var i = 2980; i < gamesDataRaw.length; i++) {
        var gameObj = new Game(gamesDataRaw[i]);
        games[gameObj.gameId] = gameObj;
    }
    return games;
}

function createPlays(playsDataRaw, gamesDataRaw, games) {
    var plays = [ ];
    var idx = 0;
    for (var i = 0; i < playsDataRaw.length; i++) {
        var isLastPlay = false;
        var currentPlay = playsDataRaw[i];
        var nextPlay = (i < playsDataRaw.length - 1) ? (playsDataRaw[i + 1]) : (null);
        var gameData = gamesDataRaw[currentPlay.gid - 1];
        if(!nextPlay || currentPlay.gid !== nextPlay.gid) {
            isLastPlay = true;
        }
        var playObj = new Play(currentPlay, nextPlay, idx, gameData, isLastPlay);
        var game = games[playObj.gameId];
        game.addPlay(playObj);
        plays.push(playObj);

        idx = isLastPlay ? 0 : idx + 1;
    }
    return plays;
}
