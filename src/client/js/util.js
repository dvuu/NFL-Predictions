var NFL = window.NFL = (window.NFL || { });

NFL.Util = {
	// Returns the time left in the given quarter, formatted as a readable string
	getTimeInQuarter: function(play) {
		var ret = play.minute;
	    ret += ':' + ((play.seconds < 10) ? ('0' + play.seconds) : play.seconds);
	    return ret;
	}
};