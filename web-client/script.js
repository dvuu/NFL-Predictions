$(document).ready(function() {
	buildSeasonsFilter();
	buildWeeksFilter();
	buildGamesFilter();
	renderFromQueryString();
	window.addEventListener('popstate', function(e) {
		renderFromQueryString();
	});
});

function setSelectedSeasonText(season) {
	$('.seasonsDropdown .selection').text(season);
}

function setSelectedWeekText(week) {
	$('.weeksDropdown .selection').text(week);
}

function setSelectedGameText(title) {
	$('.gamesDropdown .selection').text(title);
}

function gameTitle(gameObj) {
	return (gameObj.visitor + ' @ ' + gameObj.home); 
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
				renderGame(result[i]);
				console.log('Requested gameId: ' + result[i].gameId);
				break;
			}
		}
	}});
}	

function renderGame(game) {
	var playUrl = '/api/plays/' + game.gameId;
	var topTenUrl = '/api/topTen/' + game.gameId;
	$.ajax({ url: playUrl, success: function(playsResult) {
		$('.topPlays').empty();
		$.ajax({ url: topTenUrl, success: function(topTenResult) {
			buildChartFromData(playsResult, topTenResult, game);
			displayTopTen(topTenResult);
		}});
	}});
	$('.homeLogo, .awayLogo').removeClass(function(idx, css) {
		var match = css.match(/team\-\w*/);
		return (match ? match.join(' ') : null);
	});
	$('.homeLogo').addClass('team-' + game.home.toLowerCase());
	$('.awayLogo').addClass('team-' + game.visitor.toLowerCase());
}

function buildSeasonsFilter() {
	$('.seasonsDropdown .dropdown-content').empty();
	var results = [2012, 2013, 2014, 2015];
	_.each(results, function(season) {
		var $listItem = $('<a class="dropdownLink"></a>');
		var $div = $('<div><span>' + season + '</span></div>');
		$listItem.append($div);
		$listItem.click(function (e) {
			$('.seasonsDropdown .dropdownLink div').removeClass('activeFilterItem');
            $(e.currentTarget).children('div').addClass('activeFilterItem');
			setSelectedSeasonText(season);
			setSelectedWeekText(' -- ');
			setSelectedGameText(' -- ');
			buildWeeksFilter(season);
		});
		$('.seasonsDropdown .dropdown-content').append($listItem);
	});
}

function buildWeeksFilter(season) {
	$('.weeksDropdown .dropdown-content').empty();
	var results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
	_.each(results, function(week) {
		var $listItem = $('<a class="dropdownLink"></a>');
		var $div = $('<div><span>' + week + '</span></div>');
		$listItem.append($div);
		$listItem.click(function (e) {
			$('.weeksDropdown .dropdownLink div').removeClass('activeFilterItem');
            $(e.currentTarget).children('div').addClass('activeFilterItem');
			setSelectedWeekText(week);
			setSelectedGameText(' -- ');
			buildGamesFilter(season, week);
		});
		$('.weeksDropdown .dropdown-content').append($listItem);
	});
}

function playDescription(play) {
	var homeWpDiff = Math.floor(play.homeWpDiff * 1000) / 10;
	if (play.homeWpDiff > 0) {
	 	return '<span>' + play.type + ' play at ' + play.time + ' seconds left. <span class="posWp">(+' + homeWpDiff + '%)</span></span>';
	}
	else{
	 	return '<span>' + play.type + ' play at ' + play.time + ' seconds left. <span class="negWp">(' + homeWpDiff + '%)</span></span>';
	}
}

function displayTopTen(topTenResult){
	var $topTenDiv = $('.topPlays');
	_.each(topTenResult, function(play) {
		var $playElement = $('<div class="topPlay">' + playDescription(play) + '</div>');
		$topTenDiv.append($playElement);
		//event function that when you hover top ten it will dislay where it is located on the chart
		$playElement.on('mouseover', function( ){
			console.dir(play);
			Plotly.Fx.hover('chart',[
  				{curveNumber:0, pointNumber: play.idx},
  				{curveNumber:0, pointNumber: (play.idx + 1)}
  			]);;
		});
	});
}

function onGameClick(e, game) {
	$('.gamesDropdown .dropdownLink div').removeClass('activeFilterItem');
    $(e.currentTarget).children('div').addClass('activeFilterItem');
	setSelectedGameText(gameTitle(game));
	history.pushState(null, null, '/?gid=' + game.gameId);
	renderGame(game);
	console.log('Requested gameId: ' + game.gameId);
};

function buildGamesFilter(season, week) {
	$('.gamesDropdown .dropdown-content').empty();
	$.ajax({ url: '/api/games/' + season + '/' + week, success: function(result) {
		_.each(result, function(game) {
			var $listItem = $('<a class="dropdownLink"></a>');
			var $div = $('<div><span>' + gameTitle(game) + '</span></div>');
			$listItem.append($div);
			$listItem.click(function (e) {
				onGameClick(e, game);
			});
			$('.gamesDropdown .dropdown-content').append($listItem);
		});
	}, error: function() {
		console.log('error');
	}});
}





