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
	    $('.playSwing').html('<p><br><em>Hover over the chart or Top 10 plays for more info<em><p>');
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
        + '<br>Ball On: ' + ballOn(play.offYardline) + '</p>');
};

function pointLead(currentPlay, nextPlay) {
    var team1 = currentPlay.offense;
    var team2 = currentPlay.defense;
    var team1Pts = currentPlay.ptsOffense;
    var team2Pts = currentPlay.ptsDefense;
    var nextTeam1Pts = nextPlay.offense == team1 ? nextPlay.ptsOffense : nextPlay.ptsDefense;
    var nextTeam2Pts = nextPlay.defense == team2 ? nextPlay.ptsDefense : nextPlay.ptsOfense;
    if (team1Pts != nextTeam1Pts) {
        return Math.abs(nextTeam1Pts - team1Pts);
    }
    else if (team2Pts != nextTeam2Pts) {
        return Math.abs(nextTeam2Pts - team2Pts);
    }
}

function pointsCall(currentPlay, nextPlay) {
    switch(pointLead(currentPlay, nextPlay)){
        case 2:
            // if the case is 2 pts it's a safety and give 2 pts to def
            return 'Safety'
        case 3:
            // if the case is 3 pts it's a regular field goal and give 3 pts to off
            return 'Regular Feild Goal'
        case 6:
            // if the case is 6 pts it's just a touchdown and give 6 pts to off
            return 'Only a Touchdown'
        case 7:
            // if the case is 7 pts it's a touchdown with a field goal and give 7 pts to off
            return 'Touchdown & Feild Goal'
        case 8:
            // if the case is 8 pts it's just a touchdown with a convertion and give 8 pts to def
            return 'Touchdown & Convertion'
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
        + (pointsCall(play, playTwo) ? '<br>Score Type: ' + pointsCall(play, playTwo) +'</p>' : ''));
};




