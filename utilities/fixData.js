var fs =require("fs");
var csv =require('csv.js');
// Print out args to the application
// Try running your program like "node fixData.js input.csv output.csv"
var args = process.argv;
console.dir(args);

var inputFile = args[2];
var outputFile = args[3];

// Steps:
// 1) Read in data from input.csv into memory (JS object, probably)
module.exports = {
initialize: function(callback) {
        var self = this;
        csv.readCsv('../data/RESULTS_NEW.csv', function(err, resultData) {
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
    for (var i = 3188; i < gameData.length; ++i) {
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

// 2) Apply fix to in-memory data
// 3) Write data out as a CSV to file named according to second arg
//		-- need to fill in writeCsv in csv.js












changeCSV(inputFile, outputFile);