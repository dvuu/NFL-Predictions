var NFL = window.NFL = (window.NFL || { });

var TOTALHEIGHT = 444.33;
var TOTALWIDTH = 1000;
var ENDZONEWIDTH = 84;
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
	if (previousState.offense !== currentState.offense) {
		this.clearField();
		return;
	}
	var startingYardline = previousState.offYardline;
	var endingYardline = currentState.offYardline;
	var yardsToGo = currentState.yardsToGoForFirstDown;
	var isVisitorOffense = (this.previousState.visitor === this.previousState.offense);
	setArrow(startingYardline, endingYardline, isVisitorOffense);
	setBlueAndYellowLine(startingYardline, endingYardline, yardsToGo, isVisitorOffense);
	setFootballSprite(isVisitorOffense);
}

NFL.FieldWidget.prototype.clearField = function() {
	$('.fieldArrow').addClass('hidden');
	$('.verticalLine').addClass('hidden');
	$('.footballSprite').addClass('hidden');
}

function setArrow(startingYardline, endingYardline, isVisitorOffense) {
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

function setBlueAndYellowLine(startingYardline, endingYardline, yardsToGo, isVisitorOffense) {
	$('.verticalLineGrayDashed').removeClass('hidden');
	$('.verticalLineBlue').removeClass('hidden');
	$('.verticalLineYellow').removeClass('hidden');
	var blueLineDashed = startingYardline;
	var blueLine = endingYardline;
	var yellowLine = endingYardline + yardsToGo;
	if (isVisitorOffense) {
		blueLineDashed = 100 - startingYardline;
		blueLine = 100 - endingYardline;
		yellowLine = 100 - (endingYardline + yardsToGo);
	}
	var grayLineDashedPositionInPixels = yardLineToPixelOffset(blueLineDashed)
	var blueLinePositionInPixels = yardLineToPixelOffset(blueLine);
	var yellowLinePositionInPixels = yardLineToPixelOffset(yellowLine);
	$('.verticalLineGrayDashed').css({
		'left': grayLineDashedPositionInPixels
	});
	$('.verticalLineBlue').css({
		'left': blueLinePositionInPixels
	});
	$('.verticalLineYellow').css({
		'left': yellowLinePositionInPixels
	});
}

function setFootballSprite (isVisitorOffense) {
	$('.footballSprite').removeClass('hidden');
	if(isVisitorOffense) {
		$('.footballSprite').css({
			'left': TOTALWIDTH - ((ENDZONEWIDTH / 2) + 10)
		})
	}
	else {
		$('.footballSprite').css({
			'left': ENDZONEWIDTH / 2
		})
	}
}