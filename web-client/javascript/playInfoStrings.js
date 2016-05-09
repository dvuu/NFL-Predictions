function playInfoString(playsResult) {
    var homeWp = (playsResult.homeWp * 100).toFixed(2);
    var visitorWp = (playsResult.visitorWp * 100).toFixed(2);
    if (homeWp < 50) {
        if (playsResult.seconds < 10) {
            return ('<p>Q' + playsResult.quarter + ', ' + playsResult.minute + ':0' 
                + playsResult.seconds 
                + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                + '<span class="posWp"> (' + visitorWp + '%)</span>' 
                + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                + '<span class="negWp"> (' + homeWp + '%)</span>'
                + '<br>Offense: ' + playsResult.offense
                + '<br>Down: ' + playsResult.down 
                + '<br>Yard: ' + playsResult.offYardline 
                + '<br>Play: ' + playsResult.type  + '</p>');
        }
        else {
            return ('<p>Q' + playsResult.quarter + ', ' + playsResult.minute + ':' 
                + playsResult.seconds 
                + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                + '<span class="posWp"> (' + visitorWp + '%)</span>' 
                + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                + '<span class="negWp"> (' + homeWp + '%)</span>'
                + '<br>Offense: ' + playsResult.offense
                + '<br>Down: ' + playsResult.down 
                + '<br>Yard: ' + playsResult.offYardline 
                + '<br>Play: ' + playsResult.type  + '</p>');
        }
    }
    else {
        if (playsResult.seconds < 10) {
            return ('<p>Q' + playsResult.quarter + ', ' + playsResult.minute + ':0' 
                + playsResult.seconds 
                + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                + '<span class="negWp"> (' + visitorWp + '%)</span>' 
                + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                + '<span class="posWp"> (' + homeWp + '%)</span>' 
                + '<br>Offense: ' + playsResult.offense
                + '<br>Down: ' + playsResult.down 
                + '<br>Yard: ' + playsResult.offYardline 
                + '<br>Play: ' + playsResult.type  + '</p>');
        }
        else {
            return ('<p>Q' + playsResult.quarter + ', ' + playsResult.minute + ':' 
                + playsResult.seconds 
                + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                + '<span class="negWp"> (' + visitorWp + '%)</span>' 
                + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                + '<span class="posWp"> (' + homeWp + '%)</span>' 
                + '<br>Offense: ' + playsResult.offense
                + '<br>Down: ' + playsResult.down 
                + '<br>Yard: ' + playsResult.offYardline 
                + '<br>Play: ' + playsResult.type  + '</p>');
        }
    }
}

function swingString(playsResult) {
    var homeWpDiff = (playsResult.homeWpDiff * 100).toFixed(2);
    var visitorWpDiff = (playsResult.visitorWpDiff * 100).toFixed(2);
    if (playsResult.home == playsResult.offense) {
        if (homeWpDiff > 0) {
            return ('<p><span class="arrow">→</span>' 
                + '<br><span class="swing">' + playsResult.visitor 
                + '<span class="negWp"> (' + visitorWpDiff + '%)</span>' 
                + '<br>' + playsResult.home 
                + '<span class="posWp"> (+' + homeWpDiff + '%)</span></span>' 
                + '<br>Score: +' + playsResult.ptsHomeGain 
                + '<br>Yard: +' + playsResult.homeYdsGained + '</p>');
        }
        else {
            return ('<p><span class="arrow">→</span>' 
                + '<br><span class="swing">' + playsResult.visitor 
                + '<span class="posWp"> (+' + visitorWpDiff + '%)</span>' 
                + '<br>' + playsResult.home 
                + '<span class="negWp"> (' + homeWpDiff + '%)</span></span>' 
                + '<br>Score: +' + playsResult.ptsHomeGain 
                + '<br>Yard: +' + playsResult.homeYdsGained + '</p>');
        }
    }
    else {
        if (homeWpDiff > 0) {
            return ('<p><span class="arrow">→</span>' 
                + '<br><span class="swing">' + playsResult.visitor 
                + '<span class="negWp"> (' + visitorWpDiff + '%)</span>' 
                + '<br>' + playsResult.home 
                + '<span class="posWp"> (+' + homeWpDiff + '%)</span></span>' 
                + '<br>Score: +' + playsResult.ptsVisitorGain 
                + '<br>Yard: +' + playsResult.visitorYdsGained + '</p>');
        }
        else {
            return ('<p><span class="arrow">→</span>' 
                + '<br><span class="swing">' + playsResult.visitor 
                + '<span class="posWp"> (+' + visitorWpDiff + '%)</span>' 
                + '<br>' + playsResult.home 
                + '<span class="negWp"> (' + homeWpDiff + '%)</span></span>' 
                + '<br>Score: +' + playsResult.ptsVisitorGain 
                + '<br>Yard: +' + playsResult.visitorYdsGained + '</p>');
        }
    }
}