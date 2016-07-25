var NFL = window.NFL = (window.NFL || { });
NFL.Chart2 = function (plays, topTenPlays, game) {
    var lastPlay = plays[plays.length-1].time;
    this.chart = {
        chart: {
            type: 'line',
            zoomType: 'x'
        },
        title: 'Yo',
        xAxis: {
            title: 'Game time remaining (seconds)'
        },
        yAxis: {
            title: game.home + ' Win Probability (%)'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series:{
            name: 'predictions',
            data: [1,2,3,4,5,6]
        }
    };
    // this.setPlays(plays);
}

// NFL.Chart2.prototype.render = function() {
//     $('#chart2').highcharts();
// }

NFL.Chart2.prototype.chartTitle = function(game) {
    return (game.season + ' - WEEK ' + game.week + ': ' + game.visitor + ': ' + game.ptsVisitor 
    + ' @ ' + game.home + ': ' + game.ptsHome);
};

// Sets plays for instance of chart
NFL.Chart2.prototype.setPlays = function(plays) {
    this.plays = plays;
    this.updateSeries();
};

// Populates series with new data
NFL.Chart2.prototype.updateSeries = function() {
    var arr = [ ];
    for (var i = 0; i < this.plays.length; i++) {
        var play = this.plays[i];
        var homeWp = (play.homeWp * 100).toFixed(2);
        arr.push(homeWp);
    }
    this.data = arr;
};