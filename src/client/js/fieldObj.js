var NFL = window.NFL = (window.NFL || { });

var TOTALHEIGHT = 425;
var TOTALWIDTH = 1000;
var ENDZONEWIDTH = 90;
var YARDSPERPIXEL = ((TOTALWIDTH - (ENDZONEWIDTH * 2)) / 100);;

NFL.FieldWidget = function () {
	this.previousState = null;
	this.currentState = null;
}

NFL.FieldWidget.prototype.setState = function (previousState, currentState) {
	this.previousState = previousState;
	this.currentState = currentState;
	var startingYardline = previousState.offYardline;
	var endingYardline = currentState.offYardline;
	var isVisitorOffense = (this.previousState.visitor === this.previousState.offense);
	setArrow(startingYardline, endingYardline, isVisitorOffense);
}

NFL.FieldWidget.prototype.clearField = function() {
	$('.fieldArrow').addClass('hidden');
}

function setArrow (startingYardline, endingYardline, isVisitorOffense) {
	$('.fieldArrow').removeClass('hidden');
	var arrowLeft = startingYardline;
	var arrowRight = endingYardline;
	if (isVisitorOffense) {
		$('.fieldArrow').addClass('flipped');
		arrowLeft = 100 - endingYardline;
		arrowRight = 100 - startingYardline;
	}
	else {
		$('.fieldArrow').removeClass('flipped');
	}
	var arrowLeftInPixels = (arrowLeft * YARDSPERPIXEL) + ENDZONEWIDTH;
	var arrowRightInPixels = (arrowRight * YARDSPERPIXEL) + ENDZONEWIDTH;
	var arrowLengthInPixels = Math.abs(arrowRightInPixels - arrowLeftInPixels);
	$('.fieldArrow').css({
		'left': arrowLeftInPixels, 
		'width': arrowLengthInPixels
	});
}

function setYellowAndBlueLines() {

}