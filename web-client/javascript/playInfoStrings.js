function chartTitle(gameObj) {
    return (gameObj.season + ' - WEEK ' + gameObj.week + ': ' + gameObj.visitor 
        + ': ' + gameObj.ptsVisitor + ' @ ' + gameObj.home + ': ' + gameObj.ptsHome);
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
                + '<br>Yard: ' + playsResult.offYardline + '</p>');
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
                + '<br>Yard: ' + playsResult.offYardline + '</p>');
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
                + '<br>Yard: ' + playsResult.offYardline + '</p>');
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
                + '<br>Yard: ' + playsResult.offYardline + '</p>');
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
                    + '<br>Score: +' + playsResult.ptsHomeGain 
                    + '<br>Yards gained: ' + playsResult.homeYdsGained + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Score: +' + playsResult.ptsHomeGain 
                    + '<br>Yards gained: +' + playsResult.homeYdsGained + '</p>');
            }
        }
        else {
            if (playsResult.homeYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Score: +' + playsResult.ptsHomeGain 
                    + '<br>Yards gained: ' + playsResult.homeYdsGained + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Score: +' + playsResult.ptsHomeGain 
                    + '<br>Yards gained: +' + playsResult.homeYdsGained + '</p>');
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
                    + '<br>Score: +' + playsResult.ptsVisitorGain 
                    + '<br>Yards gained: ' + playsResult.visitorYdsGained + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="posWp">+' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Score: +' + playsResult.ptsVisitorGain 
                    + '<br>Yards gained: +' + playsResult.visitorYdsGained + '</p>');
            }
        }
        else {
            if (playsResult.visitorYdsGained < 0) {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Score: +' + playsResult.ptsVisitorGain 
                    + '<br>Yards gained: ' + playsResult.visitorYdsGained + '</p>');
            }
            else {
                return ('<p><span class="arrow">→</span>' 
                    + '<br><span class="swing">' + playsResult.home 
                    + ' <span class="negWp">' + homeWpDiff + '%</span></span>'
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Score: +' + playsResult.ptsVisitorGain 
                    + '<br>Yards gained: +' + playsResult.visitorYdsGained + '</p>');
            }
        }
    }
}