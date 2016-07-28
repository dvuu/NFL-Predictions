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
	clearTimeout(this.timer);
	this.previousState = previousState;
	this.currentState = currentState;
	// if (previousState.offense !== currentState.offense) {
	// 	this.clearField();
	// 	return;
	// }

	var startingYardline = previousState.offYardline;
	var endingYardline = currentState.offYardline;
	var yardsToGo = currentState.yardsToGoForFirstDown;
	var isVisitorOffense = (this.previousState.visitor === this.previousState.offense);
	if (this.previousState.type === 'KOFF') {
		startingYardline = 0;
	}

	// Check for possesion change
	var didPosessionChange = (this.previousState.offense !== this.currentState.offense);
	if (didPosessionChange && this.previousState.ptsOffense < this.currentState.ptsDefense) {
		endingYardline = 105;
		this._clearLines();
		this.setGrayLine(startingYardline, isVisitorOffense);
	}
	else {
		this.setGrayLine(startingYardline, isVisitorOffense);
		this.setBlueLine(endingYardline, isVisitorOffense);
		this.setYellowLine(endingYardline, yardsToGo, isVisitorOffense);
	}

	this.setArrow(startingYardline, endingYardline, isVisitorOffense);
	// this.setFootballSprite(isVisitorOffense);
}

NFL.FieldWidget.prototype.clearField = function() {
	this.timer = setTimeout(function() {
		$('.fieldArrow').addClass('hidden');
		$('.verticalLine').addClass('hidden');
	}, 1000);
	// $('.footballSprite').addClass('hidden');
}

NFL.FieldWidget.prototype._clearLines = function() {
	$('.verticalLineBlue').addClass('hidden');
	$('.verticalLineYellow').addClass('hidden');
}

NFL.FieldWidget.prototype.setArrow = function(startingYardline, endingYardline, isVisitorOffense) {
	$('.fieldArrow').removeClass('hidden');
	var arrowLeft, arrowRight;
	if (startingYardline > endingYardline) {
		// Negative yards gained
		if (isVisitorOffense) {
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
		$('.fieldArrow').addClass('negativeYard');
	}
	else {
		// Positive yards gained
		if (isVisitorOffense) {
			$('.fieldArrow').addClass('flipped');
			arrowLeft = 100 - endingYardline;
			arrowRight = 100 - startingYardline;
		}
		else {
			$('.fieldArrow').removeClass('flipped');
			arrowLeft = startingYardline;
			arrowRight = endingYardline;
		}
		$('.fieldArrow').removeClass('negativeYard');
	}
	var arrowStartInPixels = yardLineToPixelOffset(arrowLeft);
	var arrowEndInPixels = yardLineToPixelOffset(arrowRight);
	var arrowLengthInPixels = Math.abs(arrowEndInPixels - arrowStartInPixels);
	$('.fieldArrow').css({
		'left': arrowStartInPixels, 
		'width': arrowLengthInPixels
	});
}

NFL.FieldWidget.prototype.setGrayLine = function(startingYardline, isVisitorOffense) {
	$('.verticalLineGrayDashed').removeClass('hidden');
	var grayLineDashed = startingYardline;
	if (isVisitorOffense) {
		grayLineDashed = 100 - startingYardline;
	}
	var grayLineDashedPositionInPixels = yardLineToPixelOffset(grayLineDashed)
	$('.verticalLineGrayDashed').css({
		'left': grayLineDashedPositionInPixels
	});
}

NFL.FieldWidget.prototype.setBlueLine = function(endingYardline, isVisitorOffense) {
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

NFL.FieldWidget.prototype.setYellowLine = function(endingYardline, yardsToGo, isVisitorOffense) {
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