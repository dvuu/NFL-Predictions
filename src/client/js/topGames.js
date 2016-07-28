var NFL = window.NFL = (window.NFL || { });

$(document).ready(function() {
	$('.mainContainer.hidden').fadeIn(2000).removeClass('hidden');
	$('.content.hidden').fadeIn(2000).removeClass('hidden');
	renderGames();
	$('.excitingGames').click(function (e) {
		$('.content').addClass('hidden');
		history.pushState(null, null, '/topGames?type=excitingGames');
		$('.content.hidden').fadeIn(2000).removeClass('hidden');
		renderGames();
		return false;
	});
	$('.boringGames').click(function (e) {
		$('.content').addClass('hidden');
		history.pushState(null, null, '/topGames?type=boringGames');
		$('.content.hidden').fadeIn(2000).removeClass('hidden');
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
	var chart2 = new NFL.Chart2(playsResult, null, game);
	chart2.chartOptions.chart.width = 350;
	chart2.chartOptions.chart.height = 250;
	chart2.chartOptions.subtitle.style.fontSize = '14px';
	chart2.chartOptions.legend.enabled = false;
	chart2.render($div);
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