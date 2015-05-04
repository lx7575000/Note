#构建一个 npm package
###Node.JS

####2015.05.04

本文想要构建一个简单的npm package。这个包会建立一个问候命令。

```
$ greet liuxin
hello, liuxin
```

当然，如果这个命令有更多的参数，它可以：

```
$ greet liuxin --drunk
hello, liuxin, you look sexy today.
```

###生成package.json文件
可以通过`npm init`命令生成一个package.json文件如下：

```
{
  "name": "greet",
  "version": "0.0.0",
  "description": "echo \"Error: no test specified\" && exit 1",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "keywords": [
    "hello-world"
  ],
  "author": "Howard Yeh",
  "license": "MIT"
}
```

**注：** 其中的author，可以通过以下方式来设定默认作者。

```
npm set init.author.name "liuxin"
npm set init.author.email "liu_narcisus@xxx.com"
npm set init.author.url "https://github.com/lx7575000"
```

###生成Greet 模块

建立与上面的**package.json**中**main**相对应的**index.js**文件。

```
index.js

function greet(name){
	return "hello, " + name;
}

```

因为在**package.json**中进行过声明，所以我们可以通过require()来调用这个模块。

**我们可以通过以下几种方式来使用**
```
$ node -e 'console.log(require("./index.js"))'

$ node -e 'console.log(require("./index"))'

$ node -e 'console.log(require("./"))'


以上三种方式都可以调用到index.js，将它当做模块来使用。
```

###将该项目当做包来进行安装
**以上的三种调用方法，你在本节之前使用会发现报错，这是因为我们在此之前需要使用`npm link`来进行声明安装。**

为了能够使`npm link`能正常工作，我们需要先设定NODE_PATH环境变量。它决定了require方法去哪里寻找全局模块。

```
环境： OS X系统

$ export NODE_PATH = /usr/local/lib/node_modules
```
通过该命令，来进行宏定义。以后我们使用`npm link`就会默认的将符号链接放入到**/usr/local/lib/node_modules**这个文件夹当中。

**链接模块**

```
$ npm link
/usr/local/lib/node_modules/greet -> /Users/liuxin/Desktop/besike-nodejs-greet/greet
```

**卸载模块**

```
$ npm unlink -g greet	
unbuild greet@0.0.0
```

如果希望在其他的项目中调用我们的greet模块，则应该使用**module.exports**来进行声明。

```
//file : index.js

module.exports = function greet(name)
{
	return 'hello, ' + name;
}
```

###建立Greet包

我们可以通过使用`npm pack`的方式来生成一个package

```
$ npm pack
greet-0.0.0.tgz
//会生成一个压缩包
```

我们可以观察到，其中的文件就是原有的文件。

```
$ tar -ztf greet-0.0.0.tgz
package/package.json
package/index.js
```

```
npm install greet-0.0.0.tgz
//安装模块

npm uninstall greet
//卸载模块
```

###创建一个可执行的命令行`greet`

我们希望直接使用`greet`作为命令行来使用。

因此我们需要添加一行内容到**package.json**当中

```
// in package.json
"bin" : { "greet" : "./bin/greet.js" }
```
它指明，当我们将package安装了后。该脚本文件：`./bin/greet.js`就可以作为命令来使用**greet**。

我们先创建一个入门版本的：

```
// file : ./bin/greet.js

#!/usr/bin/env node
The first line is a shebang directive. It's a way for the computer to know how to run the script as a program.
console.log("Hello World");
```

`#!/usr/bin/env node`是shebang命令，它的作用是告诉计算机像程序一样来运行该脚本。

(Why do we use /usr/bin/env instead of the node command? Because the node executable can be at different places on different systems, and the env uses the environment's PATH to figure out which node program to run.)

更改权限：

```
$ chmode a+x bin/greet.js
```

现在我们可以执行该脚本了：

```
$ ./bin/greet.js
Hello World
```

如果我们希望它能如同命令行一样运行，则需要预先将它链接。(切记，要先卸载，再重新链接。)

```
$ npm link
/usr/local/bin/greet -> /usr/local/lib/node_modules/greet/bin/greet.js
/usr/local/lib/node_modules/greet -> /Users/liuxin/Desktop/besike-nodejs-greet/greet
```

```
$ greet
Hello World
```