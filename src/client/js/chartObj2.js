var NFL = window.NFL = (window.NFL || { });
NFL.Chart2 = function (plays, topTenPlays, game) {
	var self = this;
	var isOvertime = false;
	this.chartOptions = {
		chart: {
			backgroundColor: 'transparent',
	        type: 'line',
	        zoomType: 'x'
	    },
		title: {
	        text: this.chartTitle(game),
	        align: 'center',
	        style: {

	        }
	    },
	    xAxis: {
	    	title: {
	    		text: 'QUARTER',
	    	},
	    	reversed: true,
	    	tickInterval: 900,
	    	labels: {
	    		rotation: 0,
	    		// TODO: create method to use in labels
		        formatter: function() {
		        	var time = this.value;
		        	if (time <= 3600 && time >= 2701)
		        		return 'Q1';
		        	if (time <= 2700 && time >= 1801)
		        		return 'Q2';
		        	if (time <= 1800 && time >= 901)
		        		return 'Q3';
		        	if (time <= 900 && time >= 1)
		        		return 'Q4';
		        	if (time <= 0 && time >= -899) {
		        		if (isOvertime)
		        			return 'OT';
		        		return 'END';
		        	}
		        	if (time === -900) {
		        		isOvertime = true;
		        		return 'END';
		        	}
		        }
		    }
		},
	    yAxis: {
	        title: {
	            text: 'WIN PROBABILITY'
	        },
	        min: 0,
	        max: 100,
	        labels: {
	    		rotation: 0,
	    		// TODO: create method to use in labels
		        formatter: function() {
		        	return this.value + '%';
		        }
		    }
	    },
	    tooltip: {
	    	// TODO: create method to use in tooltip
	    	formatter: function() {
	    		var time = this.x;
				var minutes = Math.floor(time / 60);
				var seconds = time - minutes * 60;
				if (seconds < 10) {
					seconds = '0' + seconds;
				}
				var timeFormatted = minutes + ':' + seconds;
				var quarter;
	        	if (time <= 3600 && time >= 2701)
	        		quarter = 'Q1';
	        	if (time <= 2700 && time >= 1801)
	        		quarter = 'Q2';
	        	if (time <= 1800 && time >= 901)
	        		quarter = 'Q3';
	        	if (time <= 900 && time >= 1)
	        		quarter = 'Q4';
	        	if (time <= 0 && time >= -899) {
	        		if (isOvertime) {
	        			quarter = 'OT';
	        		} else {
	        			quarter = 'END';
	        		}
	        	}
	        	if (time === -900) {
	        		isOvertime = true;
	        		quarter = 'END';
	        	}
		        var s = '<span>' + quarter + ', '+ timeFormatted +'</span>';
		        $.each(this.points, function(i, point) {
		            s += '<br/><span style="color:'+ point.series.color +'">\u25CF</span> ' + point.series.name + ': ' + (point.y).toFixed(2) + '% WP';
		        });
		        return s;
			},
		    valueSuffix: '%',
	        shared: true,
	        crosshairs: {
	        	color: 'black',
	        	dashStyle: 'solid'
	        }
	    },
	    plotOptions: {
	        series: {
	            lineWidth: 3,
	            point: {
	                events: {
	            		mouseOver: function () {
	            			self.onHover(this)
	            		},
	            		mouseOut: function () {
	            			self.clearHover(this)
	            		}
	            	}
	            },
	            states: {
	            	hover: {
	            		enabled: true,
	            		lineWidth: 3
	            	}
	            }
	        }
	    },
	    legend: {
	    	enabled: true,
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle',
	        borderWidth: 0
	    },
	    series: [{
	        name: game.home,
	        data: [ ],
	        marker: {
	            enabled: false,
	            symbol: 'circle',
	            radius : 3
	        }
	    },
	    {
	        name: game.visitor,
	        data: [ ],
	        color: '#f45b5b',
	        marker: {
	            enabled: false,
	            symbol: 'circle',
	            radius : 3
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

NFL.Chart2.prototype.setFieldWidget = function (field) {
    this.field = field;
}

NFL.Chart2.prototype.setPlays = function(plays) {
    this.plays = plays;
    this.updateSeries();
};

NFL.Chart2.prototype.updateSeries = function() {
	this.chartOptions.xAxis.categories = [ ];
	this.chartOptions.series[0].data = [ ];
	this.chartOptions.series[1].data = [ ];
	var homeData = _.map(this.plays, function(play) {
		return {x: play.time, y: play.homeWp * 100};
	});
	var visitorData = _.map(this.plays, function(play) {
		return {x: play.time, y: play.visitorWp * 100};
	});
	this.chartOptions.series[0].data = homeData;
	this.chartOptions.series[1].data = visitorData;
}

NFL.Chart2.prototype.onHover = function (args) {
	var playOne = (args.index > 0) ? this.plays[args.index - 1] : null;
	var playTwo = this.plays[args.index];
	$('.ball').removeClass('hidden');
	if (playTwo.offense === playTwo.home) {
		$('.ball').removeClass('ballAway');
		$('.ball').addClass('ballHome');
	} else {
		$('.ball').removeClass('ballHome');
		$('.ball').addClass('ballAway');
	}
	NFL.PlayInfo.showPlayInfo(playOne, playTwo);
	this.field.setState(playOne, playTwo);
}

NFL.Chart2.prototype.clearHover = function (args) {
	$('.ball').addClass('hidden');
	NFL.PlayInfo.clearPlayInfo();
	this.field.clearField();
}

NFL.Chart2.prototype.render = function(element) {
	element.highcharts(this.chartOptions);
}