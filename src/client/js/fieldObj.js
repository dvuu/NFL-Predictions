var NFL = window.NFL = (window.NFL || { });

var TOTALHEIGHT = 425;
var TOTALWIDTH = 1000;
var ENDZONEWIDTH = 90;
var YARDSPERPIXEL = ((TOTALWIDTH - (ENDZONEWIDTH * 2)) / 100);;

function findYardsPerPixel(yards) {
	return (yards * YARDSPERPIXEL) + ENDZONEWIDTH;
}

NFL.FieldWidget = function() {
	this.previousState = null;
	this.currentState = null;
}

NFL.FieldWidget.prototype.setState = function(previousState, currentState) {
	this.previousState = previousState;
	this.currentState = currentState;
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
	$('.verticalLineBlue').addClass('hidden');
	$('.verticalLineYellow').addClass('hidden');
	$('.footballSprite').addClass('hidden');
}

function setArrow(startingYardline, endingYardline, isVisitorOffense) {
	$('.fieldArrow').removeClass('hidden');
	var arrowStartingLeft = startingYardline;
	var arrowEndingRight = endingYardline;
	if (isVisitorOffense) {
		$('.fieldArrow').addClass('flipped');
		arrowStartingLeft = 100 - endingYardline;
		arrowEndingRight = 100 - startingYardline;
	}
	else {
		$('.fieldArrow').removeClass('flipped');
	}
	var arrowStartInPixels = findYardsPerPixel(arrowStartingLeft);
	var arrowEndInPixels = findYardsPerPixel(arrowEndingRight);
	var arrowLengthInPixels = Math.abs(arrowEndInPixels - arrowStartInPixels);
	$('.fieldArrow').css({
		'left': arrowStartInPixels, 
		'width': arrowLengthInPixels
	});
}

function setBlueAndYellowLine(startingYardline, endingYardline, yardsToGo, isVisitorOffense) {
	$('.verticalLineBlue').removeClass('hidden');
	$('.verticalLineYellow').removeClass('hidden');
	var blueLineLeft = endingYardline;
	var yellowLineRight = endingYardline + yardsToGo;
	if (isVisitorOffense) {
		blueLineLeft = 100 - endingYardline;
		yellowLineRight = 100 - (endingYardline + yardsToGo);
	}
	var blueLinePositionInPixels = findYardsPerPixel(blueLineLeft);
	var yellowLinePositionInPixels = findYardsPerPixel(yellowLineRight);
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
			'left': TOTALWIDTH - (ENDZONEWIDTH / 2)
		})
	}
	else {
		$('.footballSprite').css({
			'left': ENDZONEWIDTH / 2
		})
	}
}