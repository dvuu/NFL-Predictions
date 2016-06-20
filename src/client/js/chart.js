(function() {

    window.NFL = (window.NFL || { });



    NFL.buildChartFromData = function (playsResult, topTenResult, game) {

        var chart = new window.NFL.Chart(playsResult, topTenResult, game);
        chart.render();




        // var $chart = $('#chart');
        // var $playOne = $('.playOne');
        // var $playSwing = $('.playSwing');
        // var $playTwo = $('.playTwo');

        // Chart.prototype.createHomeAndVisitorMarker = function(play) {
        //     if (play.home == play.offense) {
        //         return '#ff7400';
        //     }
        //     else{
        //         return '#0021c5';
        //     }
        // }


        // _.each(playsResult, function(play) {
        //     var homeWp = (play.homeWp * 100).toFixed(2);
        //     var string = play.home + ': ' + homeWp + '%';
        //     playSeries.text.push(string);
        //     playSeries.x.push(play.time);
        //     playSeries.y.push(homeWp);
        //     playSeries.marker.color.push(createHomeAndVisitorMarker(play));
        // });



        // $('.playSwing').html('<p><br><em>Hover over the chart or Top 10 plays for more info<em><p>');

        

        // $chart[0].on('plotly_hover', function(data) {
        //     if (data.points.length <= 0)
        //         return;
        //     if (data.points.length > 1) {
        //         console.error("Only expected one point for hover");
        //         return;
        //     }
        //     var point = data.points[0];
        //     var index = point.pointNumber;
        //     var playOne = (index > 0) ? playsResult[index - 1] : null;
        //     var playTwo = playsResult[index];
            
        //     if (index > 0) {
        //         Plotly.Fx.hover('chart',[
        //             {curveNumber:0, pointNumber: index},
        //             {curveNumber:0, pointNumber: index - 1}
        //         ]);
        //     }

        //     showPlayInfo(playOne, playTwo);
        // });

        // $chart[0].on('plotly_unhover', function(data) {
        //     clearPlayInfo();
        // });
    }

    setTimeout(function() {
        var update = {
          width: 800,  // or any new width
          height: 500  // " "
        };
        Plotly.relayout('chart', update);
    }, 10000);
})();