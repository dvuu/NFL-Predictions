var NFL = window.NFL = (window.NFL || { });
NFL.Chart = function (plays, topTenPlays, game) {
    var lastPlay = plays[plays.length-1].time;
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
        title : this.chartTitle(game),
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
    this.setPlays(plays);
};

NFL.Chart.prototype.render = function() {
    var self = this;
    Plotly.newPlot('chart', [this.playSeries], this.layout, {displayModeBar: false});
    $('#chart')[0].on('plotly_hover', function (data) {
        self.onHover(data, self.plays);
    });
    $('#chart')[0].on('plotly_unhover', function(data) {
        NFL.PlayInfo.clearPlayInfo();
    });
};

NFL.Chart.prototype.chartTitle = function(game) {
    return (game.season + ' - WEEK ' + game.week + ': ' + game.visitor + ': ' + game.ptsVisitor 
    + ' @ ' + game.home + ': ' + game.ptsHome);
};

// Sets plays for instance of chart
NFL.Chart.prototype.setPlays = function(plays) {
    this.plays = plays;
    this.updateSeries();
};

NFL.Chart.prototype.setLegend = function(play) {
    if (play.home == play.offense) {
        return '#ff7400';
    }
    else{
        return '#0021c5';
    }
};

// Populates series with new data
NFL.Chart.prototype.updateSeries = function() {
    this.playSeries.x = [ ];
    this.playSeries.y = [ ];
    this.playSeries.text = [ ];
    this.playSeries.marker.color = [ ];
    for (var i = 0; i < this.plays.length; i++) {
        var play = this.plays[i];
        var homeWp = (play.homeWp * 100).toFixed(2);
        var string = play.home + ': ' + homeWp + '%';
        this.playSeries.text.push(string);
        this.playSeries.x.push(play.time);
        this.playSeries.y.push(homeWp);
        this.playSeries.marker.color.push(this.setLegend(play));
    }
};

// Hover event handler
NFL.Chart.prototype.onHover = function(data, plays) {
    // Check for weird, unexpected input, just cause
    if (data.points.length <= 0)
        return;
    if (data.points.length > 1) {
        console.error("Only expected one point for hover");
        return;
    }

    // Identify hovered-over play and previous play
    var point = data.points[0];
    var index = point.pointNumber;
    var playOne = (index > 0) ? plays[index - 1] : null;
    var playTwo = plays[index];
    
    // Make both play and previous play show hover tooltip
    if (index > 0) {
        Plotly.Fx.hover('chart',[
            {curveNumber:0, pointNumber: index},
            {curveNumber:0, pointNumber: index - 1}
        ]);
    }

    // Update the play-info section to show hovered plays
    NFL.PlayInfo.showPlayInfo(playOne, playTwo);
};