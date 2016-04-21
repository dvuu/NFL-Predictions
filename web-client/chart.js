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
    // };,

    _.each(result, function(play) {
        playSeries.x.push(play.time);
        playSeries.y.push(play.homeWp);
    })

    var layout = {
        title: title,
        xaxis: {
            title: 'Game time left',
            range: [3700, 0], // add padding so the labels aren't slammed against the axes
            dtick: 900,
            zeroline: false

        },
        yaxis: {
            title: 'Prediction',
            range: [-0.1, 1], // add padding so the labels aren't slammed against the axes
        }
    };

    var data = [playSeries];

    Plotly.newPlot('chart', data, layout);
}




    