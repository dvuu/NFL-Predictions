// look at game 3987

function buildChartFromData(plays, title, lastPlay, homeTeam) {
    var playSeries = {
        x: [ ],
        y: [ ],
        mode: 'lines',
        type: 'scatter',
        text: [ ]
    };
    _.each(plays, function(play) {
        var string = 'Play: ' + play.type;
        var homeWp = (play.homeWp * 100);
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
    var data = [playSeries];
    Plotly.newPlot('chart', data, layout, {displayModeBar: false});
}



    