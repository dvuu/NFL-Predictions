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
	        text: this.title(game),
	        align: 'center',
	        style: {
	        	fontSize: '14px'
	        }
	    },
	    subtitle: {
	    	text: this.subtitle(game),
	    	style: {
	    		fontSize: '20px'
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
	    		var index = this.points[0].point.index;
	    		var play = plays[index];
	    		var quarterStr = (play.quarter <= 4) ? ('Q' + play.quarter) : 'OT';
	    		if (index == plays.length - 1)
	    			quarterStr = 'END';
	    		var timeFormatted = NFL.Util.getTimeInQuarter(play);
		        var s = '<span>' + quarterStr + ', '+ timeFormatted + '<br/>' + game.visitor + ': ' + play.ptsVisitor + ', ' + game.home + ': ' + play.ptsHome + '</span>';
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
	            			self.onHover(this);
	            		},
	            		mouseOut: function () {
	            			self._onClearHover(this)
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

NFL.Chart2.prototype.title = function(game) {
    return game.season + ' - WEEK ' + game.week;
};

NFL.Chart2.prototype.subtitle = function(game) {
    return game.visitor + ': ' + game.ptsVisitor + ' @ ' + game.home + ': ' + game.ptsHome;
};

NFL.Chart2.prototype.setFieldWidget = function(field) {
    this.field = field;
}

NFL.Chart2.prototype.setPlays = function(plays) {
    this.plays = plays;
    this.updateSeries();
};

NFL.Chart2.prototype.updateSeries = function() {
	// map play data to home and visitor arrays to pass to Highcharts
	var homeData = _.map(this.plays, function(play) {
		return {x: play.time, y: play.homeWp * 100};
	});
	var visitorData = _.map(this.plays, function(play) {
		return {x: play.time, y: play.visitorWp * 100};
	});
	
	// sort data by x value to keep Highcharts happy
	homeData = _.sortBy(homeData, 'x');
	visitorData = _.sortBy(visitorData, 'x');

	this.chartOptions.series[0].data = homeData;
	this.chartOptions.series[1].data = visitorData;
}

NFL.Chart2.prototype.setBall = function(currentState) {
	$('.ball').removeClass('hidden');
	if (currentState.offense === currentState.home) {
		$('.ball').removeClass('ballAway');
		$('.ball').addClass('ballHome');
	} else {
		$('.ball').removeClass('ballHome');
		$('.ball').addClass('ballAway');
	}
}

NFL.Chart2.prototype.onHover = function(args) {
	var previousState = (args.index > 0) ? this.plays[args.index - 1] : null;
	var currentState = this.plays[args.index];
	$('.ball').removeClass('hidden');
	this.setBall(currentState);
	NFL.PlayInfo.showPlayInfo(previousState, currentState);
	this.field.setState(previousState, currentState);
}

NFL.Chart2.prototype._onClearHover = function(args) {
	$('.ball').addClass('hidden');
	NFL.PlayInfo.clearPlayInfo();
	this.field.clearField();
}

NFL.Chart2.prototype.clearHover = function(args) {
	$('.ball').addClass('hidden');
	NFL.PlayInfo.clearPlayInfo();
	// this.highchart.xAxis[0].update({ plotLines: [ ] });
	for (var i = 0; i < this.highchart.series[0].data.length; ++i) {
		this.highchart.series[0].points[i].setState();
		this.highchart.series[1].points[i].setState();
	}
	this.highchart.tooltip.hide();
	this.field.clearField();
}

NFL.Chart2.prototype.setHover = function(play) {
	this.setBall(play);
	this.highchart.tooltip.refresh([this.highchart.series[0].points[play.idx], this.highchart.series[1].points[play.idx]]);
	// this.highchart.xAxis[0].update({
 //                                plotLines: [{
 //                                    value: this.highchart.series[0].points[play.idx].x,
 //                                    width: 1,
 //                                    color: '#C0C0C0'
 //                                }]
 //                            });
	this.highchart.series[0].points[play.idx].setState('hover');
	this.highchart.series[1].points[play.idx].setState('hover');
}

NFL.Chart2.prototype.render = function(element) {
	element.highcharts(this.chartOptions);
	this.highchart = element.highcharts();
}