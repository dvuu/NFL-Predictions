// look at game 3987

function buildChartFromData(result, title) {
    var playSeries = {
        x: [ ],
        y: [ ],
        mode: 'lines',
        type: 'scatter',

    };

    // var trace2 = {
    //     x: [0, 100],
    //     y: [0, 1],
    //     mode: 'lines',
    //     type: 'scatter'
    // };

    _.each(result, function(play) {
        playSeries.x.push(play.time);
        playSeries.y.push(play.homeWp);
    })

    var layout = {
        title: title,
        xaxis: {
            title: 'Game time left',
            autorange: 'reversed'
        },
        yaxis: {
            title: 'Prediction',
            range: [0, 1]
        }
    };

    var data = [playSeries];

    Plotly.newPlot('chart', data, layout);
}




    