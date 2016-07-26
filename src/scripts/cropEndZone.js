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
	'LA',
	'WAS',
	'CLE',
	'CIN'
]



for (var i = teams.length - 1; i >= 0; i--) {
	var teamFeildTypeOne = teams[i] == 'HOU' || teams[i] == 'JAC' || teams[i] == 'CLE';
	var teamFeildTypeTwoRight = teams[i] == 'SF' || teams[i] == 'OAK' || teams[i] == 'LA';
	var teamFeildTypeTwoLeft = teams[i] == 'CIN' || teams[i] == 'TB' || teams[i] == 'TEN';
	var teamFeildTypeThree = teams[i] == 'WAS';
	if (teamFeildTypeOne) {
		shell.exec('convert fields/' + teams[i] + '.png -crop 66x368+798+97 endzones/'
			+ teams[i] + '.png');
	}
	else if (teamFeildTypeTwoRight) {
		shell.exec('convert fields/' + teams[i] + '.png -crop 76x419+907+103 endzones/'
			+ teams[i] + '.png');
	}
	else if (teamFeildTypeTwoLeft) {
		shell.exec('convert fields/' + teams[i] + '.png -crop 76x419+41+103 endzones/'
			+ teams[i] + '.png');
	}
	else if (teamFeildTypeThree) {
		shell.exec('convert fields/' + teams[i] + '.png -crop 79x430+917+28 endzones/'
			+ teams[i] + '.png');
	}
	else{
		shell.exec('convert fields/' + teams[i] + '.png -crop 78x428+29+29 endzones/'
			+ teams[i] + '.png');
	}
}