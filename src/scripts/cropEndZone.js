var shell = require('shelljs');

var teams = [
	'SEA',
	'SD',
	'PIT',
	'PHI',
	'MIN',
	'MIA',
	'DAL',
	'ARI',
	'ATL',
	'BAL',
	'BUF',
	'CAR',
	'CIN',
	'DEN',
	'GB',
	'IND',
	'KC',
	'NO',
	'MIN',
	'NYG',
	'NYJ',
	'SF',
	'TB',
	'TEN',
	'DET',
	'HOU',
	'JAC',
	'OAK',
	'STL',
	'WAS',
	'CLE',
	'CHI',
	'NE'
]

// convert fields/HOU.png -crop 66x368+798+97 -resize 78x428\! -rotate 180 endzones/test.png

var needsRotate;
var needsResize;
var crop = '';

for (var i = teams.length - 1; i >= 0; i--) {
	var teamFeildTypeOne = teams[i] == 'HOU' || teams[i] == 'JAC' || teams[i] == 'CLE';
	var teamFeildTypeTwoRight = teams[i] == 'SF' || teams[i] == 'OAK' || teams[i] == 'STL';
	var teamFeildTypeTwoLeft = teams[i] == 'CHI' || teams[i] == 'TB' || teams[i] == 'TEN' || teams[i] == 'NE';
	var teamFeildTypeThree = teams[i] == 'WAS';
	if (teamFeildTypeOne) {
		needsRotate = true;
		needsResize = true;
		crop = '-crop 66x368+798+97';
		// shell.exec('convert fields/' + teams[i] + '.png -crop 66x368+798+97 endzones/'
		// 	+ teams[i] + '.png');
	}
	else if (teamFeildTypeTwoRight) {
		needsRotate = true;
		needsResize = true;
		crop = '-crop 76x419+907+103';
		// shell.exec('convert fields/' + teams[i] + '.png -crop 76x419+907+103 endzones/'
		// 	+ teams[i] + '.png');
	}
	else if (teamFeildTypeTwoLeft) {
		needsRotate = false;
		needsResize = true;
		crop = '-crop 76x419+41+103';
		// shell.exec('convert fields/' + teams[i] + '.png -crop 76x419+41+103 endzones/'
		// 	+ teams[i] + '.png');
	}
	else if (teamFeildTypeThree) {
		needsRotate = true;
		needsResize = true;
		crop = '-crop 79x430+917+28';
	// 	shell.exec('convert fields/' + teams[i] + '.png -crop 79x430+917+28 endzones/'
	// 		+ teams[i] + '.png');
	}
	else{
		needsRotate = false;
		needsResize = true;
		crop = '-crop 78x428+29+29';
		// shell.exec('convert fields/' + teams[i] + '.png -crop 78x428+29+29 endzones/'
		// 	+ teams[i] + '.png');
	}

	var cmd = 'convert fields/' + teams[i] + '.png ';
	cmd += crop;
	if (needsResize)
		cmd += ' -resize 78x428\\!';
	if (needsRotate)
		cmd += ' -rotate 180';

	cmd += ' endzones/'+ teams[i] +'.png';
	console.log(cmd);
	shell.exec(cmd);
}