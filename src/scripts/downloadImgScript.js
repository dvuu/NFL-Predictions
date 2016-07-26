var fs = require('fs');
var request = require('request');
var _ = require('underscore');

var urls = {
	'SEA': 'http://fields.gridiron-uniforms.com/graphics/Seahawks2.png',
	'SD': 'http://fields.gridiron-uniforms.com/graphics/Chargers4.png',
	'PIT': 'http://fields.gridiron-uniforms.com/graphics/Steelers2.png',
	'PHI': 'http://fields.gridiron-uniforms.com/graphics/Eagles4.png',
	'MIN': 'http://fields.gridiron-uniforms.com/graphics/Vikings2.png',
	'MIA': 'http://fields.gridiron-uniforms.com/graphics/Dolphins.png',
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
	'NYJ': 'http://fields.gridiron-uniforms.com/graphics/Jets.png',
	'SF': 'http://fields.gridiron-uniforms.com/graphics/sb/XLVII.png',
	'TB': 'http://fields.gridiron-uniforms.com/graphics/sb/XXXVII.png',
	'TEN': 'http://fields.gridiron-uniforms.com/graphics/sb/XXXIV.png',
	'DET': 'http://fields.gridiron-uniforms.com/images/full/DET_2001.png',
	'HOU': 'http://img13.deviantart.net/8571/i/2015/054/5/9/football_field___texans__by_superman8193-d8jaudb.jpg',
	'JAC': 'http://img15.deviantart.net/aa64/i/2015/054/8/c/football_field___jaguars__by_superman8193-d8jax57.jpg',
	'OAK': 'http://fields.gridiron-uniforms.com/graphics/sb/XXXVII.png',
	'LA': 'http://fields.gridiron-uniforms.com/graphics/sb/XXXIV.png',
	'WAS': 'http://fields.gridiron-uniforms.com/graphics/sb/XXVI.png',
	'CLE': 'http://img08.deviantart.net/0fa1/i/2015/054/b/1/football_field___browns__by_superman8193-d8jazfb.jpg',
	'CIN': 'http://fields.gridiron-uniforms.com/graphics/sb/XLI.png'
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