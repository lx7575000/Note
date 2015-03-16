###JS学习笔记
<hr>
####1. Ready? Go.....
#####1.1插入JS代码`<script>`
**若要在HTML中插入JS的代码，需要插入到`<script> </script>`标签当中**		
**语法：**`<script type="text/javascript"> 代码段... </script>`
		
		其中type="text/javascript"表示，在<script>之间的是文本类型，其属于JavaScript语言。

#####1.2 引用JS外部文件
	我们可以将JS代码写入以.js结尾的外部文件当中。然后在HTML中直接引用该文件。
		
注意:在JS文件中，不需要`<script>`标签,直接编写JavaScript代码就可以了。
JS文件不能直接运行，需嵌入到HTML文件中执行，我们需在HTML中添加如下代码，就可将JS文件嵌入HTML文件中。	
`<script src="script.js"></script>`

<a href = "http://www.imooc.com/wiki/view?pid=143" target="_blank">Js放在head和body中的区别</a>
<hr>
 将JS代码放在不同位置，加载的顺序会不相同。具体可以看上文所给链接
<hr>

#####1.3 注释
**单行注释：**`//`		
**多行注释：**`/*    */`

####2. React....Do!
#####2.1 输出内容`document.write()`	
	document.write() 可用于直接向 HTML 输出流写内容。简单的说就是直接在网页中输出内容。

第一种:输出内容用“”括起，直接输出""号内的内容。	
`<script type="text/javascript">`		
`  document.write("I love JavaScript！"); //内容用""括起来，""里的内容直接输出。`		
`</script>`		
第二种:通过变量，输出内容		
`<script type="text/javascript">`		
`  var mystr="hello world!";	`	
 ` document.write(mystr);  //直接写变量名，输出变量存储的内容。`	
`</script>`		
第三种:输出多项内容，内容之间用+号连接。		
`<scripttype="text/javascript">	`	
`  var mystr="hello";`		
`  document.write(mystr+"I love JavaScript"); //多项内容之间用+号连接`		
`</script>`			
第四种:输出HTML标签，并起作用，标签使用“”括起来。		
`<script type="text/javascript">`		
`  var mystr="hello";`		
`document.write(mystr+"<br>");//输出hello后，输出一个换行符`	
`  document.write("JavaScript");`	
`</script>`		

#####2.2 警告`alert`......前方高能：)
	我们在访问网站的时候，有时会突然弹出一个小窗口，上面写着一段提示信息文字。如果你不点击“确定”，就不能对网页做任何操作，这个小窗口就是使用alert实现的。

语法:
alert(字符串或变量);  
注意:	
1. 在点击对话框"确定"按钮前，不能进行任何其它操作。	
2. 消息对话框通常可以用于调试程序。		
3. alert输出内容，可以是字符串或变量，与document.write 相似。

#####2.3 确认`confirm`.....Are you sure that?
	confirm 消息对话框通常用于允许用户做选择的动作，如：“你对吗？”等。弹出对话框(包括一个确定按钮和一个取消按钮)。

**语法：**`confirm(str)`		
参数说明:		
str：在消息对话框中要显示的文本		
返回值: Boolean值	

返回值:		
当用户点击"确定"按钮时，返回true	
当用户点击"取消"按钮时，返回false	
######注: 消息对话框是排它的，即用户在点击对话框按钮前，不能进行任何其它操作。

#####提2.4 提问`prompt`消息对话框.....回答: )
	prompt弹出消息对话框,通常用于询问一些需要与用户交互的信息。弹出消息对话框（包含一个确定按钮、取消按钮与一个文本输入框）。

**语法：**`prompt(str1, str2)`		
参数说明：		
str1: 要显示在消息对话框中的文本，不可修改	
str2：文本框中的内容，可以修改		

返回值:		
1. 点击确定按钮，文本框中的内容将作为函数返回值		
2. 点击取消按钮，将返回null	
######注:在用户点击对话框的按钮前，不能进行任何其它操作。

#####2.5 打开新窗口`window.open`......open your heart！

**语法：**`window.open(<URL>, <窗口名称>, <参数字符串>)
`		
参数说明:		
URL：打开窗口的网址或路径。		
窗口名称：被打开窗口的名称。	
              可以是"_top"、"_blank"、"_selft"等。	
参数字符串：设置窗口参数，各参数用逗号隔开。	
<img src="http://img.mukewang.com/52e3677900013d6a05020261.jpg" alt="窗口名称的参数说明" title = "参数说明">			
	
	注意：
	1.参数之间逗号及等号前后有空格，该字符串无效，只有删除空格才能正常运行。
	2.运行结果考虑浏览器兼容问题。

**例子：**`window.open('http://www.imooc.com', '_blank', 'width=600', 'height=400', 'top=100', 'left=0')`

#####2.6 关闭窗口`window.close`......关闭我心门。。。
**语法：**	
`window.close()		//关闭本窗口`	
		`<窗口队形>.close()		//关闭指定窗口`
<hr>
####3. Power!! I have the power of DOM操作
	文档对象模型DOM（Document Object Model）定义访问和处理HTML文档的标准方法。DOM 将HTML文档呈现为带有元素、属性和文本的树结构（节点树）
<hr>
#####3.1 What's DOM..
<img src="http://img.mukewang.com/52e4bd0f0001dd8d04830279.jpg" alt="将HTML代码分解为DOM节点层次图" title = "HTML代码分解为DOM节点层次图">	

	HTML文档可以说由节点构成的集合，三种常见的DOM节点:
	1. 元素节点：上图中<html>、<body>、<p>等都是元素节点，即标签。
	2. 文本节点:向用户展示的内容，如<li>...</li>中的JavaScript、DOM、CSS等文本。
	3. 属性节点:元素属性，如<a>标签的链接属性href="http://www.imooc.com"。
	
#####3.2 通过ID获取元素
**语法：**`document.getElementById("id")`		
注:获取的元素是一个对象，如想对元素进行操作，我们要通过它的属性或方法。

#####3.3 innerHTML属性
	innerHTML 属性用于获取或替换 HTML 元素的内容。
**语法：**`Object.innerHTML`		
	
	注意:
	1.Object是获取的元素对象，如通过document.getElementById("ID")获取的元素。
	2.注意书写，innerHTML区分大小写。
**例子：**
<img src="http://img.mukewang.com/52e4cd080001f01507220418.jpg" alt="" title = "">
**结果：**	
<img src="http://img.mukewang.com/52e4cb5c000187ce03740251.jpg" alt="" title = "">

#####3.4 改变HTML样式
**语法：**	`Object.style.property=new style;`		
**注意:Object是获取的元素对象，如通过document.getElementById("id")获取的元素。**
######属性基本表
<img src="http://img.mukewang.com/52e4d4240001dd6c04850229.jpg" alt="" title = "">

#####3.5 显示和隐藏`display`属性
**语法：**`Object.style.display = value`		
**注意:Object是获取的元素对象，如通过document.getElementById("id")获取的元素。**		

<style type="text/css">
    	table tr td, th{border:5px solid #000;}
		</style> 
<table summary="value取值">
	<tbody>
	<caption> value 取值 </caption>	
		<tr>
			<th>value</th>
			<th>description</th>
		</tr>
		<tr>
			<td>none</td>
			<td>此元素不会被显示(即隐藏)</td>
		</tr>
		<tr>
			<td>block</td>
			<td>此元素将显示为块级元素(即显示)</td>
		</tr>
	</tbody>
</table>
<hr>

<script type="text/javascript"> 
        function hidetext()  
		{  
		var mychar = document.getElementById("con").style.display = "none";
        
		}  
		function showtext()  
		{  
		var mychar = document.getElementById("con").style.display = "block";
        
		}
    </script> 
 <p id="con">可以通过<strong>设定style.display的值</strong>来控制显示和隐藏。</p> 
    <form>
       <input type="button" onclick="hidetext()" value="隐藏内容" /> 
       <input type="button" onclick="showtext()" value="显示内容" /> 
    </form>

<hr>

#####3.6 控制类名`className`属性
**语法：**`object.className = classname`		
作用:		
1.获取元素的class 属性		
2. 为网页内的某个元素指定一个css样式来更改该元素的外观	

####4. 编程挑战
**类对象可以通过`removeAttribute(str)`的方法来重置属性。**	
>本例子中通过txt.removeAttribute('style')的方式来将改变的各种设置重置为原`<style>  </style>`中所包含的原设置。
<hr>
<html>
<head>
<meta http-equiv="Content-Type" Content="text/html; charset=utf-8" />
<title>javascript</title>
<style type="text/css">
body{font-size:12px;}
#txt{
    height:400px;
    width:600px;
	border:#333 solid 1px;
	padding:5px;}
p{
	line-height:18px;
	text-indent:2em;}
</style>
</head>
<body>
  <h2 id="con">JavaScript课程</H2>
  <div id="txt"> 
     <h5>JavaScript为网页添加动态效果并实现与用户交互的功能。</h5>
        <p>1. JavaScript入门篇，让不懂JS的你，快速了解JS。</p>
        <p>2. JavaScript进阶篇，让你掌握JS的基础语法、函数、数组、事件、内置对象、BOM浏览器、DOM操作。</p>
        <p>3. 学完以上两门基础课后，在深入学习JavaScript的变量作用域、事件、对象、运动、cookie、正则表达式、ajax等课程。</p>
  </div>
  <form>
  <!--当点击相应按钮，执行相应操作，为按钮添加相应事件-->
    <input type="button" value="改变颜色" onclick = "changeColor()" >  
    <input type="button" value="改变宽高" onclick = "changeWidth_Height()">
    <input type="button" value="隐藏内容" onclick = "hideContent()">
    <input type="button" value="显示内容" onclick = "showContent()">
    <input type="button" value="取消设置" onclick = "resetSetting()">
  </form>
  <script type="text/javascript">
//定义"改变颜色"的函数
    function changeColor(){
        mychar1 = document.getElementById("con");
        mychar2 = document.getElementById("txt");
        mychar1.style.color = "red";
        mychar1.style.backgroundColor = "#CCC";
        mychar2.style.color = "blue";
        mychar2.style.backgroundColor = "#CCC";
    }

//定义"改变宽高"的函数
    function changeWidth_Height(){
       mychar1 = document.getElementById("con");
       mychar2 = document.getElementById("txt");
       mychar2.style.width = "300px";
       mychar2.style.height = "200px";
    }

//定义"隐藏内容"的函数
    function hideContent(){
        mychar1 = document.getElementById("txt");
        mychar1.style.display = "none";
    }

//定义"显示内容"的函数
    function showContent(){
        mychar1 = document.getElementById("txt");
        mychar1.style.display = "block";
    }

//定义"取消设置"的函数
    function resetSetting(){
        var reset = confirm("是否取消设置？");
        if (reset === true){
            txt.removeAttribute('style');          
        }
    }


  </script>
</body>
</html>
<hr>