var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

var location = {lat: 0, long: 0};
var weather = {temp: "", wind: "", sunset: "", humidity: ""};
var traffic = {trafficData:[]};

app.get("/", function(req, res) {
	res.sendfile('index.html');
});

app.get("/location", function(req, res) {
	res.json(location);
});

app.post("/location", function(req, res) {
	console.log(req.body);
	location.lat = req.body.lat;
	location.long = req.body.long;

	res.end();
});


app.get("/weather", function(req, res) {
	res.json(weather);
});
//wind humidity sunset temp
app.post("/weather", function(req,res) {
	console.log(req.body);
	weather.temp = req.body.temp;
	weather.sunset = req.body.sunset;
	weather.humidity = req.body.humidity;
	weather.wind = req.body.wind;
	res.end();
});

app.get("/traffic", function(req, res) {
	res.json(traffic);
});

app.post("/traffic", function(req,res) {
	traffic.trafficData = req.body.trafficData;
	res.end();
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
