#Grunt 简单介绍
####2015-04-09

###关于 Grunt
关于Grunt的介绍，我就不自己写了。反正网上对于它的介绍一大把：
	
	为何要用构建工具？
	一句话：自动化。对于需要反复重复的任务，例如压缩（minification）、编译、单元测试、linting等，自动化工具可以减轻你的劳动，简化你的工作。当你正确配置好了任务，任务运行器就会自动帮你或你的小组完成大部分无聊的工作。
	
**以上的功能，Grunt都能做到。**

###开始构建Grunt
首先你需要有一整套支持Grunt运行的环境，他们将在后面具体写出，反正都是放在了package.json当中，由npm一同搞定就好。	
然后作为简单介绍，我们同样需要有实例演示，这样才够酸爽。下面给出**文件结构树状图**，读者小伙伴，可以根据要求先搭出空壳子，我们后面会一一把他们填满。

```
- dist              
// 用于存放所有压缩过的生成文件
----- css
----- js
- src               
// 用于存放原生文件
----- css
---------- style.css
---------- pretty.less
----- js
---------- magic.js
Gruntfile.js        
// 我们的Grunt代码就写在这里的哦
package.json        
// 满满的Node.js风格啊。具体是什么不在此篇文章中详述。只需知道，npm需要通过读其中的dependences来安装下载依赖环境模块。

```

###先找支援--Grunt所需的各种模块
当我们使用**npm**来进行包管理的时候,我们需要把我们的物资清单和基本情况介绍都写在**package.json**。下面我们会列出，简单的使用Grunt当中我们所必需各种依赖模块。

```
{
  //项目名称
  "name": "grunt-getting-started",
  //版本号基本可以忽略的，至少目前我还没感觉到它的用处何在
  "version": "0.1.0",
  //重头戏，我们需要依赖的各个文件，以及它们各自的版本号
  //具体这些模块的功能我们会在后面一一说明。
  //表着急，可以先copy过来使用好了。
  "devDependencies": {
    "grunt": "~0.4.4",
    "grunt-contrib-jshint": "latest",
    "jshint-stylish": "latest",
    "grunt-contrib-uglify": "latest",
    "grunt-contrib-less": "latest",
    "grunt-contrib-cssmin": "latest",
    "grunt-contrib-watch": "latest"
  }
}
```
####机智的剽窃来的小表格-认真好学的孩子可以看看
<div class="table-responsive">
<table class="table table-bordered table-striped table-hover">
<thead>
<tr>
<th>
              Plugin
            </th>
<th>
              Description
            </th>
</tr>
</thead>
<tbody>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-jshint" target="_blank">contrib-jshint</a>
            </td>
<td>
              Validate files using jshint
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-uglify" target="_blank">contrib-uglify</a>
            </td>
<td>
              Minify JS files using UglifyJS
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-watch" target="_blank">contrib-watch</a>
            </td>
<td>
              Run tasks whenever watched files are changed
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-clean" target="_blank">contrib-clean</a>
            </td>
<td>
              Clean up files and folders
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-copy" target="_blank">contrib-copy</a>
            </td>
<td>
              Copy files and folders
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-concat" target="_blank">contrib-concat</a>
            </td>
<td>
              Combine files into a single file
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-cssmin" target="_blank">contrib-cssmin</a>
            </td>
<td>
              Compress CSS files
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-less" target="_blank">contrib-less</a>
            </td>
<td>
              Compile LESS files to CSS
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-imagemin" target="_blank">contrib-imagemin</a>
            </td>
<td>
              Minify PNG, JPG, and GIFs
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-compass" target="_blank">contrib-compass</a>
            </td>
<td>
              Compile SASS to CSS using Compass
            </td>
</tr>
<tr>
<td>
              <a href="https://www.npmjs.org/package/grunt-contrib-htmlmin" target="_blank">contrib-htmlmin</a>
            </td>
<td>
              Minify HTML files
            </td>
</tr>
</tbody>
</table></div>

当我们把package.json搞定之后，我们就可以调用终端在当前页面中输入命令：		

`npm install`

接下来你可以跟着我们先继续后面的内容，让**npm**苦逼的为你继续奔跑吧。它会将我们所学要的各种依赖分门别类的下载到node-modules文件夹当中，等待您的**临幸**。

###开始翻牌Gruntfile

在前文中我们有列出文件树状图，我们开始搞定我们的简单项目中所必须的部分东西--**Gruntfile.js**。

```
module.exports = function(grunt) {

   grunt.initConfig({
 
    pkg: grunt.file.readJSON('package.json'),

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

};

```

`module.exports = function(grunt){}`		

上面的代码是使用了Node得方式，使我们的代码设置可以暴露给**其他的应用**使其可以进行调用。


`grunt.initConfig({})`		

该方法是用于初始化配置我们所需要的各类模块的使用。当然，在现在，我们仅仅是用它来读取package.json中的各类配置信息，并且将它们存储到`pkg`当中。然后我们就可以在此处来使用package.json当中的各项数据了。		

**栗子：**		
比如我们可以调用`pkg.name`或者使用`pkg.version`.如果我们在package.json中所储存的东西越多，我想我们的可操作性会更多的。

`grunt.loadNpmTasks()`

这个函数的作用相比可以直接通过函数名就弄明白大概了吧。没错，就是用于加载我们通过npm下载个各个包模块。

**下面我们开始细致的讲解各个基础模块的分工。**

####第一块: `jshint`
```
grunt.initConfig({

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') 
        // 使用 jshint-stylish 来使我们报错能够被人看懂
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js']
    }

});
```

上面就是在`initConfig`当中的编写格式：		

* 首先声明我们需要调用的是哪个包（jshint）
* 然后设定可选项，这个在此不做详述，因为我目前也是菜鸟一枚不是很清楚具体都能干什么
* 创建**build**属性（属性名是任意的，在此只是为了更容易明白才如此设置），并且向其中加入我们所期望的文件活文件夹。

**注：** \**符号用于表示所有文件夹， \*符号用于表示所有文件名。


`jshint`的作用是**Debug**。没错，就是用来做查报错的功能。

为了能够演示该模块，我们向/src/js/magic.js当中写入代码：

```
// src/js/magic.js

var hello = 'look im grunting!'

var awesome = 'yes it is awesome!'

```

然后我们键入命令行`grunt jshint`，然后神奇的一幕出现了。我们会看见它会报错：**你忘记写分号了**。好吧，我们赶紧把错误改正，接着继续。。。

####第二块: `uglify`
`uglify`模块的作用是压缩我们的javascript文件。

```
uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/magic.min.js': 'src/js/magic.js'
        }
      }
    }
```

`banner`是一个可选项，其作用是在我们生成的新文件的首部加入我们所设定要求的字符串。比如此处我们所想要的就是**生成文件名+文件的生成日期**

在`build`的`files`当中，**'dist/js/magic.min.js'**是我们希望生成的目标文件，后面的则是源文件。	
如果希望将多文件，压缩生成在同一个文件当中。则后面应该将多文件加入在一个数组当中。		
**栗子：**

```
'dist/js/magic.min.js': ['src/js/magic1.js', 'src/js/magic2.js]
```

通过命令行键入：`grunt uglify`然后神奇的一幕再次出现，我们会发现真的生成了一个新文件。有心的小伙伴可以查看生成文件的大小，然后和源文件进行对比。

####第三块：`less`
`less`将less文件大变活人一样重新变回css文件。

```
 // compile less stylesheets to css -----------------------------------------
less: {
      build: {
        files: {
          'dist/css/pretty.css': 'src/css/pretty.less'
        }
      }
    }
```

```
/* src/css/pretty.less */

@red        : #CC594A;
@yellow     : #B8CC24;
@blue       : #8BC5FF;
@purple     : #6F3596;

body        { 
    background:@red;
    color:@yellow;
}

button      {
    background:@blue;
}

div         {
    background:@purple;
}
```

运行命令`grunt less`然后就会通过less文件生成对应的css文件。

```
/* dist/css/pretty.css */

body {
  background: #cc594a;
  color: #b8cc24;
}
button {
  background: #8bc5ff;
}
div {
  background: #6f3596;
}

```

####第四块： `cssmin`
`cssmin`是用来压缩css文件。

```
 cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'src/css/style.css'
        }
      }
    }
```

运行`grunt cssmin`就会生成一个style.min.css文件

####同时运行多任务： `grunt commandname（自己设定）`
**切记，这个不是写在initConfig当中的，是写在外面和其并列的。**

```
grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less']); 
```

现在我们运行命令：`grunt`
由于该任务的属性是**default**所以后面不需要添加任务名神马的东西，直接上。

如果要根据不同情况来跑不同模式的任务，则需要根据不同的情况来进行设定代码：

**Let's have a look !**

```
uglify: { 
    options: { 
      banner: '/\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n/\n' 
    }, 
    dev: { 
      files: { 'dist/js/magic.min.js': ['src/js/magic.js', 'src/js/magic2.js'] } 
    }, 
    production: { 
      files: { 'dist/js/magic.min.js': 'src/**/*.js' } 
    } 
  }
```

以上只是列出了一个模块的编写形式，想要创造不同的多任务运行模式，需要各自进行编写。

```
grunt.registerTask('dev', ['jshint:dev', 'uglify:dev', 'cssmin:dev', 'less:dev']);

  // only run production configuration 
  grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production']);

```

现在我们又加入了两种其他类型的多任务运行模式，此时我们如果想要运行则命令形式分别为：

`grunt dev` 和 `grunt production`
**前提是你要在各个模块中写出相对应的内容，如上例的`uglify`**


####最后一个模块： `watch`
持久运行，用于观察文件变化，然后进行编译。类似于`nodemon`的功能。

```
watch: {
  
  // for stylesheets, watch css and less files 
  // only run less and cssmin stylesheets: { 
  files: ['src//*.css', 'src//*.less'], 
  tasks: ['less', 'cssmin'] },

  // for scripts, run jshint and uglify 
  scripts: { 
    files: 'src/**/*.js', tasks: ['jshint', 'uglify'] 
  } 
}

```

现在运行 ： `grunt watch`

然后你会发现满满的使用**nodemon**的即视感。

###总结：
写完了。其实内容不是很多，只是可以帮大家简单的了解Grunt的一小部分，如果有兴趣深入的可以去查找资料自行了解，记得有好内容可以也给我发一份啊。共同学习进步。

Email： liu_narcisus@163.com
