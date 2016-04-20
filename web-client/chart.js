// look at game 3987

$.ajax({ url: '/api/plays/3987', success: function(result) {
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
        xaxis: {
            autorange: 'reversed'
        },
        yaxis: {
            range: [0, 1]
        }
    }

    var data = [playSeries];

    Plotly.newPlot('chart', data, layout);
}});




    // var selectorOptions = {
    //     buttons: [{
    //         step: 'month',
    //         stepmode: 'backward',
    //         count: 1,
    //         label: '1m'
    //     },
    //     {
    //         step: 'month',
    //         stepmode: 'backward',
    //         count: 6,
    //         label: '6m'
    //     },
    //     {
    //         step: 'year',
    //         stepmode: 'todate',
    //         count: 1,
    //         label: 'YTD'
    //     },
    //     {
    //         step: 'year',
    //         stepmode: 'backward',
    //         count: 1,
    //         label: '1y'
    //     },
    //     {
    //         step: 'all',
    //     }],
    // };