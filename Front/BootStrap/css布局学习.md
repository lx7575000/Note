##CSS布局学习
####2015-03-25

####自动居中
**布局的`margin`上下可以任意设定，左右设定为`auto`,同时不可以设定float 和 absolute 或fixed**

```
.body{
	margin:0 auto;
	<!--网页整个主体设定为自动居中-->
}
```

####清除浮动
**清除浮动有两种方法：**		
第一种是在布局中使用`clear： both/left/right`用于清除两侧/左侧/右侧的方法。
	
	注意： 当父包含块缩成一条时， 用clear：both方法清除浮动无效，她一般用于紧邻后面的元素的清除浮动。
	
第二种是在布局中通过设定`width:100%; overflow: hidden`的方法来实现。

###一列布局
**顶部布局**为横条形，用于放导航栏，或者其他选项什么的。一般使用顶部静态固定（即，不论你怎么上下移动网页，它都一直存在于浏览器顶部）。

**主题布局**一般都是居中(通过在**style**中设定 `margin：0 auto`)，长度不具体进行限定。根据不同情况，再来设定长度。

**底部布局**就是纯粹的固定在底部，一般都是一些没营养的内容。

```
	<style type="text/css">
		body{ margin:0; padding:0; font-size:30px}
		div{ text-align:center; font-weight:bold}
		.main,.footer{ width:960px; margin:0 auto;}
		.head{ width:100%; height:100px; background:#ccc}
		.main{ height:600px; background:#FCC}
		.footer{ height:50px; background:#9CF}
	</style>
	<body>
	<div class="head">head</div>
	<div class="main">main</div>
	<div class="footer">footer</div>
	</body>
```

###两列布局
通过设定浮动状态的方法来做到两列并列存在。

```
.left{ width:300px; height:600px; background:#ccc; float: left;}}/*左浮动样式*/
.right{ width:660px; height:600px; background:#FCC; float: right;}/*右浮动样式*/

```

	width， height属性的设定有两种方式，其中一种是设定百分比，设定在固定或者非固定大小的页面中所占的比例多少。另一种方式则是通过设定具体的像素值来进行精确设定。
	
```
	<style type="text/css">
		body{ margin:0; padding:0; font-size:30px; font-weight:bold}
		div{ text-align:center; line-height:50px}
		.main{ width:960px; height:600px; margin:0 auto}
		.left{ width:300px; height:600px; background:#ccc; float: left;}}/*左浮动样式*/
		.right{ width:660px; height:600px; background:#FCC; float: right;}/*右浮动样式*/
		</style>

	<body>
		<div class="main">
	    	<div class="left">left</div>
	    	<div class="right">right</div>
		</div>
	</body>
```

###三列布局
三列布局的设定方法是，首先先设定左右两列的布局大小，并且将他们的位置属性设定为绝对布局（position: absolute）。然后设定中间布局的大小，可以通过设定四周`margin`(设定顺序为： 上 ，右， 下， 左)来进行相对布局。

```
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>三列布局</title>
    <style type="text/css">
        body{ margin:0; padding:0; font-size:30px; font-weight:bold}
        div{ line-height:50px}
        .left{ width:200px; height:600px; background:#ccc; position: absolute; left:0; top:0}
        .main{ height:600px; margin: 0px 310px 0px 210px; background:#9CF}
        .right{ height:600px; width:300px; position:absolute; top:0; right: 0; top: 0; background:#FCC;}
    </style>

	<div class="left">left</div>
	<div class="main">设计首页的第一步是设计版面布局。就象传统的报刊杂志编辑一样，我们将网页看作一张报纸，一本杂志来进行排版布局。 虽然动态网页技术的发展使得我们开始趋向于学习场景编剧，但是固定的网页版面设计基础依然是必须学习和掌握的。它们的基本原理是共通的，你可以领会要点，举一反三。</div>
	<div class="right">right</div>

```