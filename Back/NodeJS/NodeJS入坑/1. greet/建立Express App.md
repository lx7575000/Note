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

