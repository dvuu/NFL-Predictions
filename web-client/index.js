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
	$('.seasonDropdown .dropdown-content').empty();
	var results = [
		{year: 2011},
		{year: 2012},
		{year: 2013},
		{year: 2014},
		{year: 2015}
	];
	_.each(results, function(season) {
		var $listItem = $('<a class="links"></a>');
		var $div = $('<div><span>' + season.year + '</span></div>');
		$listItem.append($div);
		$('.seasonDropdown .dropdown-content').append($listItem);
	});
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





