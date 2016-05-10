function chartTitle(gameObj) {
    return (gameObj.season + ' - WEEK ' + gameObj.week + ': ' + gameObj.visitor 
        + ': ' + gameObj.ptsVisitor + ' @ ' + gameObj.home + ': ' + gameObj.ptsHome);
}

function ballOn(yardLine) {
    return yardLine < 50 ? ('OWN ' + yardLine) : (yardLine > 50 ? ('OPP ' + (100 - yardLine)) : '50');
}

function playInfoString(play) {
    var homeWp = (play.homeWp * 100).toFixed(2);
    var visitorWp = (play.visitorWp * 100).toFixed(2);
    if (homeWp < 50) {
        if (play.seconds < 10) {
            return ('<p>Q' + play.quarter + ': ' + play.minute + ':0' 
                + play.seconds 
                + '<br>' + play.visitor + ': ' + play.ptsVisitor 
                + ' (<span class="posWp">' + visitorWp + '%</span>)' 
                + '<br>' + play.home + ': ' + play.ptsHome 
                + ' (<span class="negWp">' + homeWp + '%</span>)'
                + '<br>Offense: ' + play.offense
                + '<br>Down: ' + play.down 
                + '<br>Ball On: ' + ballOn(play.offYardline) + '</p>');
        }
        else {
            return ('<p>Q' + play.quarter + ': ' + play.minute + ':' 
                + play.seconds 
                + '<br>' + play.visitor + ': ' + play.ptsVisitor 
                + ' (<span class="posWp">' + visitorWp + '%</span>)' 
                + '<br>' + play.home + ': ' + play.ptsHome 
                + ' (<span class="negWp">' + homeWp + '%</span>)'
                + '<br>Offense: ' + play.offense
                + '<br>Down: ' + play.down 
                + '<br>Ball On: ' + ballOn(play.offYardline) + '</p>');
        }
    }
    else {
        if (play.seconds < 10) {
            return ('<p>Q' + play.quarter + ': ' + play.minute + ':0' 
                + play.seconds 
                + '<br>' + play.visitor + ': ' + play.ptsVisitor 
                + ' (<span class="negWp">' + visitorWp + '%</span>)' 
                + '<br>' + play.home + ': ' + play.ptsHome 
                + ' (<span class="posWp">' + homeWp + '%</span>)' 
                + '<br>Offense: ' + play.offense
                + '<br>Down: ' + play.down 
                + '<br>Ball On: ' + ballOn(play.offYardline) + '</p>');
        }
        else {
            return ('<p>Q' + play.quarter + ': ' + play.minute + ':' 
                + play.seconds 
                + '<br>' + play.visitor + ': ' + play.ptsVisitor 
                + ' (<span class="negWp">' + visitorWp + '%</span>)' 
                + '<br>' + play.home + ': ' + play.ptsHome 
                + ' (<span class="posWp">' + homeWp + '%</span>)' 
                + '<br>Offense: ' + play.offense
                + '<br>Down: ' + play.down 
                + '<br>Ball On: ' + ballOn(play.offYardline) + '</p>');
        }
    }
}

function swingString(playOne, playTwo) {
    var homeWpDiff = (playOne.homeWpDiff * 100).toFixed(2);
    var visitorWpDiff = (playOne.visitorWpDiff * 100).toFixed(2);
    if (playOne.home == playOne.offense) {
        if (homeWpDiff > 0) {
            if (playOne.homeYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playOne.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playOne.type 
                    + (playOne.ptsHomeGain ? '<br>Points Scored: ' + playOne.ptsHomeGain : '')
                    + (playOne.ptsHomeGain && (playOne.offense == playTwo.offense) ? '' : '<br>TURNOVER')
                    + (!playOne.ptsHomeGain && (playOne.offense == playTwo.offense) ? '<br>Gained: ' + playOne.homeYdsGained + ' yds' : '') + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playOne.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playOne.type 
                    + (playOne.ptsHomeGain ? '<br>Points Scored: ' + playOne.ptsHomeGain : '')
                    + (!playOne.ptsHomeGain ? '<br>Gained: ' + playOne.homeYdsGained + ' yds' : '') + '</p>');
            }
        }
        else {
            if (playOne.homeYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playOne.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playOne.type 
                    + (playOne.ptsHomeGain ? '<br>Points Scored: ' + playOne.ptsHomeGain : '')
                    + (playOne.ptsHomeGain && (playOne.offense == playTwo.offense) ? '' : '<br>TURNOVER')
                    + (!playOne.ptsHomeGain && (playOne.offense == playTwo.offense) ? '<br>Gained: ' + playOne.homeYdsGained + ' yds' : '') + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playOne.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playOne.type 
                    + (playOne.ptsHomeGain ? '<br>Points Scored: ' + playOne.ptsHomeGain : '')
                    + (!playOne.ptsHomeGain ? '<br>Gained: ' + playOne.homeYdsGained + ' yds' : '') + '</p>');
            }
        }
    }
    else {
        if (homeWpDiff > 0) {
            if (playOne.visitorYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playOne.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playOne.type 
                    + (playOne.ptsVisitorGain ? '<br>Points Scored: ' + playOne.ptsVisitorGain : '')
                    + (playOne.ptsVisitorGain && (playOne.offense == playTwo.offense) ? '' : '<br>TURNOVER')
                    + (!playOne.ptsVisitorGain && (playOne.offense == playTwo.offense) ? '<br>Gained: ' + playOne.visitorYdsGained + ' yds' : '') + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playOne.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playOne.type 
                    + (playOne.ptsVisitorGain ? '<br>Points Scored: ' + playOne.ptsVisitorGain : '')
                    + (!playOne.ptsVisitorGain ? '<br>Gained: ' + playOne.visitorYdsGained + ' yds' : '') + '</p>');
            }
        }
        else {
            if (playOne.visitorYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playOne.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playOne.type 
                    + (playOne.ptsVisitorGain ? '<br>Points Scored: ' + playOne.ptsVisitorGain : '')
                    + (playOne.ptsVisitorGain && (playOne.offense == playTwo.offense) ? '' : '<br>TURNOVER')
                    + (!playOne.ptsVisitorGain && (playOne.offense == playTwo.offense) ? '<br>Gained: ' + playOne.visitorYdsGained + ' yds' : '') + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playOne.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playOne.type 
                    + (playOne.ptsVisitorGain ? '<br>Points Scored: ' + playOne.ptsVisitorGain : '')
                    + (!playOne.ptsVisitorGain ? '<br>Gained: ' + playOne.visitorYdsGained + ' yds' : '') + '</p>');
            }
        }
    }
}
