var fs = require('fs');
var request = require('request');
var _ = require('underscore');

var urls = {
	'SEA': 'http://fields.gridiron-uniforms.com/graphics/Seahawks2.png',
	'SD': 'http://fields.gridiron-uniforms.com/graphics/Chargers4.png',
	'PIT': 'http://fields.gridiron-uniforms.com/graphics/Steelers2.png',
	'PHI': 'http://fields.gridiron-uniforms.com/graphics/Eagles4.png',
	'MIN': 'http://fields.gridiron-uniforms.com/graphics/Vikings2.png',
	'MIA': 'http://fields.gridiron-uniforms.com/graphics/Dolphins4.png',
	'DAL': 'http://fields.gridiron-uniforms.com/graphics/Cowboys2.png',
	'ARI': 'http://fields.gridiron-uniforms.com/graphics/Cardinals.png',
	'ATL': 'http://fields.gridiron-uniforms.com/graphics/Falcons.png',
	'BAL': 'http://fields.gridiron-uniforms.com/graphics/Ravens.png',
	'BUF': 'http://fields.gridiron-uniforms.com/graphics/Bills.png',
	'CAR': 'http://fields.gridiron-uniforms.com/graphics/Panthers.png',
	'CIN': 'http://fields.gridiron-uniforms.com/graphics/Bengals.png',
	'DEN': 'http://fields.gridiron-uniforms.com/graphics/Broncos.png',
	'GB': 'http://fields.gridiron-uniforms.com/graphics/Packers.png',
	'IND': 'http://fields.gridiron-uniforms.com/graphics/Colts.png',
	'KC': 'http://fields.gridiron-uniforms.com/graphics/Chiefs.png',
	'NO': 'http://fields.gridiron-uniforms.com/graphics/Patriots.png',
	'MIN': 'http://fields.gridiron-uniforms.com/graphics/Saints.png',
	'NYG': 'http://fields.gridiron-uniforms.com/graphics/Giants.png',
	'NYJ': 'http://fields.gridiron-uniforms.com/graphics/Jets.png'
}

var options = { 
	url: '',
	encoding: null
};

var fsOptions = {
	encoding: 'binary'
};

_.each(urls, function(url, team) {
	options.url = url;
	request(options, function(error, response, body){
		if(!error && response.statusCode == 200) {
			fs.writeFile('./fields/' + team + '.png', body, fsOptions, function (err) {
				if (err) {
					console.log('error writing file: ' + err);
				}
				console.log('File was saved!!!!');
			});
		}
	});
});	

// request
// 	.get('http://fields.gridiron-uniforms.com/graphics/' + 'Seahawks2' + '.png')
// 	.on('response', function (response) {
// 		console.log(response.statusCode);
// 	})
// 	.on('data', function(data) {
// 		console.dir(data);
// 	});