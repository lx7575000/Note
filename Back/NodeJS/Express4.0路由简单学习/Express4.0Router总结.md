#学习Express4.0的路由Router

###2015-04-13

直接放干货好了。反正网上介绍的文章不少，这篇是在自己学习过程中的一些总结。Just for me most..

####开始调用Router模块  `express.Router()`
```
	var express = require('express');
	var app = express();
	var port = process.env.PORT || 0880;
	
	var router = express.Router();
```

通过express调用了Router模块，只有通过它我们才能使用到4.0中更简单方便的路由功能，以及中间件的能力。

####使用简单route路由功能  `router.get()`

```
router.get('/', function(req, res){
	res.send('This is the home page with use router function !!!');
});
//该页面就是为了发出这段字符串，直接访问http://localhost:8080 就可以

app.use('/', router);
//通过这样的设定，以后访问router所定义的路由页面，基础路由路径是'/'。同理如果设定为'/app', 则就需要http://localhost:8080/app 然后加路径进行访问
```

####定义并使用中间件middleware `router.use()`
中间件可以有许多功能，在我们进行登录操作的时候来进行验证，输入格式是否符合要求；验证密码和用户名是否匹配；传输数据的时候预先进行格式转换等等。。。		
所以说其实中间件可以是后端操作中的各个部分的小零件或者润滑剂。能够模块化的使我们可以得到更好的体验。

```
router.use(function(req, res, next){
	console.log('processing ...');
	console.log(req.method, req.url);
	
	next();//next的作用是执行完该处后会继续执行后面我要求的其他的操作。
});
```

####路由传递参数 `/hello/:name`

```
router.get('/hello/:name', function(req, res){
	res.send('hello ' + req.params.name + ' !');
	//通过req参数来引用参数
});
```

后面我们通过访问**http://localhost:8080/hello/holly** 就可以收到‘hello holly’的显示了。

当然我们也可以通过中间件的形式来得到我们所需要的参数。

####用于获得参数的路由中间件 `router.param()`

```
router.param('name', function(req, res, next, name){
	console.log('doing name validations on ' + name);
	req.name = name;
	//将内容存储在req.name中，方便在后面的其他环节来使用
	next();
});

router.get('/hello/:name', function(req, res){
	res.send('hello ' + req.name + ' !');
	//没错，这里就是其他环节
});

```

####通过类似登陆环节来了解，路由的多种操作 `app.route`

```
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
```

现在可以通过get的方式得到我们要传递给客户端的数据，post方法来将我们的数据传递给服务器端来进行处理。

###下面再加一点express4.0的内容
如果想要使用express4.0传送html页面给浏览器，可以通过使用express所提供的`res.sendFile`方法来实现.

当然是有前提的，我们需要传入`path`模块。用以表示当前所处文件地址，来与要传入的文件建立联系。

```
var express = require('express');
var app = express();
var path = require('path');


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //当前所处的地址 + 文件名 形成绝对地址。
});

app.listen(8080);
```

具体实现，可以见代码。