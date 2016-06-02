var _ = require('underscore');
var csv = require('../utilities/csv.js');

module.exports = {
    initialize: function(callback) {
        var self = this;
	    csv.readCsv('../data/PLAY_WITH_RESULTS.csv', function(err, resultData) {
            self.PLAYS = resultData;
            csv.readCsv('../data/GAME.csv', function(err, gameData) {
                self.GAMES = gameDataSubset(gameData);
                callback && callback();
            });
        });
    },

    PLAYS: null,
    GAMES: null,
}

// grabs basic information from all games
function gameDataSubset(gameData) {
    var result = [ ];
    for (var i = 0; i < gameData.length; ++i) {
        var obj = {
            gameId: gameData[i].gid,
            season: gameData[i].seas,
            week: gameData[i].wk,
            home: gameData[i].h,
            visitor: gameData[i].v,
            ptsHome: gameData[i].ptsh,
            ptsVisitor: gameData[i].ptsv
        };
        result.push(obj);
    }
    return result;
};
