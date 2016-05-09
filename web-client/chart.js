
function chartTitle(gameObj) {
    return (gameObj.season + ' - Week ' + gameObj.week + ': ' + gameObj.visitor 
        + ': ' + gameObj.ptsVisitor + ' @ ' + gameObj.home + ': ' + gameObj.ptsHome);
}

function buildChartFromData(playsResult, topTenResult, game) {
    var $chart = $('#chart');
    var $playOne = $('.playOne');
    var $playSwing = $('.playSwing');
    var $playTwo = $('.playTwo');

    var lastPlay = playsResult[playsResult.length-1].time;

    var playSeries = {
        x: [ ],
        y: [ ],
        mode: 'lines',
        type: 'scatter',
        text: [ ],
        hoverinfo: 'text',
        fill: 'tozeroy'
    };

    // var topTenSeries = {
    //     x: [ ],
    //     y: [ ],
    //     mode: 'markers',
    //     type: 'scatter'
    // }

    _.each(playsResult, function(play) {
        var homeWp = (play.homeWp * 100);
        var string = play.home + ' Win Probability: ' + homeWp.toFixed(2) + '%' 
            + '<br>Play: '+ play.type + '<br>OFF/Score: ' + play.offense + ': ' 
            + play.ptsOffense + '<br>DEF/Score: ' + play.defense + ': ' 
            + play.ptsDefense + '<br>Down: ' + play.down + '<br>Time left: ' 
            + play.time + ' secs';
        playSeries.text.push(string);
        playSeries.x.push(play.time);
        playSeries.y.push(homeWp.toFixed(2));
    });

    // _.each(topTenResult, function(topPlay) {
    //     var homeWp = (topPlay.homeWp * 100);
    //     topTenSeries.x.push(topPlay.time);
    //     topTenSeries.y.push(homeWp.toFixed(2));
    // });

    var layout = {
        title: chartTitle(game),
        xaxis: {
            title: 'Game time remaining (seconds)',
            // add padding so the labels aren't slammed against the axes
            range: [3700, (lastPlay + -100)],
            dtick: 900,
            zeroline: false
        },
        yaxis: {
            title: game.home + ' Win Probability (%)',
            range: [0, 100]
        },
        showLegend: true,
        // add padding so the labels aren't slammed against the axes
        range: [-0.1, 1],

        font: {
            family: 'Helvetica',
            size: 18,
            color: '#7f7f7f'
        },

        shapes: [
            {
                type: 'line',
                x0: 3700,
                y0: 50,
                x1: (lastPlay + -100),
                y1: 50,
                line: {
                    dash: 'dash',
                    color: '#7f7f7f'
                }
            }
        ]
    };

    Plotly.newPlot('chart', [playSeries], layout, {displayModeBar: false});

    function playInfoString(playsResult) {
        var homeWp = (playsResult.homeWp * 100).toFixed(2);
        var visitorWp = (playsResult.visitorWp * 100).toFixed(2);
        if (playsResult.homeWp < 50) {
            if (playsResult.seconds < 10) {
                return ('<p>Q' + playsResult.quarter + ', ' + playsResult.minute + ':0' 
                    + playsResult.seconds 
                    + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                    + '<span class="posWp"> (' + visitorWp + '%)</span>' 
                    + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                    + '<span class="negWp"> (' + homeWp + '%)</span>'
                    + '<br>Offense: ' + playsResult.offense 
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Yard: ' + playsResult.offYardline + '</p>');
            }
            else {
                return ('<p>Q' + playsResult.quarter + ', ' + playsResult.minute + ':' 
                    + playsResult.seconds 
                    + '<br>' + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                    + '<span class="posWp"> (' + visitorWp + '%)</span>' 
                    + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                    + '<span class="negWp"> (' + homeWp + '%)</span>'
                    + '<br>Offense: ' + playsResult.offense 
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Yard: ' + playsResult.offYardline + '</p>');
            }
        }
        else {
            if (playsResult.seconds < 10) {
                return ('<p>Q' + playsResult.quarter + ', ' + playsResult.minute + ':0' 
                    + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                    + '<span class="negWp"> (' + visitorWp + '%)</span>' 
                    + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                    + '<span class="posWp"> (' + homeWp + '%)</span>' 
                    + playsResult.seconds + '<br>Offense: ' + playsResult.offense 
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Yard: ' + playsResult.offYardline + '</p>');
            }
            else {
                return ('<p>Q' + playsResult.quarter + ', ' + playsResult.minute + ':' 
                    + playsResult.visitor + ': ' + playsResult.ptsVisitor 
                    + '<span class="negWp"> (' + visitorWp + '%)</span>' 
                    + '<br>' + playsResult.home + ': ' + playsResult.ptsHome 
                    + '<span class="posWp"> (' + homeWp + '%)</span>' 
                    + playsResult.seconds + '<br>Offense: ' + playsResult.offense 
                    + '<br>Play: ' + playsResult.type 
                    + '<br>Yard: ' + playsResult.offYardline + '</p>');
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

    $chart[0].on('plotly_click', function(data) {
        if (data.points.length <= 0)
            return;
        if (data.points.length > 1) {
            console.error("Only expected one point for hover");
            return;
        }
        var point = data.points[0];
        var index = point.pointNumber;
        var playOne = playsResult[index];
        var playTwo = playsResult[index + 1];
        $playOne.html(playInfoString(playOne));
        $playTwo.html(playInfoString(playTwo));
        $playSwing.html(swingString(playOne));
     });

    // $chart[0].on('plotly_unhover', function(data) {
    //     $playOne.html('');
    //     $playTwo.html('');
    // });
}



