#Connect源码剖析中自身理解
###2015-05-18


```
var server = http.createServer(app);

server.listen(4000);
```

`http.createServer(app)`中的app其实就是一系列我们在访问这个端口时所必须要调用的方法(中间件)集合。

###`express`的错误处理

`express`中如果要通过**中间件**进行错误处理,需要在原来`req, res, next`的基础之上再加入一个`err参数`，顺序为：

```
function(err, req, res, next){
	//To Handle Error
	//如果还要加入其他错误处理中间件
	next(err);
}
```

**例：**

```
var app = express();
//错误产生的中间件
	app.use(function(req, res, next){
		var error = new Error('it is a error');
		next(error);
	})
	.use(function(req, res, next){
		//由于没带err参数，所以这个中间件不进行错误处理，会被跳过
		//TODO something that not handle error
	})
	
	.use(function(err, req, res, next){
		//To handle Error
		//如果没有处理好，可以继续进行错误处理
		console.log('first handle error ');
		next(err);
	})
	.use(function(err, req, res, next){
		//To handle Error
		//承接上面next(err)传下来的错误，继续进行错误处理
		console.log('second times handle error');
		res.end('Finally handle the error !!');
	})
```

###createServer模块


###use模块

```
app.use = function(route, fn){
		if(! fn){
			var middleware = route;
			var path = '/';
		}else{
			path = route;
			middleware = fn;
		}
		app.stack.push({'route' : path, 'middleware' : middleware});
		if(middleware.isMiddleWare  != undefined){
			middleware.isMiddleWare = true;
		}
		return app;
	};
```

`app.use`模块中默认会传入两个参数，其中`route`是希望请求的路由位置，`fn`是希望加入其中的中间件。
如果，我们值传入了中间件函数，则会在函数内进行验证判断是否具有两个参数传入。只有一个中间件，就默认路由请求路径为默认的**' / '**。

然后将中间件模块，和对应的请求路由路径组成一个对象传入`app.stack`数组当中。

```
app.stack.push({'route' : path, 'middleware' : middleware});
```

最后，给传入其中的中间件`middleware`添加一个**isMiddleWare**属性，通过它来**判断**是否是中间件。

**最后返回app对象本身就好了。**


###handle模块
handle模块的作用就是执行app.stack中的中间件。
如下，当我们通过`http.createServer(app)`的时候，其实就是执行了`app.handle`来进行顺序执行中间件。

```
	//app()就是按顺序执行app.stack当中的各项中间件
	var app = function(req, res, next){
		app.handle(req, res, next);
	};
```

如下为`app.handle`的实现：

**注：函数名.length 返回的是这个函数允许传入的参数个数。**

```
	app.handle = function(req, res, next){
		var handle = app;
		var middleware_index = 0;
		//middleware_index的作用是记录当前执行到哪个中间件
	
		//神器的next函数
		(function next(err){
			if(hasAnyMiddlewareToExcute()){
				try{
					callMiddleWare();
				}catch(e){
					endWithStatusCode(500);
				}
			}else if(handle.isMiddleWare){
				next(err);
			}else{
				if(err){
					endWithStatusCode(501);
				}else{
					endWithStatusCode(404);
				}
			}


			//通过middleware_index来判断是否执行完成所有的中间件
			function hasAnyMiddlewareToExcute () {
				// console.log('hasAnyMiddlewareToExcute');
				return middleware_index < handle.stack.length;
			}
			//对http状态码传送的封装。
			function endWithStatusCode(num){
				// console.log('endWithStatusCode : ' + num);
				res.statusCode = num;
				res.end();
			}

			//根据各个中间件的情况不同来进行不同的处理
			function callMiddleWare(){
				var current_layer = handle.stack[middleware_index];
				// console.log('callMiddleWare');
				var arity = current_layer.handle.length;
				
				if(err && arity === 4){
					// console.log('4 parameter');
					//判断当前的函数是否传入四个参数，产生错误，且是否与路径匹配。符合参数四个的要求。
					middleware_index ++;
					current_layer.handle.call(this, err, req, res, next);
				}else if(!err && arity < 4){
					//没出错，且传入的是三个参数。刚好符合传入三个参数的要求。
					// console.log('3 parameters');
					middleware_index ++;
					current_layer.handle.call(this, req, res, next);
				}else{
					// console.log('next error');
					middleware_index ++;
					next(err);
				}
			}
		})();
	};
```

###next模块

看了上面的handle你可能会发现这个`next`函数方法，其实就是包含在其中的。`next`的作用很简单，就是为了根据不同情况来调用**app.stack**中存储的中间件方法。

```
(function next(err){
			//	判断是否执行到了最后
			if(hasAnyMiddlewareToExcute()){
				try{
					//如果没有，就继续尝试执行，并要防止错误的出现。
					callMiddleWare();
				}catch(e){
					//出现错误不可怕，catch抓住它，抛出异常返回http的500状态码。
					endWithStatusCode(500);
				}
			}else if(handle.isMiddleWare){
				//此时的中间件状态为true，且已经执行到了最后，再进行跳转进行后面操作。
				next(err);
			}else{
				//是错误，就返回500状态码
				if(err){
					endWithStatusCode(500);
				}else{
				//不是错误就返回404码
					endWithStatusCode(404);
				}
			}

			//通过middleware_index来判断是否已经执行到最后的位置
			function hasAnyMiddlewareToExcute () {
				// console.log('hasAnyMiddlewareToExcute');
				return middleware_index < handle.stack.length;
			}

			function endWithStatusCode(num){
				// console.log('endWithStatusCode : ' + num);
				res.statusCode = num;
				res.end();
			}

			//根据各个中间件的情况不同来进行不同的处理
			function callMiddleWare(){
				var current_layer = handle.stack[middleware_index];
				// console.log('callMiddleWare');
				var arity = current_layer.handle.length;// 错误！！！

				if(err && arity === 4){
					// console.log('4 parameter');
					//判断当前的函数是否传入四个参数，产生错误，且是否与路径匹配。符合参数四个的要求。
					middleware_index ++;
					current_layer.handle.call(this, err, req, res, next);
				}else if(!err && arity < 4){
					//没出错，且传入的是三个参数。刚好符合传入三个参数的要求。
					// console.log('3 parameters');
					middleware_index ++;
					current_layer.handle.call(this, req, res, next);
				}else{
					// console.log('next error');
					middleware_index ++;
					next(err);
				}
			}
		})();
```


###call模块

`call`模块也是封装在`app.handle`当中的。根据中间件传入参数的不同来分别选择不同方法进行处理。

```
//根据各个中间件的情况不同来进行不同的处理
function callMiddleWare(){
				var current_layer = handle.stack[middleware_index];
				// console.log('callMiddleWare');
				var arity = current_layer.handle.length;// 错误！！！

				if(err && arity === 4){
					// console.log('4 parameter');
					//判断当前的函数是否传入四个参数，产生错误，且是否与路径匹配。符合参数四个的要求。
					middleware_index ++;
					current_layer.handle.call(this, err, req, res, next);
				}else if(!err && arity < 4){
					//没出错，且传入的是三个参数。刚好符合传入三个参数的要求。
					// console.log('3 parameters');
					middleware_index ++;
					current_layer.handle.call(this, req, res, next);
				}else{
					// console.log('next error');
					middleware_index ++;
					next(err);
				}
			}
```

###listen模块

是对`http.createServer`的封装。将`app`放入`http.createServer`当中，存储进变量`Server`，然后返回。

```
app.listen = function(port){
	var server = http.createServer(app);
	server.listen(port);
	return server;
}
```
