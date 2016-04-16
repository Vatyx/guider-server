var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var location = {lat: 0, long: 0};

app.get("/", function(req, res) {
	res.json(location);
});

app.post("/", function(req, res) {
	console.log(req.body);
	location.lat = req.body.lat;
	location.long = req.body.long;

	res.end();
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
