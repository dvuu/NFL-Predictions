var NFL = window.NFL = (window.NFL || { });

NFL.TopTen = function (topTenResult, playsResult) {
	this.topTenResult = topTenResult;
	this.playsResult = playsResult;
};

NFL.TopTen.prototype.render = function () {
	var self = this;
	_.each(self.topTenResult, function(play) {
		$('.topPlaysTitle').html('TOP 10 PLAYS <em>(' + play.home + ' % SWING)</em>');
		var $playElement = $('<div class="topPlay">' + playDescription(play) + '</div>');
		$('.topPlays').append($playElement);
		//event function that when you hover top ten it will dislay where it is located on the chart
		$playElement.on('mouseenter', function( ) {
			// Trigger chart hover UI
			self.chart.setHover(play);
			// Update field widget
  			var startState = play.idx + 1 === null ? null : self.playsResult[play.idx];
  			var endState = play.idx + 1 < self.playsResult.length ? self.playsResult[play.idx + 1] : null;
  			NFL.PlayInfo.showPlayInfo(startState, endState);
  			self.field.setState(startState, endState);
		});
		$playElement.on('mouseleave', function( ) {
			self.chart.clearHover();
  			NFL.PlayInfo.clearPlayInfo();
  			self.field.clearField();
		});
	});
};

NFL.TopTen.prototype.setChart = function (chart) {
	this.chart = chart;
}

NFL.TopTen.prototype.setFieldWidget = function (field) {
    this.field = field;
}

function playDescription(play) {
	var homeWpDiff = (play.homeWpDiff * 100).toFixed(2);
	if (play.homeWpDiff > 0) {
		if (play.seconds < 10) {
		 	return ('<span>' + play.type + ' by ' + play.offense + ' at ' + play.minute 
		 	+ ':0' + play.seconds + ' in Q' + play.quarter 
		 	+ ' (<span class="posWp">+' + homeWpDiff + '%</span>)</span>');
		}
		else {
			return ('<span>' + play.type + ' by ' + play.offense + ' at ' + play.minute 
			+ ':' + play.seconds + ' in Q' + play.quarter 
			+ ' (<span class="posWp">+' + homeWpDiff + '%</span>)</span>');
		}
	}
	else {
		if (play.seconds < 10) {
	 		return ('<span>' + play.type + ' by ' + play.offense + ' at ' + play.minute 
	 		+ ':0' + play.seconds + ' in Q' + play.quarter 
	 		+ ' (<span class="negWp">' + homeWpDiff + '%</span>)</span>');
		}
		else {
			return ('<span>' + play.type + ' by ' + play.offense + ' at ' + play.minute + ':' 
			+ play.seconds + ' in Q' + play.quarter 
			+ ' (<span class="negWp">' + homeWpDiff + '%</span>)</span>');
		}
	}
}