function buildChartFromData(playsResult, topTenResult, game) {
    var $chart = $('#chart');
    var $playOne = $('.playOne');
    var $playSwing = $('.playSwing');
    var $playTwo = $('.playTwo');

    var lastPlay = playsResult[playsResult.length-1].time;

    function createHomeAndVisitorMarker(play) {
        if (play.home == play.offense) {
            return 'rgb(50, 67, 227)'
        }
        else{
            return 'rgb(243, 243, 67)'
        }
    }

    var playSeries = {
        x: [ ],
        y: [ ],
        mode: 'lines+markers',
        marker: {
            color: [ ]
        },
        type: 'scatter',
        text: [ ],
        hoverinfo: 'text',
        fill: 'tozeroy'
    };

    _.each(playsResult, function(play) {
        var homeWp = (play.homeWp * 100).toFixed(2);
        var string = play.home + ': ' + homeWp + '%';
        playSeries.text.push(string);
        playSeries.x.push(play.time);
        playSeries.y.push(homeWp);
        playSeries.marker.color.push(createHomeAndVisitorMarker(play));
    });

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

    $('.playSwing').html('<p><em>Hover over the chart or Top 10 plays for more info<em><p>');

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
        var playOne = playsResult[index];
        var playTwo = playsResult[index + 1];
        
        showPlayInfo(playOne, playTwo);
    });

    $chart[0].on('plotly_unhover', function(data) {
        clearPlayInfo();
    });
}



