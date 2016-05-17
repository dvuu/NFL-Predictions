var _ = require('underscore');
var csv = require('../utilities/csv.js');

// Print out args to the application
// Try running your program like "node fixData.js input.csv output.csv"
var args = process.argv;

var inputFile = args[2];
var outputFile = args[3];

// Steps:
// 1) Read in data from input.csv into memory (JS object, probably)
csv.readCsv(inputFile, function(err, playData) {
	console.log(playData.length + ' rows read');
	fixTurnoverOnKickOffBug(playData);
	csv.writeCsv(playData);
});

// 2) Apply fix to in-memory data

//flip psto & ptsd
function flipPointTotals(play) {
	var placeholder = play.ptsd;
	play.ptsd = play.ptso;
	play.ptso = placeholder;
	console.log('flip point totals for ' + play.pid );
}

//to fix the turnover bug where pts flip on a kickoff and there is a score
function fixTurnoverOnKickOffBug(plays) {
	for (var i = 1; i < plays.length; i++) {
	 	var curPlay = plays[i];
	 	var prevPlay = plays[i - 1];
	 	if (curPlay.gid !== prevPlay.gid) {
	 		continue;
	 	}
	 	//team stays the same
	 	if (curPlay.off == prevPlay.off) {
	 		if (curPlay.ptso < prevPlay.ptso || curPlay.pstd < prevPlay.ptsd) {
	 			flipPointTotals(curPlay);
	 			
	 		}
	 	}
	 	//team change off & def
	 	if (curPlay.off == prevPlay.def) {
	 		if (curPlay.ptso < prevPlay.ptsd || curPlay.ptsd < prevPlay.ptso) {
	 			flipPointTotals(curPlay);
	 		}
	 	}
	}
};

// 3) Write data out as a CSV to file named according to second arg
//		-- need to fill in writeCsv in csv.js