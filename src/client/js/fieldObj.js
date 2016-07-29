var NFL = window.NFL = (window.NFL || { });

var TOTALHEIGHT = 444.33;
var TOTALWIDTH = 1000;
var ENDZONEWIDTH = 82;
var YARDSPERPIXEL = ((TOTALWIDTH - (ENDZONEWIDTH * 2)) / 100);;

function yardLineToPixelOffset(yards) {
	return (yards * YARDSPERPIXEL) + ENDZONEWIDTH;
}

NFL.FieldWidget = function() {
	this.previousState = null;
	this.currentState = null;
}

NFL.FieldWidget.prototype.setState = function(previousState, currentState) {
	this.previousState = previousState;
	this.currentState = currentState;

	var startingYardline = previousState ? previousState.offYardline : 0;
	var endingYardline = currentState.offYardline;
	var yardsToGo = currentState.yardsToGoForFirstDown;
	var wasVisitorOffense = previousState ? (previousState.visitor === previousState.offense) : (currentState.visitor === currentState.offense);
	var isVisitorOffense = (currentState.visitor === currentState.offense);
	if (!previousState || previousState.type === 'KOFF') {
		startingYardline = 0;
	}

	// Turn off endzone highlights
	$('.endzoneHighlight').addClass('hidden');

	// Did points scored
	if (previousState && previousState.ptsScored) {
		if (previousState.ptsScored > 0) {
			// offense scored
			if (previousState.ptsScored == 3) {
				endingYardline = 115;
			}
			else {
				if (previousState.ptsScored > 3)
					$((wasVisitorOffense ? '.homeEndzone' : '.awayEndzone') + ' .endzoneHighlight').removeClass('hidden');
				endingYardline = 105;
			}
		}
		else{
			// defense scored
			if (previousState.ptsScored == -3) {
				endingYardline = -15;
			}
			else {
				if (previousState.ptsScored < -3)
					$((wasVisitorOffense ? '.homeEndzone' : '.awayEndzone') + ' .endzoneHighlight').removeClass('hidden');
				endingYardline = -5;
			}
		}
		this._clearLines();
		this.setGrayLine(startingYardline, wasVisitorOffense);
	}
	// No points scored
	else {
		this.setGrayLine(startingYardline, wasVisitorOffense);
		this.setBlueLine(endingYardline, wasVisitorOffense, isVisitorOffense);
		this.setYellowLine(endingYardline, yardsToGo, wasVisitorOffense, isVisitorOffense);
	}
	this.setArrow(startingYardline, endingYardline,
				  wasVisitorOffense, isVisitorOffense,
				  previousState.fumble || previousState.interception,
				  previousState && previousState.ptsScored);

	this.updatePlayString(previousState, currentState);
}

NFL.FieldWidget.prototype.updatePlayString = function(previousState, currentState) {
	var isVisitorOffense = previousState ? (previousState.visitor === previousState.offense) : (currentState.visitor === currentState.offense);
	var $turnoverDiv = $('<div/>').addClass('turnover');
	var $playDiv = $('<div/>').addClass('play');
	var $scoreDiv = $('<div/>').addClass('score');
	var $swingDiv = $('<div/>').addClass('swing');
	var $ytgDiv = $('<div/>').addClass('ytg');
	var turnover = previousState.interception || previousState.fumble;
	var yardsGained = previousState.ydsGained;
	var type = previousState.type;

	if (type == 'NOPL')
		type = 'Penalty';
	else if (type == 'FGXP')
		type = 'FG';

	// turnover
	if (previousState.interception) {
		$turnoverDiv.text("Interception!");
	}
	else if (previousState.fumble) {
		$turnoverDiv.text("Fumble!");
	}

	// play
	if (!turnover && previousState.ptsScored >= 0) {
		if (previousState.ptsScored > 0)
			yardsGained = 100 - previousState.offYardline;
		$playDiv.text(yardsGained + ' yard ' + type);
	}

	// score
	if (previousState && previousState.ptsScored > 0) {
		if (previousState.ptsScored == 2) {
			$scoreDiv.text("Safety " + previousState.offense + '!');
		}
		else if (previousState.ptsScored == 3) {
			$scoreDiv.text("Field Goal " + previousState.offense + '!');
		}
		else {
			$scoreDiv.text("Touchdown " + previousState.offense + '!');
		}
	}
	else if (previousState && previousState.ptsScored < 0) {
		if (previousState.ptsScored == -2) {
			$scoreDiv.text("Safety " + previousState.defense + '!');
		}
		else if (previousState.ptsScored == -3) {
			$scoreDiv.text("Field Goal " + previousState.defense + '!');
		}
		else {
			$scoreDiv.text("Touchdown " + previousState.defense + '!');
		}
	}

	// swing
	var homeWpDiff = (previousState.homeWpDiff * 100).toFixed(2)
	if (homeWpDiff > 0) {
		$swingDiv.text(previousState.home)
			.append($('<span/>').addClass('swingProb').text(' +' + homeWpDiff + '%'));
    }
    else {
        $swingDiv.text(previousState.visitor)
			.append($('<span/>').addClass('swingProb').text(' +' + (-homeWpDiff) + '%'));
    }

    // togo
	if (previousState.ptsScored == 0) {
		var down = [ 'NA', '1st', '2nd', '3rd', '4th', 'NA' ][currentState.down];
		var ytg = currentState.yardsToGoForFirstDown;
		$ytgDiv.text(down + ' and ' + ytg);
    }

	$('.playDescription').empty()
		.append($turnoverDiv)
		.append($playDiv)
		.append($scoreDiv)
		.append($swingDiv)
		.append($ytgDiv)
	$('.playDescription').removeClass('hidden');
}

NFL.FieldWidget.prototype.clearField = function() {
	$('.fieldArrow').addClass('hidden');
	$('.verticalLine').addClass('hidden');
	$('.playDescription').addClass('hidden');
	$('.endzoneHighlight').addClass('hidden');
}

NFL.FieldWidget.prototype._clearLines = function() {
	$('.verticalLineBlue').addClass('hidden');
	$('.verticalLineYellow').addClass('hidden');
}

NFL.FieldWidget.prototype.setArrow = function(startingYardline, endingYardline, wasVisitorOffense, isVisitorOffense, turnover, scored) {
	$('.fieldArrow').removeClass('hidden');
	var arrowLeft, arrowRight;

	if (wasVisitorOffense != isVisitorOffense && !scored)
		endingYardline = 100 - endingYardline;

	if (startingYardline > endingYardline) {
		// Negative yards gained
		
		if (wasVisitorOffense) {
			$('.fieldArrow').removeClass('flipped');
			arrowLeft = 100 - startingYardline;
			arrowRight = 100 - endingYardline;
		}
		
		else {
			$('.fieldArrow').addClass('flipped');
			arrowLeft = endingYardline;
			arrowRight = startingYardline;
		}
		// Change color for negative yards
		$('.fieldArrow').addClass('negativeYards');
		$('.fieldArrow').removeClass('positiveYards');
		$('.fieldArrow').removeClass('turnover');
	}
	else {
		// Positive yards gained
		if (wasVisitorOffense) {
			$('.fieldArrow').addClass('flipped');
			arrowLeft = 100 - endingYardline;
			arrowRight = 100 - startingYardline;
		}
		else {
			$('.fieldArrow').removeClass('flipped');
			arrowLeft = startingYardline;
			arrowRight = endingYardline;
		}
		$('.fieldArrow').removeClass('negativeYards');
		$('.fieldArrow').addClass('positiveYards');
		$('.fieldArrow').removeClass('turnover');
	}

	if (turnover) {
		$('.fieldArrow').removeClass('negativeYards');
		$('.fieldArrow').removeClass('positiveYards');
		$('.fieldArrow').addClass('turnover');
	}


	var arrowStartInPixels = yardLineToPixelOffset(arrowLeft);
	var arrowEndInPixels = yardLineToPixelOffset(arrowRight);
	var arrowLengthInPixels = Math.abs(arrowEndInPixels - arrowStartInPixels);
	$('.fieldArrow').css({
		'left': arrowStartInPixels, 
		'width': arrowLengthInPixels
	});
	$('.fieldArrow .arrowStem').css({
		'width': arrowLengthInPixels - 8
	});
}

NFL.FieldWidget.prototype.setGrayLine = function(startingYardline, wasVisitorOffense) {
	$('.verticalLineGrayDashed').removeClass('hidden');
	var grayLineDashed = startingYardline;
	if (wasVisitorOffense) {
		grayLineDashed = 100 - startingYardline;
	}
	var grayLineDashedPositionInPixels = yardLineToPixelOffset(grayLineDashed)
	$('.verticalLineGrayDashed').css({
		'left': grayLineDashedPositionInPixels
	});
}

NFL.FieldWidget.prototype.setBlueLine = function(endingYardline, wasVisitorOffense, isVisitorOffense) {
	$('.verticalLineBlue').removeClass('hidden');
	var blueLine = endingYardline;
	if (isVisitorOffense) {
		blueLine = 100 - endingYardline;
	}
	var blueLinePositionInPixels = yardLineToPixelOffset(blueLine);
	$('.verticalLineBlue').css({
		'left': blueLinePositionInPixels
	});
}

NFL.FieldWidget.prototype.setYellowLine = function(endingYardline, yardsToGo, wasVisitorOffense, isVisitorOffense) {
	$('.verticalLineYellow').removeClass('hidden');
	var yellowLine = endingYardline + yardsToGo;
	if (isVisitorOffense) {
		yellowLine = 100 - (endingYardline + yardsToGo);
	}
	var yellowLinePositionInPixels = yardLineToPixelOffset(yellowLine);
	$('.verticalLineYellow').css({
		'left': yellowLinePositionInPixels
	});
}

// NFL.FieldWidget.prototype.setFootballSprite = function(isVisitorOffense) {
// 	$('.footballSprite').removeClass('hidden');
// 	if(isVisitorOffense) {
// 		$('.footballSprite').css({
// 			'left': TOTALWIDTH - ((ENDZONEWIDTH / 2) + 10)
// 		})
// 	}
// 	else {
// 		$('.footballSprite').css({
// 			'left': ENDZONEWIDTH / 2
// 		})
// 	}
// }
