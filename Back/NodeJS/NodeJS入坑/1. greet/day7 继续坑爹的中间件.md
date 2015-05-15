#day7 继续坑爹的中间件
###2015-05-14

对于Node的了解越多，越发现自己的无知。

####module.exports

module.exports 的作用是为了将单独文件中所建立的函数方法，可以令其他应用使用。这样的优点是可以使不同功能的模块相互独立，让不同的功能分别存放在不同的目录当中。可以通过`require`来调用模块功能。

```
// module.js

module.exports = module_fun;

function module_fun(para){
	// ToDo;
}
```

调用模块使用通过`require`

```
var module = require(相对路径 + ‘/module.js’);

```
`require`中调用相对路径 + 文件名.js (或者文件名)就可以调用模块。

当然以上是一个文件中只可以调用出一个模块，还有可以一个文件中同时有多个模块被调用,可以通过`export`。

```
//export.js

export.readFile = readFile;
function readFile(para){
	//TODO
}

export.writeFile = writeFile;
function writeFile(para){
	//TODO
}
```
可以把`export`理解为将整个文件作为了一个对象模块，其中的若干个函数方法作为对象中的方法。

```
var module = require('export.js')
module.readFile('textread.txt');
module.writeFile('textwrite.txt');
```
####中间件的模块创建

作为中间件，是被应用在Node的`connect.use`当中的，它会被传递三个参数`req, res, next`分别对应**请求， 回应， 继续下步**。所以我们生成的中间件函数模块也应该对应这几个参数。

**基本模板如下，可以根据需求来对应添加：**

```
// middleware.js

module.exports = middleware;

function middleware()
{
	return function(req, res, next){
		//TODO
	}
}
```


####path
`path`作为Node中的常用模块，其中有些功能感觉非常顺手，而且很强大。
今天的代码中用到了其中的 extname和basename。

```
var path = require('path');

var extname = path.extname('index.html');
//上述方法是返回文件的后缀名，此处返回的是‘.html’, 同理/usr/Desktop/text.txt 返回的是‘.txt’

var chgname = path.basename('index.html', '.html');
/*
	与上面那种相反，它返回的是index。
	今天用它来做后缀名转换，得到的结果去使用jade模板。
*/
var jadename = path.basename('index.html', '.html') + '.jade';
//所以返回结果为index.jade
```

####serve-Static

```
var statiServe = require('static-serve');
```

//我自己都没弄的太明白，欠着.....

####fs
fs是Node的文件操作模块，今天的开发我只用到了其中的`fs.readFile()`方法。

```
var fs = require('fs');

fs.readFile('filename', {encoding: 'utf8'}, function(err, data){
	if(err){
		//如果没有这个文件或读取时出现了问题，可以根据情况来操作。
	}
	
	//相反，则可以选择操作读取到的数据data，或者进行其他操作。
	//TODO....
});

// fs.readFile()函数中可以包含三个参数，文件名，选项操作和回调函数方法。
// 我们对读取到数据的操作或者错误处理操作都在回调函数中进行。
// 其中的选项可以是不写的，但是此时读取到的数据流式以二进制形式存储。
```


####jade API

```
var jade = require('jade');

var html = jade.render('string hello world');
//jade这个引擎会传入的模板数据代码转换成标准的HTML文档格式。
//此次模块的编写用jade.render()和fs.readFile()这对好基友搭配使用的。
//返回的html内容是<string>hello world</string>

fs.readFile('index.jade', {encoding: 'utf8'}, function(err, data){
	if(err){
		res.writeHead(404, {});
		next();
		//跳到下一步进行错误处理，或者干脆直接报错。
	}
	var html = jade.render(data);
	res.writeHead(200, {
		'Content-Length' : html.length,
		'Content-Type' : 'text/html; charset=UTF-8'
	});
	res.end(html);
});
```

####less API

```
//less 的render方法与jade的render方法区别在于：
//less.render(filename, callback),直接在其中执行就好。

var less = require('less');

fs.readFile('index.less', {encoding: 'utf8'}, function(err, data){
	if(err){
		res.writeHead(404, {});
		next();
		//跳到下一步进行错误处理，或者干脆直接报错。
	}
	less.render(data, function(err, output){
		res.writeHead(200, {
			'Content-Length' : output.length,
			'Content-Type' : 'text/css; charset=UTF-8'
		});
	})
	res.end(html);
});
```