module.exports = function(app) {

	app.get('/api/helloworld', function(req, res) {

		var result = {
			foo: 'bar'
		};

		res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });

};