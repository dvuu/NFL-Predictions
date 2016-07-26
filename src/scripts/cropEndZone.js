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
	'NYJ'
]

for (var i = teams.length - 1; i >= 0; i--) {
	shell.exec('convert fields/' + teams[i] + '.png -crop 78x428+29+29 endzones/' + teams[i] + '.png');
}

