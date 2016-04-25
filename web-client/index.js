$(document).ready(function() {
	buildGamesFilter();
	buildChartFromData();
	buildSeasonsFilter();
});

function fetchAndDisplayPlays(url, title, homeTeam) {
	$.ajax({ url: url, success: function(result) {
		buildChartFromData(result, title, homeTeam);
	}});
}

function buildSeasonsFilter() {
	$('.seasonsDropdown .dropdown-content').empty();
	var results = [2011,2012,2013,2014,2015];
	for (var i = 0; i < results.length; ++i) {
		var $listItem = $('<a class="links"></a>');
		var $div = $('<div><span>' + results[i] + '</span></div>');
		$listItem.append($div);
		$('.seasonsDropdown .dropdown-content').append($listItem);
	};
}

function buildGamesFilter() {
	$('.gamesDropdown .dropdown-content').empty();
	$.ajax({ url: '/api/games', success: function(result) {
		_.each(result, function(game) {
			var gameTitle = game.season + ' - Week ' + game.week 
				+ ': ' + game.visitor + ' @ ' + game.home;
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





