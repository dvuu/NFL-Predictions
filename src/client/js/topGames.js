var NFL = window.NFL = (window.NFL || { });

$(document).ready(function() {
	renderGames();
	$('.excitingGames').click(function (e) {
		history.pushState(null, null, '/topGames?type=excitingGames');
		renderGames();
		return false;
	});
	$('.boringGames').click(function (e) {
		history.pushState(null, null, '/topGames?type=boringGames');
		renderGames();
		return false;
	});
});

function renderGames() {
	$('#charts').empty();
	var params = parseQueryString();
	$.ajax({ url: '/api/' + params.type, success: function(results) {
		var counter = 1;
		var $row;
		_.each(results, function(result) {
			var game = result.game;
			var gameId = game.gameId;
			$.ajax({ url: '/api/plays/' + gameId, success: function(playsResult) {
				buildElements(playsResult, game, gameId, counter);
		    	counter += 1;
			}});
		});
	}});
}

function buildElements(playsResult, game, gameId, counter) {
	var link = 'href="/?gid=' + gameId + '"';
	var $div = $('<div class="topGamesCharts col-md-4 col-xs-6"></div>');
	var $aTag = $('<a class="topTenLink" ' + link + '>Top Game #' + counter + '</a>');
	var chart = new NFL.Chart(playsResult, null, game);
	chart.layout.width = 400;
	chart.layout.height = 300;
	chart.layout.font.size = 10;
	chart.setPlays(playsResult);
	chart.render($div[0]);
	$div.prepend($aTag[0]);
	if (counter % 3 === 1) {
		$row = $('<div class="row"></div>');
		$row.append($div[0]);
		$('#charts').append($row[0]);
	}
	else {
		$row.append($div[0]);
	}
}

function parseQueryString() {
	var searchQuery = document.location.search.replace('?', '');
	var searchQueryArr = searchQuery.split('=');
	var obj = { };
	var key = searchQueryArr[0];
	var value = searchQueryArr[1];
	obj[key] = value;
	return obj;
}