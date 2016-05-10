function chartTitle(gameObj) {
    return (gameObj.season + ' - WEEK ' + gameObj.week + ': ' + gameObj.visitor 
        + ': ' + gameObj.ptsVisitor + ' @ ' + gameObj.home + ': ' + gameObj.ptsHome);
}

function ballOn(yardLine) {
    return (yardLine < 50 ? 'OWN ' : (yardLine > 50 ? 'OPP ' : '')) + yardLine;
}

function playInfoString(playsResult) {
    var homeWp = (playsResult.homeWp * 100).toFixed(2);
    var visitorWp = (playsResult.visitorWp * 100).toFixed(2);
    if (homeWp < 50) {
        if (playsResult.seconds < 10) {
            return ('<p>Q' + playsResult.quarter + ': ' + playsResult.minute + ':0' 
                + playsResult.seconds 
                + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                + ' (<span class="posWp">' + visitorWp + '%</span>)' 
                + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                + ' (<span class="negWp">' + homeWp + '%</span>)'
                + '<br>Offense: ' + playsResult.offense
                + '<br>Down: ' + playsResult.down 
                + '<br>Ball On: ' + ballOn(playsResult.offYardline) + '</p>');
        }
        else {
            return ('<p>Q' + playsResult.quarter + ': ' + playsResult.minute + ':' 
                + playsResult.seconds 
                + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                + ' (<span class="posWp">' + visitorWp + '%</span>)' 
                + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                + ' (<span class="negWp">' + homeWp + '%</span>)'
                + '<br>Offense: ' + playsResult.offense
                + '<br>Down: ' + playsResult.down 
                + '<br>Ball On: ' + ballOn(playsResult.offYardline) + '</p>');
        }
    }
    else {
        if (playsResult.seconds < 10) {
            return ('<p>Q' + playsResult.quarter + ': ' + playsResult.minute + ':0' 
                + playsResult.seconds 
                + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                + ' (<span class="negWp">' + visitorWp + '%</span>)' 
                + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                + ' (<span class="posWp">' + homeWp + '%</span>)' 
                + '<br>Offense: ' + playsResult.offense
                + '<br>Down: ' + playsResult.down 
                + '<br>Ball On: ' + ballOn(playsResult.offYardline) + '</p>');
        }
        else {
            return ('<p>Q' + playsResult.quarter + ': ' + playsResult.minute + ':' 
                + playsResult.seconds 
                + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                + ' (<span class="negWp">' + visitorWp + '%</span>)' 
                + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                + ' (<span class="posWp">' + homeWp + '%</span>)' 
                + '<br>Offense: ' + playsResult.offense
                + '<br>Down: ' + playsResult.down 
                + '<br>Ball On: ' + ballOn(playsResult.offYardline) + '</p>');
        }
    }
}

function swingString(playsResult) {
    var homeWpDiff = (playsResult.homeWpDiff * 100).toFixed(2);
    var visitorWpDiff = (playsResult.visitorWpDiff * 100).toFixed(2);
    if (playsResult.home == playsResult.offense) {
        if (homeWpDiff > 0) {
            if (playsResult.homeYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + (playsResult.ptsHomeGain ? '<br>Points Scored: ' + playsResult.ptsHomeGain : '')
                    + (!playsResult.ptsHomeGain ? '<br>Gained: ' + playsResult.homeYdsGained + ' yds' : '') + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + (playsResult.ptsHomeGain ? '<br>Points Scored: ' + playsResult.ptsHomeGain : '')
                    + (!playsResult.ptsHomeGain ? '<br>Gained: ' + playsResult.homeYdsGained + ' yds': '') + '</p>');
            }
        }
        else {
            if (playsResult.homeYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + (playsResult.ptsHomeGain ? '<br>Points Scored: ' + playsResult.ptsHomeGain : '')
                    + (!playsResult.ptsHomeGain ? '<br>Gained: ' + playsResult.homeYdsGained + ' yds': '') + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + (playsResult.ptsHomeGain ? '<br>Points Scored: ' + playsResult.ptsHomeGain : '')
                    + (!playsResult.ptsHomeGain ? '<br>Gained: ' + playsResult.homeYdsGained + ' yds': '') + '</p>');
            }
        }
    }
    else {
        if (homeWpDiff > 0) {
            if (playsResult.visitorYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + (playsResult.ptsVisitorGain ? '<br>Points Scored: ' + playsResult.ptsVisitorGain : '')
                    + (!playsResult.ptsVisitorGain ? '<br>Gained: ' + playsResult.visitorYdsGained + ' yds': '') + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + (playsResult.ptsVisitorGain ? '<br>Points Scored: ' + playsResult.ptsVisitorGain : '')
                    + (!playsResult.ptsVisitorGain ? '<br>Gained: ' + playsResult.visitorYdsGained + ' yds': '') + '</p>');
            }
        }
        else {
            if (playsResult.visitorYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + (playsResult.ptsVisitorGain ? '<br>Points Scored: ' + playsResult.ptsVisitorGain : '')
                    + (!playsResult.ptsVisitorGain ? '<br>Gained: ' + playsResult.visitorYdsGained + ' yds': '') + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + (playsResult.ptsVisitorGain ? '<br>Points Scored: ' + playsResult.ptsVisitorGain : '')
                    + (!playsResult.ptsVisitorGain ? '<br>Gained: ' + playsResult.visitorYdsGained + ' yds': '') + '</p>');
            }
        }
    }
}
