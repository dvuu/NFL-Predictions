var _ = require('underscore');
var csv = require('../utilities/csv.js');

// This file allows us to fix the PLAY.csv file by reading it into an object,
// fixing the flawed data, then writing to a new .csv

// Print out args to the application
// Try running your program like "node fixData.js input.csv output.csv"
var args = process.argv;

var inputFile = args[2];
var outputFile = args[3];

// Steps:
// 1) Read in data from input.csv into memory (JS object, probably)
csv.readCsv(inputFile, function(err, playData) {
	console.log(playData.length + ' rows read');

	var badPlays = findBadPlays(playData, true);
	printBadPlays(badPlays);
	console.log('\n\n FIXING BAD PLAYS \n');
	// fixBadPlays(playData, badPlays);
	var newBadPlays = findBadPlays(playData, false);
	printBadPlays(newBadPlays);
	//console.log('there are ' + _.keys(badPlays).length + ' bad plays in total');

	console.log('about to call writeCsv...')
	csv.writeCsv(playData, outputFile, function(err) {
		if (err) {
			console.log('error writing file.');
		}
		else {
			console.log('writeCsv is done.');
		}
	});
});

// 2) Apply fix to in-memory data

//flip ptso & ptsd
function flipPointTotals(play) {
	var placeholder = play.ptsd;
	play.ptsd = play.ptso;
	play.ptso = placeholder;
	console.log('fix turnover on kickoff bug for ' + play.pid);
}

function printBadPlays(badPlays) {
	_.each(badPlays, function(val, key) {
		console.log("PLAY: " + key + ": " + JSON.stringify(val));
	});
}

function findBadPlays(plays, applyFix) {
	var badPlays = { };

	for (var i = 1; i < plays.length - 1; i++) {
		var prevPlay = plays[i - 1];
		var curPlay = plays[i];
		var nextPlay = plays[i + 1];
		if (curPlay.gid !== prevPlay.gid || curPlay.gid !== nextPlay.gid)
			continue;
		if (curPlay.type !== 'KOFF' && curPlay.type !== 'ONSD')
			continue;

		var team1 = curPlay.off;
		var team2 = curPlay.def;
		var pts1Prev = prevPlay.off == team1 ? prevPlay.ptso : prevPlay.ptsd;
		var pts1Cur = curPlay.ptso;
		var pts1Next = nextPlay.off == team1 ? nextPlay.ptso : nextPlay.ptsd;
		var pts2Prev = prevPlay.off == team2 ? prevPlay.ptso : prevPlay.ptsd;
		var pts2Cur = curPlay.ptsd;
		var pts2Next = nextPlay.off == team2 ? nextPlay.ptso : nextPlay.ptsd;

		if (pts1Cur > pts1Next && pts1Cur > pts1Prev) {
			badPlays[curPlay.pid] = { type: 'SAME SCORE BUG' };
			if (applyFix) {
				if (curPlay.fum && curPlay.pts != 0) {
					var ph = curPlay.ptsd;
					curPlay.ptsd = curPlay.ptso;
					curPlay.ptso = ph;
				}
				else {
					curPlay.ptso = (nextPlay.off == curPlay.off) ? nextPlay.ptso : nextPlay.ptsd;
					curPlay.ptsd = (nextPlay.def == curPlay.def) ? nextPlay.ptsd : nextPlay.ptso;
				}
			}
		}
		if (pts2Cur > pts2Next && pts2Cur > pts2Prev) {
			badPlays[curPlay.pid] = { type: 'SAME SCORE BUG' };
			if (applyFix) {
				if (curPlay.fum && curPlay.pts != 0) {
					var ph = curPlay.ptsd;
					curPlay.ptsd = curPlay.ptso;
					curPlay.ptso = ph;
				}
				else {
					curPlay.ptso = (nextPlay.off == curPlay.off) ? nextPlay.ptso : nextPlay.ptsd;
					curPlay.ptsd = (nextPlay.def == curPlay.def) ? nextPlay.ptsd : nextPlay.ptso;
				}
			}
		}
	}

	return badPlays;
}

function fixBadPlays(plays, badPlays) {

	for (var i = 1; i < plays.length - 1; i++) {
		var curPlay = plays[i];
		var prevPlay = plays[i - 1];
		var nextPlay = plays[i + 1];
		if (!badPlays[curPlay.pid] || badPlays[curPlay.pid].unfixable)
			continue;

		if (curPlay.off == nextPlay.off)
			curPlay.ptso = nextPlay.ptso;
		else if (curPlay.off == nextPlay.def)
			curPlay.ptso = nextPlay.ptsd;

		if (curPlay.def == nextPlay.off)
			curPlay.ptsd = nextPlay.ptso;
		else if (curPlay.def == nextPlay.def)
			curPlay.ptsd = nextPlay.ptsd;

	}
}



// //to fix the turnover bug where pts suddenly are equal on a kickoff
// function fixSameScoreOnKickOffBug(plays) {
// 	for (var i = 1; i < plays.length; i++) {
// 	 	var curPlay = plays[i];
// 	 	var prevPlay = plays[i - 1];
// 	 	if (curPlay.gid !== prevPlay.gid) {
// 	 		continue;
// 	 	}

// 	 	if (curPlay.type == 'KOFF' && curPlay.pts == 0 && curPlay.ptso == curPlay.ptsd) {
// 	 		if (curPlay.off == prevPlay.off) {
// 	 			if (curPlay.ptso != prevPlay.ptso + prevPlay.pts || (curPlay.ptsd != prevPlay.ptsd)) {
// 	 				//curPlay.ptso = prevPlay.ptso + prevPlay.pts;
// 	 				//curPlay.ptsd = prevPlay.ptsd;
// 	 				if (!badPlays[curPlay.pid])
// 	 					badPlays[curPlay.pid] = 'Type 2 Case 1';
// 	 			}
// 	 		}
// 	 		else {
// 	 			if (curPlay.ptso != prevPlay.ptsd || curPlay.ptsd != (prevPlay.ptso + prevPlay.pts)) {
// 	 				//curPlay.ptso = prevPlay.ptsd;
// 	 				//curPlay.ptsd = prevPlay.ptso + prevPlay.pts;
// 	 				if (!badPlays[curPlay.pid])
// 	 					badPlays[curPlay.pid] = 'Type 2 Case 2';
// 	 			}
// 	 		}
// 	 	}
// 	}
// };

// //to fix the turnover bug where pts flip on a kickoff and there is a score
// function fixTurnoverOnKickOffBug(plays) {
// 	for (var i = 1; i < plays.length; i++) {
// 	 	var curPlay = plays[i];
// 	 	var prevPlay = plays[i - 1];
// 	 	if (curPlay.gid !== prevPlay.gid) {
// 	 		continue;
// 	 	}
// 	 	//team stays the same
// 	 	if (curPlay.off == prevPlay.off) {
// 	 		if (curPlay.ptso < prevPlay.ptso || curPlay.ptsd < prevPlay.ptsd) {
// 	 			if (!badPlays[curPlay.pid])
// 	 				badPlays[curPlay.pid] = 'Type 3 Case 1';
// 	 		}
// 	 	}
// 	 	//team change off & def
// 	 	if (curPlay.off == prevPlay.def) {
// 	 		if (curPlay.ptso < prevPlay.ptsd || curPlay.ptsd < prevPlay.ptso) {
// 	 			if (!badPlays[curPlay.pid])
// 	 				badPlays[curPlay.pid] = 'Type 3 Case 2';
// 	 		}
// 	 	}
// 	}
// };

