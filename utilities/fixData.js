var _ = require('underscore');
var csv = require('../utilities/csv.js');

// Print out args to the application
// Try running your program like "node fixData.js input.csv output.csv"
var args = process.argv;
console.dir(args);

var inputFile = args[2];
var outputFile = args[3];

// Steps:
// 1) Read in data from input.csv into memory (JS object, probably)
console.log("Calling 'readCsv'...");
csv.readCsv(inputFile, function(err, playData) {
	console.log(playData[0]);
	console.log(playData.length + ' rows read');
	fixTurnoverOnKickOffBug(playData);
	csv.writeCsv(playData);
});
console.log("'readCsv' returned");

// 2) Apply fix to in-memory data

//to fix the turnover bug where pts flip on a kickoff and there is a score
function fixTurnoverOnKickOffBug(plays) {
	// for (var i = 0; i < plays.length; i++) {
	// 	if (i > 1) {
	// 		if (plays[i].ptsHome < plays[i - 1].ptsHome || plays[i].ptsVisitor < plays[i - 1].ptsVisitor) {
	// 			var placeholder = plays[i].ptsVisitor;
	// 			console.log(placeholder);
	// 			plays[i].ptsVisitor = plays[i].ptsHome;
	// 			console.log(plays[i].ptsVisitor);
	// 			plays[i].ptsHome = placeholder;
	// 			console.log(plays[i].ptsHome);
	// 			if (plays[i].home == plays[i].offense) {
	// 			 	plays[i].ptsOffense = plays[i].ptsHome;
	// 			 	plays[i].ptsDefense = plays[i].ptsVisitor;
	// 			}
	// 			else{
	// 			 	plays[i].ptsDefense = plays[i].ptsHome;
	// 			 	plays[i].ptsOffense = plays[i].ptsVisitor;
	// 			}
	// 		}
	// 	}
	// }
}

// 3) Write data out as a CSV to file named according to second arg
//		-- need to fill in writeCsv in csv.js
