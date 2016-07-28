var NFL = window.NFL = (window.NFL || { });

NFL.PlayInfo = {
	showPlayInfo: function (playOne, playTwo) {
		if (playOne) {
            //current play
	    	$('.playOne').html(playInfoString(playOne));
	    }
	    if (playTwo) {
            //next play
	    	$('.playTwo').html(playInfoString(playTwo));
	    }
	    if (playOne && playTwo) {
            //current play and next play
	    	$('.playSwing').html(swingString(playOne, playTwo));
	    }
    },
    clearPlayInfo: function () {
	    $('.playOne').html('');
	    $('.playTwo').html('');
	    $('.playSwing').html('<p><br/><em>Hover over the chart or Top 10 plays for more info<em><p>');
	}
};

function playInfoString(play) {
    if (play.homeWp < 0.5)
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
        /* + '<br>Ball On: ' + ballOn(play.offYardline) + '</p>'*/);
};

// when points change state the type of score
function pointsCall(currentPlay) {
    switch(Math.abs(currentPlay.ptsScored)){
        case 2:
            // if the case is 2 pts it's a safety and give 2 pts to def
            return 'Safety';
        case 3:
            // if the case is 3 pts it's a regular field goal and give 3 pts to off
            return 'Field Goal';
        case 6:
            // if the case is 6 pts it's just a touchdown and give 6 pts to off
            return 'Touchdown';
        case 7:
            // if the case is 7 pts it's a touchdown with a field goal and give 7 pts to off
            return 'Touchdown & XP';
        case 8:
            // if the case is 8 pts it's just a touchdown with a convertion and give 8 pts to def
            return 'Touchdown & 2 pt. Conversion';
        default:
            // if it is anything other than points score above return nothing
            return '';
    }
}

function ballOn (yardLine) {
	return yardLine < 50 ? ('OWN ' + yardLine) : (yardLine > 50 ? ('OPP ' + (100 - yardLine)) : '50');
};

function swingString (playOne, playTwo) {
    if (playOne.homeWpDiff > 0) {
        return (swingStringHelper(playOne, 'posWp', playOne.pointsScored, playOne.ydsGained, playTwo));
    }
    else {
        return (swingStringHelper(playOne, 'negWp', playOne.pointsScored, playOne.ydsGained, playTwo));
    }
};

function swingStringHelper(play, class1, ptsGain, ydsGain, playTwo) {
    var homeWpDiff = (play.homeWpDiff * 100).toFixed(2);
    if (class1 == 'posWp'){
        homeWpDiff = '+' + homeWpDiff;
    }
    return ('<p><span class="arrow">→</span>' 
        + '<br><span class="swing">' + play.home 
        + ' <span class="' + class1 + '">' + homeWpDiff + '%</span></span>'
        + '<br>Play: ' + play.type 
        + (ptsGain ? '<br>Points Scored: ' + ptsGain : '')
        + (!ptsGain ? '<br>Gained: ' + ydsGain + ' yds' : '')
        + (play.fumble ? '<br>Turnover: Fumble' : '')
        + (play.interception ? '<br>Turnover: Interception' : '')
        + (play.type == 'KOFF' ? '<br>Turnover: Scored' : '')
        + (play.type == 'PUNT' ? '<br>Turnover: 4th Down' : '')
        + (pointsCall(play, playTwo) ? '<br>Score Type: ' + pointsCall(play, playTwo) +'</p>' : ''));
};




