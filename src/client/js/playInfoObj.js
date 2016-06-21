(function() {
    var NFL = window.NFL = (window.NFL || { });

    NFL.PlayInfo = {
    	showPlayInfo: function (playOne, playTwo) {
			if (playOne) {
		    	$('.playOne').html(playInfoString(playOne));
		    }
		    if (playTwo) {
		    	$('.playTwo').html(playInfoString(playTwo));
		    }
		    if (playOne && playTwo) {
		    	$('.playSwing').html(swingString(playOne));
		    }
        },
        clearPlayInfo: function () {
		    $('.playOne').html('');
		    $('.playTwo').html('');
		    $('.playSwing').html('<p><br><em>Hover over the chart or Top 10 plays for more info<em><p>');
		}
	};

	function playInfoString(play) {
	    if (play.homeWp < .5)
	        return (playInfoStringHelper(play, 'posWp', 'negWp'));
	    else
	        return (playInfoStringHelper(play, 'negWp', 'posWp'));
	};

	function playInfoStringHelper (play, class1, class2) {
	    var homeWp = (play.homeWp * 100).toFixed(2);
	    var visitorWp = (play.visitorWp * 100).toFixed(2);
	    return ('<p>Q' + play.quarter + ': ' + play.minute + (((play.seconds < 10) ? (':0') : (':')) + play.seconds) 
	        + '<br>' + play.visitor + ': ' + play.ptsVisitor 
	        + ' (<span class="' + class1 + '">' + visitorWp + '%</span>)' 
	        + '<br>' + play.home + ': ' + play.ptsHome 
	        + ' (<span class="' + class2 + '">' + homeWp + '%</span>)'
	        + '<br>Offense: ' + play.offense
	        + '<br>Down: ' + play.down 
	        + '<br>Ball On: ' + ballOn(play.offYardline) + '</p>');
	};

	function ballOn (yardLine) {
		return yardLine < 50 ? ('OWN ' + yardLine) : (yardLine > 50 ? ('OPP ' + (100 - yardLine)) : '50');
	};

	function swingString (playOne) {
        if (playOne.homeWpDiff > 0) {
            return (swingStringHelper(playOne, 'posWp', playOne.pointsScored, playOne.ydsGained));
        }
        else {
            return (swingStringHelper(playOne, 'negWp', playOne.pointsScored, playOne.ydsGained));
        }
	};

	function swingStringHelper(play, class1, ptsGain, ydsGain) {
	    var homeWpDiff = (play.homeWpDiff * 100).toFixed(2);
	    if (class1 == 'posWp'){
	        homeWpDiff = '+' + homeWpDiff;
	    }
	    return ('<p><span class="arrow">→</span>' 
	        + '<br><span class="swing">' + play.home 
	        + ' <span class="' + class1 + '">' + homeWpDiff + '%</span></span>'
	        + '<br>Play: ' + play.type 
	        + (ptsGain ? '<br>Points Scored: ' + ptsGain : '')
	        + (!ptsGain ? '<br>Gained: ' + ydsGain + ' yds' : '') + '</p>');
	};
})();