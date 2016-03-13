#建立 Express 程序

###2015-05-16

### **提醒：**

通过创建`app.listen`方法来启动一个http服务器。它应该返回一个`http.Server` 。

####mocha JS单元测试工具

<a href='http://www.alloyteam.com/2013/12/hour-class-learning-costs-javascript-unit-testing-tool-matcha-mocha-and-chai/'> 关于mocha的简单入门资料，人家已经讲的很好了</a>


<a href='https://mochacn.github.io/'>mocha的Github地址（中文版）</a>

####supertest测试

**需要先下载package**

```
npm install supertest --save
```

**mocha 用例中使用supertest：**

<a href='https://github.com/visionmedia/supertest'>supertest 源地址</a>

```
var request = require('supertest');
var expect = require('chai').expect;
var express = require('express');

var app = express();

describe('app', function(){
	describe('as handler to http.createServer', function(){
		it('tresponds to /foo with 404', function(done){
			request(app)
					.expect(404, done);
		});
	});
});

```

如上述代码可以直接在得到的request中调用函数方法，或http.Server。

**supertest**中可以添加要调用的方法，后面通过`get`方法来请求想要调用的页面，然后再通过**chai框架中的**`expect`方法，来实现数据对比;最后通过`end`方法来结束测试。

```
request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
```
**request中也可以直接请求访问具体的URL地址。**

```
	request("http://localhost:7000")
			.get("/foo") 
			.expect(200)//期望返回正常结果
			.end(done())
```
####chai框架


####中间件

####Layer模块(对于中间件的封装)

`Layer`模块就是对中间件的封装，其中包括了请求的路径位置和处理函数方法：

```
function Layer(route, fn){
	this.path = route;
	this.handle = fn;

	this.match = function(route){

			if(this.path === route){
				
				return {path : this.path};
			}else if(route.substr(0, this.path.length) === this.path){

				return {path : this.path};
			}else{

				return undefined;
			}
		}	
}


```

`string.substr(start, num)`可在字符串中抽取从 start 下标开始的指定数目的字符

其中用到了`substr()`方法，用于判断所要访问的路径与我们`app.stack`中`layer.path路径`对比判断。

即, 

```
var Layer = require('./lib/layer.js');

var layer = new Layer('/foo', function(){});
layer.match("/foo/bar") // => {path: "/foo"}
```

###对于构造函数的重新理解(由于写layer.js出现的理解错误)

**所以我要写这一节加深理解。（so 丢脸.....)**

###path-to-regexp

该模块用于将一个Express风格的字符串，例如`/user/:name`转变成正常的表达式。

安装：

```
npm install path-to-regexp --save
```

```
var pathToRegexp = require('path-to-regexp');
// pathToRegexp(path, keys, options);
```

**path:** 路径字符串，或者存放路径的数组。		
**keys:** path路径字符串解析出来按照类型进行分类。   
**options:**
 				
		 1. sensitive When true the route will be case sensitive. (default: false)		
		 2. strict When false the trailing slash is optional. (default: false)		
		 3. end When false the path will match at the beginning. (default: true)

```
var keys = [];
var re = pathToRegexp('/foo/:bar', keys);
/*
{ /^\/foo\/([^\/]+?)(?:\/(?=$))?$/i
	//上面是re内容，下面为keys内所存放的内容。
  keys:
   [ { name: 'bar',
       prefix: '/',
       delimiter: '/',
       optional: false,
       repeat: false,
       pattern: '[^\\/]+?' } ] }
*/
```

提取传递来的参数值	

```
var re = pathToRegexp('/:foo/:bar', keys);
var res = re.exec('/abc/def');
//re.exec返回了匹配的情况
//如果匹配成功会返回[ '/abc/def', 'abc', 'def', index: 0, input: '/abc/def' ]
//如果匹配失败返回的为null，所以可以通过返回值来判断是否匹配成功。
```
####可选符号
如果在参数的末尾添加`?`后缀，可以使该参数为可选项。

```
var re = pathToPath('/:foo/:bar?', keys);

var res = re.exec('/abc/');
//此时后面一个参数值被默认为undefined
```

也可以在末尾添加`*`后缀，意为参数数目可能为0或多个。

```
var re = pathToRegexp('/:foo*', keys);
// keys = [{ name: 'foo', delimiter: '/', optional: true, repeat: true }]

re.exec('/');
//=> ['/', undefined]

re.exec('/bar/baz');
//=> ['/bar/baz', 'bar/baz']
//此时参数值默认为bar/baz
```
也可以在末尾添加`+`后缀，意为参数数目可能为1个或多个。

```
var re = pathToRegexp('/:foo+', keys);
// keys = [{ name: 'foo', delimiter: '/', optional: false, repeat: true }]

re.exec('/');
//=> null
//当传入参数数目为0时，可以看到返回表示错误。

re.exec('/bar/baz');
//=> ['/bar/baz', 'bar/baz']
```

可以定制要求传入参数的类型或大概格式通过`/:foo(\\d+)`如此方式定制要求传入参数为1个或多个数字类型，如果不匹配就会返回null。

```
var re = pathToRegexp('/:foo(\\d+)', keys);
// keys = [{ name: 'foo', ... }]

re.exec('/123');
//=> ['/123', '123']

re.exec('/abc');
//=> null
```

它的功能不仅仅如此，还可以定义传送多个未命名参数。添加`(.*)`表示后面有0个或者多个参数传入。

```
var re = pathToRegexp('/:foo/(.*)', keys);
// keys = [{ name: 'foo', ... }, { name: '0', ... }]

re.exec('/test/route');
//=> ['/test/route', 'test', 'route']
```

####decodeURIComponent(url)