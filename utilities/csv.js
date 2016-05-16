var _ = require('underscore');
var readline = require('readline');
var fs = require('fs');

// Reads a CSV file and converts into an array of objects, each of whose keys
// are based on the columns of the csv.
module.exports.readCsv = function(filename, callback) {
    var start = new Date();

    var ret = [ ];
    var isFirstLine = true;
    var columns = [ ];

    // Create a readline interface to read the file line by line
    var lineReader = readline.createInterface({
        input: fs.createReadStream(filename)
    });

    // Handle lines one by one
    lineReader.on('line', function(line) {
        var lineValues = line.split(',');
        if (isFirstLine) {
            // If it's the first line, capture the column names
            columns = lineValues;
            isFirstLine = false;
        }
        else {
            // Create an object per line
            var obj = { };
            _.each(lineValues, function(value, idx) {
                var key = columns[idx];
                obj[key] = typeify(value);
            });
            ret.push(obj);
        }
    });

    lineReader.on('close', function() {
        console.log("parsed " + filename + " in " + (new Date() - start) + " ms");
        callback && callback(null, ret);
    });
}

module.exports.writeCsv = function(data, callback) {
    // TBD
}

// Basic algorithm to determine the correct type of a value from a CSV file since they
// are all strings when they are read in.
function typeify(value) {
    // Try boolean
    if (value.toLowerCase() == 'true')
        return true;
    else if (value.toLowerCase() == 'false')
        return false;

    // Try number
    var numValue = parseFloat(value);
    if (!isNaN(numValue))
        return numValue;

    // Otherwise it's just a string
    return value;
}