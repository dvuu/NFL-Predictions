$(document).ready(function() {
	buildGamesList();
});

function buildGamesList() {
	$('.gamesDropdown .dropdown-content').empty();
	$.ajax({ url: '/api/games', success: function(result) {
		_.each(result, function(game) {
			if(game.gid >= 2981) {
				var $listItem = $('<a class="links"></a>');
				var $div = $('<div><span>Season: ' + game.season + ' - Week: ' + game.week + ' - ' 
					+ game.home + ' vs. ' + game.visitor + '</span></div>');
				$listItem.append($div);
				$('.gamesDropdown .dropdown-content').append($listItem);
			}
		});
	}, error: function() {
		console.log('error');
	}});
}
