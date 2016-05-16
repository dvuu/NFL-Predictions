
// Print out args to the application
// Try running your program like "node fixData.js input.csv output.csv"
var args = process.argv;
console.dir(args);

var inputFile = args[2];
var outputFile = args[3];

// Steps:
// 1) Read in data from input.csv into memory (JS object, probably)
// 2) Apply fix to in-memory data
// 3) Write data out as a CSV to file named according to second arg