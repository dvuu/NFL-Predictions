var NFL = window.NFL = (window.NFL || { });
NFL.Chart2 = function (plays, topTenPlays, game) {
	this.chartOptions = {
		chart: {
	        type: 'line',
	        zoomType: 'x'
	    },
		title: {
	        text: this.chartTitle(game),
	        x: -20 //center
	    },
	    xAxis: {
	    	title: {
	    		text: 'Time Left (m:s)',
	    	},
			categories: [ ],
		},
	    yAxis: {
	        title: {
	            text: 'Win Probability (%)'
	        },
	        min: 0,
	        max: 100,
	    },
	    tooltip: {
		    valueSuffix: '%',
	        shared: true,
	        crosshairs: true
	    },
	    plotOptions: {
	        series: {
	            lineWidth: 1,
	            point: {
	                events: {
	            		mouseOver: function () {
	            			console.log(this.index);
	            		}
	            	}
	            }
	        }
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle',
	        borderWidth: 0
	    },
	    series: [{
	        name: game.home + ' WP',
	        data: [ ],
	        marker: {
	            enabled: true,
	            symbol: 'circle',
	            radius: 3,
	            // fillColor:
	        }
	    },
	    {
	        name: game.visitor + ' WP',
	        data: [ ],
	        marker: {
	            enabled: true,
	            symbol: 'circle',
	            radius: 3,
	        }
	    }],
		credits: {
			enabled: false
		},
	},
	this.setPlays(plays);
}

NFL.Chart2.prototype.chartTitle = function(game) {
    return (game.season + ' - WEEK ' + game.week + ': ' + game.visitor + ': ' + game.ptsVisitor 
    + ' @ ' + game.home + ': ' + game.ptsHome);
};

NFL.Chart2.prototype.setPlays = function(plays) {
    this.plays = plays;
    this.updateSeries();
};

NFL.Chart2.prototype.updateSeries = function() {
	this.chartOptions.xAxis.categories = [ ];
	this.chartOptions.series[0].data = [ ];
	this.chartOptions.series[1].data = [ ];
	var homeWpArr = [ ];
	var visitorWpArr = [ ];
	var timeArr = [ ];
	for (var i = 0; i < this.plays.length; i++) {
		var homeWp = (this.plays[i].homeWp * 100).toFixed(2);
		var visitorWp = (this.plays[i].visitorWp * 100).toFixed(2);
		homeWpArr.push(parseFloat(homeWp));
		visitorWpArr.push(parseFloat(visitorWp));
		var time = this.plays[i].time;
		var minutes = Math.floor(time / 60);
		var seconds = time - minutes * 60;
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		var timeFormatted = minutes + ':' + seconds;
		timeArr.push(timeFormatted);
	}
	this.chartOptions.xAxis.categories = timeArr;
	this.chartOptions.series[0].data = homeWpArr;
	this.chartOptions.series[1].data = visitorWpArr;
}

NFL.Chart2.prototype.render = function(element) {
	element.highcharts(this.chartOptions);
}