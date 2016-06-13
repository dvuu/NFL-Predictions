function chartTitle(gameObj) {
    return (gameObj.season + ' - WEEK ' + gameObj.week + ': ' + gameObj.visitor 
        + ': ' + gameObj.ptsVisitor + ' @ ' + gameObj.home + ': ' + gameObj.ptsHome);
}

function ballOn(yardLine) {
    return yardLine < 50 ? ('OWN ' + yardLine) : (yardLine > 50 ? ('OPP ' + (100 - yardLine)) : '50');
}

function playInfoStringHelper(play, class1, class2) {
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
}

function playInfoString(play) {
    if (play.homeWp < .5)
        return (playInfoStringHelper(play, 'posWp', 'negWp'));
    else
        return (playInfoStringHelper(play, 'negWp', 'posWp'));
}

function swingStringHelper(play, class1, ptsGain, ydsGain) {
    var homeWpDiff = (play.homeWpDiff * 100).toFixed(2);
    return ('<p><span class="arrow">→</span>' 
        + '<br><span class="swing">' + play.home 
        + ' <span class="' + class1 + '">+' + homeWpDiff + '%</span></span>'
        + '<br>Play: ' + play.type 
        + (ptsGain ? '<br>Points Scored: ' + ptsGain : '')
        + (!ptsGain ? '<br>Gained: ' + ydsGain + ' yds' : '') + '</p>');
}

function swingString(playOne) {
    if (playOne.home == playOne.offense) {
        if (playOne.homeWpDiff > 0) {
            return (swingStringHelper(playOne, 'posWp', playOne.ptsHomeGain, playOne.homeYdsGained));
        }
        else {
            return (swingStringHelper(playOne, 'negWp', playOne.ptsHomeGain, playOne.homeYdsGained));
        }
    }
    else {
        if (playOne.homeWpDiff > 0) {
            return (swingStringHelper(playOne, 'posWp', playOne.ptsVisitorGain, playOne.visitorYdsGained));
        }
        else {
            return (swingStringHelper(playOne, 'posWp', playOne.ptsVisitorGain, playOne.visitorYdsGained));
        }
    }
}
