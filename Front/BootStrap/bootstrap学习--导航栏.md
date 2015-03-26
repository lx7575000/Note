##Bootstrap学习--导航栏
####2015-03-25

###默认导航栏
* 向导航栏的`<nav>`标签添加**class.navbar、.navbar-default**。
* 向上面的元素添加**role="navigation"**可以助于增加可访问性。
* 向`<div>`元素添加一个标题**class.navbar-header**，内部包含了带有**classs navbar-brand**的`<a>`元素。可以让文本看起来更大一号。
* 向导航栏中添加链接，需要添加带有**class.nav、.navbar-nav**的无序列表。

```
	<nav class="navbar navbar-default" role="navigation">
	<!--role='navigation' 助于增加可访问性-->
    <div class="navbar-header">
		<!--主标题栏的主题-->
        <a class="navbar-brand" href="#">W3Cschool</a>
    </div>
    <div>
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">iOS</a></li>
            <!--当前被激活的标题栏-->
            <li><a href="#">SVN</a></li>
            <li class="dropdown">
            <!--导航栏中的select选项栏-->
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    Java
                    <b class="caret"></b>
                </a>
                <!--默认选择的选项-->
                <ul class="dropdown-menu">
                	<!--选择菜单-->
                    <li><a href="#">jmeter</a></li>
                    <li><a href="#">EJB</a></li>
                    <li><a href="#">Jasper Report</a></li>
                    <li class="divider"></li>
                    <!--divider样式将元素上下间距扩大-->
                    <li><a href="#">AAAA</a></li>
                    <li class="divider"></li>
                    <li><a href="#">BBBB</a></li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
```
###响应式导航栏
为了给导航栏添加响应式特性，您要折叠的内容必须包裹在带有 **classes .collapse、.navbar-collapse **的 `<div>` 中。折叠起来的导航栏实际上是一个带有 **class .navbar-toggle** 及两个 **data- **元素的按钮。第一个是** data-toggle**，用于告诉 JavaScript 需要对按钮做什么，第二个是** data-target**，指示要切换到哪一个元素。

三个带有 **class .icon-bar** 的 `<span>` 创建所谓的汉堡按钮。这些会切换为 **.nav-collapse**  `<div>` 中的元素。为了实现以上这些功能，您必须包含 Bootstrap 折叠（Collapse）插件。

以下代码所生成的导航栏，当页面尺寸小的时候，会自动的将导航栏上面的元素放入一个列式按钮内，当按下时会动态的弹出。

```
	<nav class="navbar navbar-default" role="navigation">
   <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" 
         data-target="#example-navbar-collapse">
         <!--data-target用于说明是切换到id为‘#example-navbar-collapse’的标签对象上-->
         <span class="sr-only">切换导航</span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">W3Cschool</a>
   </div>
   <div class="collapse navbar-collapse" id="example-navbar-collapse">
      <ul class="nav navbar-nav">
         <li class="active"><a href="#">iOS</a></li>
         <li><a href="#">SVN</a></li>
         <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
               Java <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
               <li><a href="#">jmeter</a></li>
               <li><a href="#">EJB</a></li>
               <li><a href="#">Jasper Report</a></li>
               <li class="divider"></li>
               <li><a href="#">分离的链接</a></li>
               <li class="divider"></li>
               <li><a href="#">另一个分离的链接</a></li>
            </ul>
         </li>
      </ul>
   </div>
</nav>
```

####导航栏的表单
导航栏中的表单是使用 **.navbar-form class**。这确保了表单适当的垂直对齐和在较窄的视口中折叠的行为。使用对齐方式选项（这将在组件对齐方式部分进行详细讲解）来决定导航栏中的内容放置在哪里。


下面的代码可以直接放在`<nav>`标签当中

```
	<div>
      <form class="navbar-form navbar-left" role="search">
         <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
         </div>
         <button type="submit" class="btn btn-default">提交</button>
      </form>    
   </div>
```

####导航栏中的按钮
您可以使用 **class .navbar-btn** 向不在 `<form>` 中的 `<button>` 元素添加按钮，按钮在导航栏上垂直居中。**.navbar-btn** 可被使用在` <a> `和`<input>` 元素上。
>不要在 .navbar-nav 内的 <a> 元素上使用 .navbar-btn，因为它不是标准的 button class。

```
	<div>
      <form class="navbar-form navbar-left" role="search">
         <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
         </div>
         <button type="submit" class="btn btn-default">提交按钮</button>
      </form>    
      <button type="button" class="btn btn-default navbar-btn">
         导航栏按钮
      </button>
   </div>
```

####导航栏中的文本
	如果需要在导航中包含文本字符串，请使用 class .navbar-text。这通常与 <p> 标签一起使用，确保适当的前导和颜色。

```
	<div>
      <p class="navbar-text">Signed in as Thomas</p>
   </div>
```

####非导航链接
	如果您不想在常规的导航栏导航组件内使用标准的链接，那么请使用 class navbar-link 来为默认的和倒转的导航栏选项添加适当的颜色。

```
	<div>
      <p class="navbar-text navbar-right">Signed in as 
         <a href="#" class="navbar-link">Thomas</a>
      </p>
   </div>
```

####组件对齐方式
	您可以使用实用工具 class .navbar-left 或 .navbar-right 向左或向右对齐导航栏中的 导航链接、表单、按钮或文本 这些组件。这两个 class 都会在指定的方向上添加 CSS 浮动。
	
```
	<div>
      <!--向左对齐-->
      <ul class="nav navbar-nav navbar-left">
      <!--Look At navbar-left !!!!!!-->
         <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
               Java 
               <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
               <li><a href="#">jmeter</a></li>
               <li><a href="#">EJB</a></li>
               <li><a href="#">Jasper Report</a></li>
               <li class="divider"></li>
               <li><a href="#">分离的链接</a></li>
               <li class="divider"></li>
               <li><a href="#">另一个分离的链接</a></li>
            </ul>
         </li>
      </ul>
      <form class="navbar-form navbar-left" role="search">
      <!--Look At navbar-left !!!!!!-->
         <button type="submit" class="btn btn-default">
            向左对齐-提交按钮  
         </button>
      </form> 
      <p class="navbar-text navbar-left">向左对齐-文本</p>
      <!--向右对齐-->
      <ul class="nav navbar-nav navbar-right">
      <!--Look At navbar-right !!!!!!-->
         <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
               Java <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
               <li><a href="#">jmeter</a></li>
               <li><a href="#">EJB</a></li>
               <li><a href="#">Jasper Report</a></li>
               <li class="divider"></li>
               <li><a href="#">分离的链接</a></li>
               <li class="divider"></li>
               <li><a href="#">另一个分离的链接</a></li>
            </ul>
         </li>
      </ul>
      <form class="navbar-form navbar-right" role="search">
         <button type="submit" class="btn btn-default">
            向右对齐-提交按钮
         </button>
      </form> 
      <p class="navbar-text navbar-right">向右对齐-文本</p>
   </div>
```

####固定到顶部、底部
	Bootstrap 导航栏可以动态定位。默认情况下，它是块级元素，它是基于在 HTML 中放置的位置定位的。通过一些帮助器类，您可以把它放置在页面的顶部或者底部，或者您可以让它成为随着页面一起滚动的静态导航栏。

如果您想要让导航栏固定在页面的顶部，请向 **.navbar class** 添加 **class .navbar-fixed-top**

>为了防止导航栏与页面主体中的其他内容的顶部相交错，请向 <body> 标签添加至少 50 像素的内边距（padding），内边距的值可以根据您的需要进行设置。

```
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<!--顶部-->
	<nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
	<!--底部-->
```
####静态的顶部
	如需创建能随着页面一起滚动的导航栏，请添加 .navbar-static-top class。该 class 不要求向 <body> 添加内边距（padding）。
	
```
	<nav class="navbar navbar-default navbar-static-top" role="navigation">
```

####倒置的导航栏
	为了创建一个带有黑色背景白色文本的倒置的导航栏，只需要简单地向 .navbar class 添加 .navbar-inverse class 即可，如下面的实例所示：
>为了防止导航栏与页面主体中的其他内容的顶部相交错，请向 <body> 标签添加至少 50 像素的内边距（padding），内边距的值可以根据您的需要进行设置。
