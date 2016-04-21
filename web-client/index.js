$(document).ready(function() {
	buildGamesFilter();
	buildChartFromData();
});

function fetchAndDisplayPlays(url, title) {
	$.ajax({ url: url, success: function(result) {
		buildChartFromData(result, title);
	}});
}

function buildGamesFilter() {
	$('.gamesDropdown .dropdown-content').empty();
	$.ajax({ url: '/api/games', success: function(result) {
		_.each(result, function(game) {
			var $listItem = $('<a class="links"></a>');
			var $div = $('<div><span>Season: ' + game.season + ' - Week: ' + game.week 
				+ ' - ' + game.home + ' vs. ' + game.visitor + '</span></div>');
			$listItem.append($div);
			$listItem.click(function(e) {
				var playUrl = '/api/plays/' + game.gameId;
				fetchAndDisplayPlays(playUrl, 'Season: ' + game.season + '- Week: ' + 
					game.week + ' - H: ' + game.home + ' vs. V: ' + game.visitor);
			});
			$('.gamesDropdown .dropdown-content').append($listItem);
		});
	}, error: function() {
		console.log('error');
	}});
}