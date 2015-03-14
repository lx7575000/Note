#AngularJS 必须注意的Tips

####2015-03-05


###About:`angular.module()`


<p>为了防止全局作用域被污染，所以我们定义controller或者directive的时候。最好使用将module赋值给变量或者具体的将controller和directive统一进行定义或者赋值。
</p>
<br>
**比如：**<br>
<pre>
var app = angular.module('myApp', []);
app.controller('MyController',['$scope', function($scope){
	return {                                                   
		some value or function 
	}
}]);
</pre>
<br>
或者：
<pre>
	angular.module('myApp', ['myApp1.controller', 'myApp.controller2']);
	angular.module('myApp').controller('MyController', 	['$scope', function($scope){
		return {
			//return some function
		}
	}]);
	angular.module('myApp').directive('myDirective', ['$scope', function($scope){
		return {
			restrict: 'EA',
			replace: true,
			template:  ......
		}
	}]);
</pre>
再或者：<br>
<pre>
	angular.module('myApp', ['myApp1.controller', 'myApp.controller2']).
	controller('myController', ['$scope', function($scope){
	return{
		//attribue	
	}
	])
	.directive('myDirective', ['$scope', function($scope)
	{
		return {
			restrict: 'EA',
			replace: true,
			template:  ......，
			transclude: true,
			templateUrl:.....
		}
	}]);
</pre>
* **注意，使用第二种推荐方法时，在调用module时候，第二个参数除了第一次声明时要加以外，后面都不可以再添加。否则就是重定义，而不是使用已经声明存在的模块了**
<hr>
###AngularJS `$scope`
<hr>

* **scope是一种空白的Javascript对象容器，其中可以存储属性和方法**
####Angular中的$scope
	AngularJS会为我们自动的为创建并注入 scope。
	
* AngularJS 中的 scope 可以非常便捷的用于保存 用于在View页面绑定显示的 model 值（类似于ng-model）。

* 每个AngularJS 的 app 中必然存在`根scope`即 `$rootScope`.可以理解为C++中的基类，所有后面定义的Controller中的scope在没有隔离scope的前提下(即 **directive 方法**中的 `scope: []`)，都可以通过JS的向上追朔原型链来访问`rootScope`中所存储的方法和数值。

	可以理解为rootScope 是所有scope的parent。
<hr>
####About : `$scope`	 in  `controller` 	
* 当在**controller**中返回的**function**中有`$scope`参数时，AngularJS会通过推断来在**controller**中创建新的scope空间。

例：		
<pre>
	angular.module('myApp', [])
	.controller('myController', function($scope){
		$scope.tmp = ...
		...
	});
</pre>
<hr>

####观察者`$watch` in `$scope`
`$scope.$watch()`有三个参数	：		
* 第一个参数是需要观察或者说监听的模块或方法。
* 第二个参数是回调函数，用于当AngularJS发现所监听的方法或模块发生改变时能够进行调用。		
		
		回调函数也存在两个参数，分别是新值newValue和旧值oldValue。

* 第三个参数是一个可选参数：objectEquality
	
**另注：**	
`$scope.$watch()` 返回的是一个函数。
	
可以通过将返回的函数赋值给一个对象，来减少使用`$scope.$watch()`这个表达式。	
**例：**
<pre>
var unbindWatcher=$scope.$watch('wishListCount',function (newValue,oldValue){          console.log('called '+newValue+' times');          if(newValue==2){alert('Great! You have 2 items in your wish list. Time to buy what you love. ');});    unbindWatcher();}
</pre>

<hr>
####数组变量观察者`$watchCollection()`函数
	同上一方法没多大差别。只不过将单个变量或方法，变为了观察集合是否改变。

<pre>
$scope.$watchCollection('myCollection',function(newCollection, oldCollection){    //handle the change    console.log(newCollection); //print new collection});
</pre>

<hr>
####`$routeProvider` 的 `when()`方法

该方法具有两个参数，分别为**route name** 和 **route definition object**。

	第一个参数用于表示该路径， 第二个参数则是用于说明该路径的各种细节。
	其中最常使用的属性为：		
		controller： 用于与该路径页面相绑定。
		templateUrl： 显然用于说明该页面模板所存放的路径位置。

**注* 关于`controller` 是可选的，对于其与模板相联系也可以在页面中通过 ng-controller来相连。**	
**另注* `routeProvider`定义在ngRoute 模块中，该模块并不在angular.js文件中而是被分到了angular-route.js文件中。同时需要将ngRoute模块依赖注入到模块`module`当中**		
##### `html5Mode`
<pre>
angular.module('myApp').config(function($routeProvider, ➥$locationProvider){});$routeProvider.when('/view1',{    controller:'Controller1',    templateUrl:'partials/view1.html'}).when('/view2',{    controller: 'Controller2',    templateUrl: 'partials/view2.html'});$locationProvider.html5Mode(true); //activate HTML5 Mode
</pre>
**根据上面的样例代码。**	
	如果仅仅使用`$routeProvider`服务，则在主页面的 `a` 标签中需要加入 `#`符号：	
	<br>
		`<a href="#/view1"> view1 </a>`		
	<br>
	如果想要使用HTML5Mode， 则需要加入 `$locationProvider`服务。		
	<br>
	此时，主页面中的`a`标签改为：(除去`#`)		
	<br>
	`<a href="/view1"> view1 </a> `
	
<hr>
####About `ng-view`
	ng-veiw在页面当中只能存在一个，即只可以通过此一处位置来替换不同页面的内容。
使用方法：
	<ol>
		<li> `<ng-view>         </ng-view>`</li>
		<li> `<div class="ng-view">    </div>`</li>
		<li> `<div ng-view>       </div>`</li>
	</ol>

**注* ** 如果想要能兼容IE，则千万不要通过Element Version 的形式来声明`ng-view`

<hr>
####内置服务`$location`
	location 为AngularJS内置服务，用于同步处理浏览器的URL（保存在window.location当中的）

#####`path()`
`$location`为AngularJS的内置服务，其中内置的`path()`方法用于重定向一个新路径。

`$location.path()` 获取当前URL路径		
`$location.path('/view2')`设定当前路径，并且更新URL
#####`search()`
`search()` 用于提供键值与查询的URL中的参数相匹配。
	
	The key/value you pass will be appen- ded to the path with ? as the prefix and & as a separator.
	
例子：		

	$location.search(); //get an object that has key/values as search parameters	$location.search({key1:value1,key2:value2}); //set the search parameter

#####`hash()`
**hash() function lets you get or set the hash part of the URL.
**

	$location.hash(); //get the hash part. e.g. #div1, #div2 etc	$location.hash('div1'); //changes URL to /view1#div1
	
<hr>
####`$routeParams`
	通过url的形式传过来的参数。
例：
	<pre>
	$routeProvider.
	when('view/:firstparameter/:secondparameter', 
	{
		controller: 'testController',
		templateUrl: 'partials/view.html'
	});
	</pre>
如上所示，其中参数**firstparameter**和 **secondparameter**就可以通过`$routeParams`的方式传入到view.html当中。	
	
	我们可以通过传入的参数做许多事情，类似可以通过在登录时讲用户名和密码通过该形式传入、验证来进入用户自己私有的页面。

<pre>
	angular.module('myApp').controller('testController', 
	function($routeParams, $scope, $location){
		$scope.username = $routeParams.firstparameter;
		$scope.password = $routeParams.secondparameter;
		...
		然后通过$http方式（猜想）将用户名和密码与数据库中的进行对比。
		...
		if 匹配{
			$location.path('/view/' + $scope.username + '/panel');
		}else //匹配失败
		{
			console.log('Can not pair the username');
		}
	})
</pre>
<hr>

####比较有用的工具 `ng-template`(但不推荐)
	可以减少小页面的创建，将原来需要跳转到新页面来加载的代码，简化成只需将该部分代码添加到<script> 标签块中即可。
	
**上述表述很模糊，可以自行google来了解**		
**例子**
<pre>
	《script type='text/ng-template' id = '/view2.tpl'>
		.....其中放入原来要另行穿件文件来编写的代码块。
	《/script>
</pre>

**注意： **	
样例代码中的 id 扩展名为 可以任意设定，不一定要是`tpl`

**原理：**		
AngularJS会将 `script`标签中的内容加载到 `$templateCache` 服务当中，因此ng-view可以使用它。
<hr>

####`ng-if` and `ng-class`
**ng-if**用于条件判断。		
例子：		

	ng-if = ‘条件判断表达式’
当条件为真时，含有该属性的标签块会被显示出来。		
反之	，则会被隐藏起来。

**ng-class**用于选中菜单的样式

	ng-class = {'类型' ： 条件判断}
	
当所选中菜单的条件判断为真时，则执行所设定的样式属性。

<hr>
####使用AngularJS 的输入框验证

	<form class='form' novalidate>
		<input type='text' required/>
	</form>


**首先需要禁用掉浏览器自带的 form 验证，即使用 novalidate. 原因是，不同浏览器的 行为有差异。比如，chrome 对标记了 required 的输入框，在输入为空的情况下，自动 进行了提示。但是，其他浏览器就没有该行为，比如 safari. 所以需要使用统一的验证 方式。**

<hr>

####`resolve` in `$routeProvider`
resolve配置项是一个由key/value构成的对象。

	key – {string}：注入控制器的依赖项名称。
	factory - {string|function}：
	string：一个服务的别名
	function：函数的返回值将作为依赖注入项，如果函数是一个耗时的操作，那么控制器必须等待该函数执行完成（be resolved）才会被实例化。
	
**在controller实例化之前，resolve中的每一个对象都必须 be resolved**
<hr>

####`$routeChangeSuccess` and `$routeChangeError`

<pre>
	angular.module('myApp').run(function($rootScope){    $rootScope.$on('$routeChangeSuccess',function(){	//do something magical here. maybe stop the animation 		you started in        $routeChangeStart listener.    	});	});
</pre>

`run()`方法在所有模块都成功加载的时候会被调用

`$routeChangeSuccess`

	This event is broadcast after the $route service is able to successfully resolve all the dependencies needed to load the new route. The ng-view directive listens to this event so that it can instantiate the related con- troller, and the view can be rendered.
	
`$routeChangeError`

	If the $route service is unable to resolve at least one of the dependencies needed to change the route,the $routeChangeError event is broadcast.
	
<hr>
####`ng-include`
	
* 语法：		
1.  `<ng-include src='代码块文件路径'></ng-include>`		
2.  `<div ng-include='路径'> </div>`
		
**用于存放代码块的。可以将该段代码替换到当前页面。**
	
**另注：** `ng-include`的代码段中创建了新的scope，且继承上一层的parent scope。
<hr>
####UI-Router
<img src='http://img.blog.csdn.net/20140310211146187?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcmlzdGFs/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' height=‘300px’ width='500px'>


与`$routeProvider`类似, 但它只关注状态。 **ui-router**提供了另一种连接各个单页面的方法。

UI-Provider 提供了多种内置服务，其中包括 `$stateProvider`, `$stateParams`, `$state`.
<pre>
angular.module('myApp').config(function($stateProvider, $urlRouterProvider,$locationProvider){ 
//$stateProvider and  $urlRouterProvider are from ui.router module        $stateProvider.state('view1',{            url: '/view1',            controller:'Controller1',            templateUrl:'/partials/view1.html'        }).state('view2',{        url: '/view2/:firstname/:lastname',            controller:'Controller2',            resolve:{                names: function(){                    return ['Misko','Vojta','Brad'];} },            templateUrl: '/partials/view2.html'        });	$urlRouterProvider.otherwise('/view1'); 	// when no route match found redirect to /view1    $locationProvider.html5Mode(true);    });
</pre>

**$state**用于控制器中。
	
	下例代码中的$state.go类似于 $location.path()用于页面的变化跳转，同时可以将参数值进行赋值或更改。
<pre>
angular.module('myApp.controllers', []).controller('Controller1',  function($scope, $location, $state) {  $scope.loadView2 = function() {    // the following activates state view2    $state.go('view2', {      firstname: $scope.firstname,      lastname: $scope.lastname    });} });
</pre>
**$stateParams**类似于 `$routeParams`用于进行参数的传递。
<pre>
angular.module('myApp.controllers').controller('Controller2', 	function($scope,$stateParams,names){	$scope.firstname=$stateParams.firstname;	$scope.lastname=$stateParams.lastname;	$scope.names=names;});</pre>

**对于在Html页面中的绑定代码块页面，则不再使用 `href`改为使用`ui-sref`.**
<pre>
<ul class="menu">    <li><a ui-sref="view1">view1</a></li>    <li><a ui-sref="view2">view2</a></li></ul>
</pre>


###`Service`  of AngularJS
####`service`

`Service`是可注入类型，所以它可以通过DI(依赖注入)被注入到任何AngularJS类型当中。

**注* AngularJS的服务永远是单例类型**

* 语法：
<pre>
	angular.module('myApp').service('服务名', function(){
		//构造函数
		//实现的功能
	})
</pre>

* 将我们自己定义的服务`service`声明之后，我们就可以在后面的`controller`和 `service`中进行使用了。AngularJS 会根据 DI来进行推导。

* `Service` 只有在AngularJS的某一模块声明依赖使用该服务，否则Service不会预先生成。
	
		当然为了好的用户体验，也可以由其他方法来提前将Service 生成。
		我们可以通过module.run()方法来预先运行方法。
	
<pre>
	angular.module('myApp').run(function('依赖的服务名'){
		//可以在此处使用所依赖的服务，该服务会被实例化。
	})
</pre>

####`factory()`
* `factory`相比于`service`.更加灵活，不仅可以依赖注入，同时还能够自定义哪些会被实例化并返回。

	
		其实，service 本质就是将 factory 给封装而成。其实两者差别不大，推荐刚入门的时候可以直接先入service，factory相对来说可以提供类似私有属性的功能，可以后期熟悉了再进行使用。


<pre>
	angular.module('myApp').factory('helloService',function(){  return {    sayHello: function(name){      alert('Hello '+name);    },    echo: function(message){      alert(message);    }} });
</pre>

* **注* **此处factory的第二个参数并不是构造函数，它可以返回对象，方法或者值。
* 同时，factory 与 service相似也是个单例函数。

####`Provider`
`provider`相对于上面两个，更繁琐一点。不过使用也更加灵活。	
<pre>
angular.module('myApp')
	.provider('greet', function(){
		this.greeting = 'Hello';
		this.$get = function()
		{
			var greeting = this.greeting;
			return function(name){
				alert(greeting + ',' +name);
			}
		}
		this.setGreeting = function(greeting){
			this.greeting = greeting;
		}
	});
</pre>
**上面代码创建了一个`provider`服务, 如果其他模块或者控制器需要依赖的话，所应该声明的形式为：`provider`的第一个参数名 + `Provider`**
<pre>
angular.module('myApp', function(greetProvider){
	//line of code
	//在其中使用的provider $get部分的服务仍使用 greet('...')
	//可以将使用greet看做是对服务通过 $get 进行实例化。
	//
	//其他部分的调用则需要使用 greetProvider('....')
});
</pre>
**原文，对于二者return的都是什么进行了解释**
<pre>
■ greetProvider = Result of invoking the constructor function passed to provider() with new. This returns an object.■ greet = Result of calling greetProvider.$get(). In this case it returns a function which displays an alert. But the return type can be anything in general.
</pre>

####`value` 和 `constant`服务
**`value`只是提供了一个很简单的服务，基本只是用于存储字符串，数组，数字,函数方法或对象。**

	value有一个需要注意的点： 它不可以注入到module.config()当中的。
	
**`constant`与 `value`的唯一区别就是它可以被注入到module.config当中。其他方面一律相同。**
<hr>

###IFFE
	有时间写进来。内容不难
<hr>

###测试
	没时间写，先欠着。
	书都还没看，在AngularJS novice to ninjia 的 P121
<hr>

###`Form` in AngularJS
####`input` and `textarea` controls
```
<form name="myform">    <input type="text" name="firstname" ng-model="user.firstname" /></form>
<form name="myform">    <textarea name="bio" ng-model="user.bio"></textarea></form>
```

####`select` controls
```
<form name="myform">  <select name="country" ng-model="user.country">    <option value="US">United States</option>    <option value="GB">United Kingdom</option>    <option value="AU">Australia</option>  </select></form>
```
<pre>
<form name="myform">  <select name="country" ng-model="user.country">  <option value="">Please select an option</option>    <option value="US">United States</option>    <option value="GB">United Kingdom</option>    <option value="AU">Australia</option>  </select></form>
</pre>
	
	上面的代码中,由于$scope.user.country不匹配任意一个option，所以AngularJS会在一开始自动添加一个空的option选项给select。为了不出现这种情况，我们可以在一开始加入一行代码。

**`<option value="">Please select an option</option>`**
	
在上面的选项框中，无论你选择哪个都会传递给`$scope.user.country`。AngularJS会自动的探测当前选项并且赋值到scope中。

**通过`ng-option`命令的方式**

* 也可以通过scope.model的方式来进行`select`框的制作。

```
 <script type="text/javascript">    angular.module('myApp', []).controller('UserController', function($scope) { $scope.user = {};      $scope.countries = [{        id: 'US',        desc: 'United States'      }, {        id: 'GB',        desc: 'United Kingdom'      }, {        id: 'AU',        desc: 'Australia'}]; });</script>

<body ng-controller="UserController">  <form name="myform"><select name="country" ng-model="user.country" ng-options= 
	"country.id as country.desc for country in countries">    </select>  </form>  <div>Selected Country: {{user.country}}</div></body>
```

**重点来了：**
`ng-options="country.id as country.desc for country in countries"`

* 第一步，先将countries中的元素依次循环赋值到country中。
* 第二步，创建了一个option元素，其中country.id作为option中的value属性， country.desc作为实际显示而被创建出来到option中。

**切记，这种创建方法select的初始值仍为空，所以还需要设定一个空值备选框才好。**