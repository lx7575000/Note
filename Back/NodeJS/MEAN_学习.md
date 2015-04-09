#MEAN 学习
###2015-03-31

	由于所看书籍为英文版本，为了防止自己的渣记性看一点忘一点，谨以此文作为小提醒。

####创建项目文档配置
JSON文档的创建使用`npm init`的方式来开始，后面的配置会有命令行来通过提醒的方式来做。

其中的**name**项是用来创建项目名称， **main**是用于创建所需要的主要应用文件（js文件）。

这个`npm init`命令生成的**package.json**文件的优点是可以来大致的将我们所建应用的运行环境描述出来，并且在其他人运用此应用的时候可以根据要求来进行细致的环境配置，以防止出现。环境工具版本不匹配的情况。

####比node命令更好用的一个工具
**我们可以只用另一个命令<a href='https://github.com/remy/nodemon'>nodemon</a>,它相对于node可以实时监控我们所启动的文件是否有所修改，并适时的进行重启。**

###npm在进行安装新模块或者更新老模块的时候
我们可以在后面加入命令`--save`会将该模块的依赖添加到**package.json**文件当中。

栗子：添加express模块，将被下载到node_modules文件夹当中		

```
	npm install express --save
```

**当然也可以一次性将所有需要的模块下载齐活！一个命令全部搞定**	
	
```
	npm install
```

**强迫症如果非要知道自己下载了什么，也可以通过以下方法来同时下载，你所需要的几个包：**

```
	npm install express mongoose passprot --save
````

###使用express建立后端服务器
	前提是，你已经将express已经下载下来了。

```
//载入express, 创建app
var express = require('express');
var app = express();
var path = require('path');

//将index.html页面传递给用户
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

//启动server
app.listen(1337);
console.log('1337 is the magic port ! ');
```

####Router 中间件
路由器是一个孤立的中间件和路由的实例，每个express程序都会有最少一个内置的应用路由器。

#####创建路由器：	

```
	var express = require('express');
	var app = express();
	//大前提是要求上述引用express模块
	
	var router = express.Router();
```

#####router.use()的使用	
`use`的使用方式有**两种**。

######第一种`router.use(function)`
这种方法生成的中间件**function**适用任何路由规则。即，进行任何特定请求的路由操作之前都会先进行此路由操作，然后通过`next()`进行下一步的跳转再操作。

**格式：**		

```
router.use(function(req, res, next){
	//进行逻辑操作，比如可以进行预先的参数设置，
	//或者是提前对传入内容进行格式化整理.
	next();//跳转进行后面的操作
});
```

######第二种`router.use([path], function)`
这种方法会根据我们进入的**path**不同，来选择特定相关的方法来进行操作。例如我们的URL路径选择为"www.test.com/test/",则我们会选择适用特定的`router.use('/test', function())`中间件来使用。

**格式：**		

```
router.use('/admin', function(req, res, next){
	//会对进入'/admin'这个特定路径的有所反应。
	//可以通过路径的方式来传入一定的参数，通过req.params.参数名的形式提取到。
	next();
});
```

**注意：中间件使用router.use()，定义的顺序非常重要，它们是被顺序调用的。因此需要按照优先级进行调用。**

#####`router.param([name], callback)`的使用

**栗子**

```
router.param('user', function(req, res, next, id){
	User.fine(id, function(err, user){
		if(err){
			return next(err);
		}
		else if(!user){
			return next(new Error('failed to load user.'));
		}
		req.user = user;
		next();
	});
});
//以下路由使用了被命名为':user'的参数
//这将导致‘user’参数回调函数会被触发。
router.get('/users/:user', function(req, res, next){
	//req.user将会在执行到此处时已经被提前定义过了。
	//如果这里有任何错误或正常的错误处理将会被触发。
	//这个函数将不会被执行。
	//否则将会在终端打印以下字符串。
	console.log("User's name is " + req.user);
});
```
#####`router.get([path], function)`使用
	具体内容，容我缓缓再加进来。

**栗子：**		

```
router.get('/users/:user_id', function(req, res, next){
	//当跳转到'/users/用户id'的页面时，所要进行操作并回传给客户端。
	res.send('回传给客户端的内容。');
});
```

```
router.get('/', function(req, res){
	res.render('index', {title: 'Express'});
});
```

上述代码的意思是，当访问主页的时候，调用ejs模板引擎，将title变量全部替换成为字符串Express，生成静态页面并且显示在浏览器当中。

####module.exports
**`module.exports`的作用是导出一个函数接口，然后在其他运行的主文件中通过`require`加载调用。**
