$(document).ready(function() {
	buildGamesFilter();
	buildChartFromData();
});

function fetchAndDisplayPlays(url, title, homeTeam) {
	$.ajax({ url: url, success: function(result) {
		buildChartFromData(result, title, homeTeam);
	}});
}

function buildSeasonsFilter() {
	$('.seasonsDropdown .dropdown-content').empty();
	var seasons = [2011, 2012, 2013, 2014, 2015];
}

function buildGamesFilter() {
	$('.gamesDropdown .dropdown-content').empty();
	$.ajax({ url: '/api/games', success: function(result) {
		_.each(result, function(game) {
			var gameTitle = game.season + ' - Week ' + game.week 
				+ ': ' + game.home + ' @ ' + game.visitor;
			var $listItem = $('<a class="links"></a>');
			var $div = $('<div><span>' + gameTitle + '</span></div>');
			$listItem.append($div);
			$listItem.click(function(e) {
				var playUrl = '/api/plays/' + game.gameId;
				fetchAndDisplayPlays(playUrl, gameTitle, game.home);
			});
			$('.gamesDropdown .dropdown-content').append($listItem);
		});
	}, error: function() {
		console.log('error');
	}});
}





