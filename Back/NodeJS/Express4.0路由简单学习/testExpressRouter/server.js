//以上都为基础设置

var express = require('express');
//申请调用node_module中的express模块
var app = express();
// 执行得到的框架模块
var port = process.env.PORT || 8080;
//设定端口号
var path = require('path');

//路由设置

//设定进入到localhost:8080/sample路径下,并且发送字符串展示给用户This is a sample !
app.get('/sample', function(req, res){
	 res.send('this is a sample page !');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
//上述方法为老的3.0版本的方法。

//下面用了4.0的Router方法来进行路由设置了

var router = express.Router();
//先进行Router模块调用

router.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});
//Router定义的中间件，即执行具体操作之前

router.get('/home', function(req, res){
	res.send('I am using the express4.0 to show the home page !');
});

router.get('/about', function(req, res){
	res.send('I am using the express4.0\'s Router to show the about page !');
});

router.param('name', function  (req, res, next, name) {
	console.log('doing name validations on ' + name);
	req.name = name;

	next();
});
//直接通过路由的参数模块，在中间过程进行参数传递转换。

router.get('/hello/:name', function (req, res) {
	res.send('hello ' + req.name + ' !');
});

app.route('/login')
	.get(function(req, res){
		res.send('this is the login form');
	})
	//get方法是将内容传递给浏览器客户端
	.post(function (req, res) {
		console.log('processing ....');
		res.send('process the login form...');
	});
	//post方法是将内容传递给服务器端

//通过app.route 方法在一个路由路径上执行多类操作

app.use('/', router);

//启动应用

app.listen(port);
console.log('Magic happens on port ' + port);