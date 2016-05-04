// look at game 3987

function buildChartFromData(plays, title, lastPlay, homeTeam) {
    var $chart = $('#chart');
    var $playOne = $('.playOne');
    var $playTwo = $('.playTwo');

    var playSeries = {
        x: [ ],
        y: [ ],
        mode: 'lines',
        type: 'scatter',
        text: [ ],
        hoverinfo: 'text',
    };

    _.each(plays, function(play) {
        var homeWp = (play.homeWp * 100);
        var string = homeTeam + ' Win Probability: ' + homeWp.toFixed(2) + '%' + '<br>Play: '+ play.type 
                    + '<br>OFF/Score: ' + play.offense + ': ' + play.ptsOffense + '<br>DEF/Score: ' + play.defense 
                    + ': ' + play.ptsDefense + '<br>Down: ' + play.down + '<br>Time left: ' + play.time + ' secs';
        playSeries.text.push(string);
        playSeries.x.push(play.time);
        playSeries.y.push(homeWp.toFixed(2));
    });

    var layout = {
        title: title,
        xaxis: {
            title: 'Game time remaining (seconds)',
            range: [3700, (lastPlay + -100)], // add padding so the labels aren't slammed against the axes
            dtick: 900,
            zeroline: false
        },
        yaxis: {
            title: homeTeam + ' Win Probability (%)',
            range: [0, 100]
        },
        showLegend: true,
        range: [-0.1, 1], // add padding so the labels aren't slammed against the axes

         font: {
            family: 'Helvetica',
            size: 18,
            color: '#7f7f7f'
        }
    }

    Plotly.newPlot('chart', [playSeries], layout, {displayModeBar: false});

    $chart[0].on('plotly_hover', function(data) {
        if (data.points.length <= 0)
            return;
        if (data.points.length > 1) {
            console.error("Only expected one point for hover");
            return;
        }
        var point = data.points[0];
        var index = point.pointNumber;
        var playOne = plays[index];
        var playTwo = plays[index + 1];
        var string = '<p>' + homeTeam + ' Win Probability: ' + (playOne.homeWp * 100).toFixed(2) + '%' + '<br>Play: '+ playOne.type 
                    + '<br>OFF/Score: ' + playOne.offense + ': ' + playOne.ptsOffense + '<br>DEF/Score: ' + playOne.defense 
                    + ': ' + playOne.ptsDefense + '<br>Down: ' + playOne.down + '<br>Time left: ' + playOne.time + ' secs' + '</p>';
        $playOne.html(string);
        $playTwo.html(string);
     });

    $chart[0].on('plotly_unhover', function(data) {
        $playOne.html('');
        $playTwo.html('');
    });
}



    