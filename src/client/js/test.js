var NFL = window.NFL = (window.NFL || { });

$(document).ready(function() {
	renderGames();
});

function renderGames() {
	$.ajax({ url: '/api/excitingGames', success: function(results) {
		_.each(results, function(result) {
			var game = result.game;
			var gameId = game.gameId;
			$.ajax({ url: '/api/plays/' + gameId, success: function(playsResult) {
				// Build chart
				var div = $('<div class="game-' + gameId + '"></div>')[0]
				var chart = new NFL.Chart(playsResult, null, game);
		    	chart.setPlays(playsResult);
		    	chart.render(div);
		    	$('#charts').append(div);
			}});
		});
	}});
}