var _ = require('underscore');
var csv = require('../utilities/csv.js');

// This file allows us to fix the PLAY.csv file by reading it into an object,
// fixing the flawed data, then writing to a new .csv
var args = process.argv;

var inputFile = args[2];
var outputFile = args[3];

csv.readCsv(inputFile, function(err, playData) {
	console.log(playData.length + ' rows read');

	var badPlays = findAndFixBadPlays(playData, true);
	printBadPlays(badPlays);
	console.log('\n\n FIXING BAD PLAYS \n');
	var newBadPlays = findAndFixBadPlays(playData, false);
	printBadPlays(newBadPlays);

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

function printBadPlays(badPlays) {
	_.each(badPlays, function(val, key) {
		console.log("PLAY: " + key + ": " + JSON.stringify(val));
	});
}

function findAndFixBadPlays(plays, applyFix) {
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
