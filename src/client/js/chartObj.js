(function () {
    if (!window.NFL) {
        window.NFL = { };
    }
    var NFL = window.NFL;
    NFL.Chart = function (playsResult, topTenResult, game) {
        var lastPlay = playsResult[playsResult.length-1].time;

        this.playSeries = {
            y : [ ],
            x : [ ],
            mode : 'lines+markers',
            line : {
                  color : '#7f7f7f'
            },
            marker : {
                color : [ ]
            },
            type : 'scatter',
            text : [ ],
            hoverinfo: 'text'
        };
        this.layout = {
            title : chartTitle(game),
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
    }
    NFL.Chart.prototype.render = function() {
        Plotly.newPlot('chart', [this.playSeries], this.layout, {displayModeBar: false});
    };
})();