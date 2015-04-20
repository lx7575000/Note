#AngularJS 单页面应用的路由和模板
###2015-04-15

###文件结构
```
 - script.js             <!-- 存放我们的AngularJS代码 -->
    - index.html            <!-- 单页面的布局 -->
    - pages                 <!-- 存放各个单页面的布局 -->
    ----- home.html
    ----- about.html
    ----- contact.html
```

###index.html页面内容

```
<!-- index.html -->
    <!DOCTYPE html>
    <html>
    <head>
      <!-- SCROLLS -->
      <!-- load bootstrap and fontawesome via CDN -->
      <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" />
      <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.css" />

      <!-- SPELLS -->
      <!-- load angular and angular route via CDN -->
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js"></script>
          <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.js"></script>
      <script src="script.js"></script>
    </head>
    <body>

        <!-- HEADER AND NAVBAR -->
        <header>
            <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">Angular Routing Example</a>
                </div>

                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#"><i class="fa fa-home"></i> Home</a></li>
                    <li><a href="#about"><i class="fa fa-shield"></i> About</a></li>
                    <li><a href="#contact"><i class="fa fa-comment"></i> Contact</a></li>
                </ul>
            </div>
            </nav>
        </header>

        <!-- MAIN CONTENT AND INJECTED VIEWS -->
        <div id="main">

            <!-- angular templating -->
            <!-- this is where content will be injected -->

        </div>

    </body>
    </html>

```

在`li`标签当中我们来连接各个分页面。可以观察上面的代码注意到我们会使用`#`来声明这些是要连接的分页面代码块。

###写JS代码

```
var myApp = angular.module('myApp', []);
//先创建app主模块
  myApp.controller('mainController', ['$scope', function($scope){
    //创建controller,作为上游的Controller。方便与后面的分页共享一些数据
    $scope.message = 'Everyone come and see how good I look !';
  }]);

```

分别在`html`标签和`body`标签上加上`ng-app`和`ng-controller`,然后分别给他们加上**myApp**和**mainController**.

接着在`id`为**main**的`div`标签块中加入`{{message}}`,引用**mainController**中的message。

###注入单页面到主页面
`ng-view`作为AngularJS的命令，它的作用是将当前路径的模板页面包含到主页面当中。就是将分页面的代码段根据路由命令实时的包含到主页面当中。

我将会添加`ng-view`代码到页面的`div#main`当中，用于告诉AngularJS在哪里放入分页面。

```
<div id="main">

        <!-- angular templating -->
        <!-- this is where content will be injected -->
        <div ng-view></div>
</div>
```

###设定路由和分页面

设定路由，我们此次选择用ngRoute来完成。**切记，一定要将ngRoute依赖注入**

```
myApp = angular.module('myApp', ['ngRoute']);

  myApp.config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
      })
      .when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
      })
      .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
      });
  });
```

根据上面的代码我们可以看到，我们定义路由使用的是`$routeProvider`。我们可以通过它来指定具体的路径，然后AngularJS会到指定位置来查找模板文件代码。当然，也可以通过它来具体指定该页面所要包含的控制器。