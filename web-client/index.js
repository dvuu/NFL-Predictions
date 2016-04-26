$(document).ready(function() {
	buildSeasonsFilter();
	buildWeeksFilter();
	buildGamesFilter();
	buildChartFromData();
	renderFromQueryString();
	window.addEventListener('popstate', function(e) {
		renderFromQueryString();
	});
});

function gameTitle(gameObj) {
	return (gameObj.visitor + ' @ ' + gameObj.home); 
}

function chartTitle(gameObj) {
	return (gameObj.season + ' - Week ' + gameObj.week + ': ' + gameObj.visitor + ' @ ' + gameObj.home);
}

function renderFromQueryString() {
	var queryString = window.location.search;
	var queryParam = queryString.substr(5, 4);
	var url = '/api/plays/' + queryParam;
	$.ajax({ url: '/api/games', success: function(result) {
		for (var i = 0; i < result.length; ++i) {
			if (queryParam == result[i].gameId) {
				setSelectedSeasonText(result[i].season);
				setSelectedWeekText(result[i].week);
				setSelectedGameText(gameTitle(result[i]));
				buildGamesFilter(result[i].season, result[i].week);
				fetchAndDisplayPlays(url, gameTitle(result[i]), result[i].home);
				break;
			}
		}
	}});
}	

function setSelectedSeasonText(season) {
	$('.seasonsDropdown p').text(season);
}

function setSelectedWeekText(week) {
	$('.weeksDropdown p').text(week);
}

function setSelectedGameText(title) {
	$('.gamesDropdown p').text(title);
}

function fetchAndDisplayPlays(url, title, homeTeam) {
	$.ajax({ url: url, success: function(result) {
		var lastPlay = result[result.length-1].time;
		buildChartFromData(result, title, lastPlay, homeTeam);
	}});
}

function buildSeasonsFilter() {
	$('.seasonsDropdown .dropdown-content').empty();
	var results = [2011, 2012, 2013, 2014, 2015];
	_.each(results, function(season) {
		var $listItem = $('<a class="links"></a>');
		var $div = $('<div><span>' + season + '</span></div>');
		$listItem.append($div);
		$listItem.click(function (e) {
			buildChartFromData();
			setSelectedGameText(' -- ');
			setSelectedWeekText(' -- ');
			setSelectedSeasonText(season);
			buildWeeksFilter(season);
		});
		$('.seasonsDropdown .dropdown-content').append($listItem);
	});
}

function buildWeeksFilter(season) {
	$('.weeksDropdown .dropdown-content').empty();
	var results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
	_.each(results, function(week) {
		var $listItem = $('<a class="links"></a>');
		var $div = $('<div><span>' + week + '</span></div>');
		$listItem.append($div);
		$listItem.click(function (e) {
			buildChartFromData();
			setSelectedWeekText(week);
			setSelectedGameText(' -- ');
			buildGamesFilter(season, week);
		});
		$('.weeksDropdown .dropdown-content').append($listItem);
	});
}

function buildGamesFilter(season, week) {
	$('.gamesDropdown .dropdown-content').empty();
	$.ajax({ url: '/api/games', success: function(result) {
		_.each(result, function(game) {
			if (season == game.season && week == game.week) {
				var $listItem = $('<a class="links"></a>');
				var $div = $('<div><span>' + gameTitle(game) + '</span></div>');
				$listItem.append($div);
				$listItem.click(function (e) {
					setSelectedGameText(gameTitle(game));
					history.pushState(null, null, '/?gid=' + game.gameId);
					var playUrl = '/api/plays/' + game.gameId;
					fetchAndDisplayPlays(playUrl, chartTitle(game), game.home);
				});
				$('.gamesDropdown .dropdown-content').append($listItem);
			}
		});
	}, error: function() {
		console.log('error');
	}});
}





