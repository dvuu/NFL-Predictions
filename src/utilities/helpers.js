var _ = require('underscore');
// var data = require('../server/data.js');

module.exports = {
    topN: function(array, n, comparator) {
        return _.clone(array).sort(comparator).slice(0, n);
    },

    //adds up all of the win percentage differences together in a game
    findSumGameWPChange: function(arr, games){
		_.each(games, function(game) {
			var gamesRanking = {
				'game': game,
				'totalExcitement': game.sumGameWPChange()
			}
			arr.push(gamesRanking);
		});
	}
}
