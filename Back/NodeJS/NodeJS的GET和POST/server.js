var express = require('express');
var app = express();
var port = process.env.PORT  || 8080;

var bodyParser = require('body-parser');
//申请调用该模块是为了能够接收到使用Post方法的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/users', function(req, res){
	var user_id = req.body.id;
	var token = req.body.token;
	var geo = req.body.geo;

	res.send(user_id + ' ' + token + ' ' + geo);
});

app.get('/api/users', function(req, res){
	var user_id = req.param('id');
	var token = req.param('token');
	var geo = req.param('geo');

	res.send('user_id : ' + user_id + '\n' + 'token: ' + token + '\n' + 'geo : ' + geo);
});

app.get('/api/:version', function (req, res) {
	res.send('Version : ' + req.params.version);
});

app.param('name', function(req, res, next, name){
	var modified = name + '-dude';

	req.name = modified;

	next();
});

app.get('/api/users/:name', function (req, res) {
	res.send('What is up ' + req.name + '! ');
});


app.listen(8080);
console.log('Server started @ http://localhost:'+ port);