##HTML+CSS学习笔记
###HTML
####1. 创建表格的四个元素`table, tbody, th, tr, td`

```	
		<style type="text/css">
    		table tr td, th{border:1px solid #000;}
		</style>
		//通过以上代码可以为表格添加边框，添加的事CSS样式
	    	<table summary = “表格简介文本”>//整表以table开始和结束
			<tbody>//内部内容必须全部下载完成之后才会显示表格
			<caption>标题文本</caption>
					<tr> //表格的一行内容都放在 tr 内
						<th>首行单元格</th>
						<td>
					行内的单元格，有几个 td 就表示一行有几个单元格
						</td>
					</tr>
			</tbody>
    	</table>
```
<style type="text/css">
    	table tr td, th{border:1px solid #000;}
		</style> 		
<table summary = "表格简介文本">
  			<tbody>  		
  			  	<caption>标题文本</caption>	    
  			<tr>
  				<th>首单元1</th>
  				<th>首单元2</th>
  				<th>首单元3</th>
  			</tr>
  			<tr>
  				<td>1</td>
  				<td>2</td>
  				<td>3</td>
  			</tr>
  			</tbody>
  		</table>
  		
  		
  		
######1.1摘要`<summary>`
	摘要的内容不会在浏览器中显现，它的主要作用是增加表格的可读性(语义化)，使搜索引擎更好的读懂表格内容，还可以使屏幕阅读器更好的帮助特殊用户读取表格内容。

语法：`<table summary = "表格简介文本">`
######1.2标题`<coption>`
	用以描述表格内容，标题的显示位置：表格上方。
语法：`<caption> 文本标题 </caption>`
<hr>
####2添加示例代码`<code>, <pre>`
	在网页中添加代码行可以通过code标签来做。		
	如果需要添要多行代码的话，可以使用** pre **标签来标记
	
例子：<code>println("Hello World")</code>		

语法：`	<code> 在其中添加代码行 </code> `		
<hr>
####3. 链接其他页面 `<a>`
	href属性的作用是给出链接的地址， title属性的作用是鼠标在其上时可以会显示该文本内容。
语法：`<a  href="目标网址"  title="鼠标滑过显示的文本">链接显示的文本</a>`       
新标签页打开链接：	 `<a href="目标网址" target="_blank">click here!</a>`	
例子：<a  href="www.baidu.com"  title="鼠标滑过显示的文本">链接显示的文本</a>	
	<a href="目标网址" target="_blank">click here!</a>

######3.1 链接Email地址 `mailto`
	注意：如果mailto后面同时有多个参数的话，第一个参数必须以“?”开头，后面的参数每一个都以“&”分隔。
例子：`<a href="mailto:yy@imooc.com?subject=观了不起的盖茨比有感&body=你好，对此评论有些想法">显示的内容</a>` 
<hr>	
				
####4. 插入图片`img`
语法: `<img src="图片地址" alt="下载失败时的替换文本" title = "提示文本">`
	<ol>
	<li>src：标识图像的位置；</li>
	<li>alt：指定图像的描述性文本，当图像不可见时（下载不成功时），可看到该属性指定的文本；</li>
	<li>title：提供在图像可见时对图像的描述(鼠标滑过图片时显示的文本)；
</li>
	<li>图像可以是GIF，PNG，JPEG格式的图像文件。</li>	</ol>
<hr>
####5. 表单`form`： 与用户交互
	网站怎样与用户进行交互？答案是使用HTML表单(form)。表单是可以把浏览者输入的数据传送到服务器端，这样服务器端程序就可以处理表单传过来的数据
语法：`<form   method="传送方式"   action="服务器文件">`
<ol>
	<li>form ：form标签是成对出现的，以 form 开始，以 /form 结束。</li>
	<li>action ：浏览者输入的数据被传送到的地方,比如一个PHP页面(save.php)。</li>
	<li>method ： 数据传送的方式（get/post）。</li>
</ol>

	注意:
	1、所有表单控件（文本框、文本域、按钮、单选框、复选框等）都必须放在<form></form>标签之间（否则用户输入的信息可提交不到服务器上哦！）。
	2、method:post/get的区别这一部分内容属于后端程序员考虑的问题。感兴趣的小伙伴可以查看本小节的wiki，里面有详细介绍。

######小知识： Form中的get和post方法，在数据传输过程中分别对应了GET和POST方法。
	二者主要区别如下：

	1、Get将表单中数据的按照variable=value的形式，添加到action所指向的URL后面，并且两者使用“?”连接，而各个变量之间使用“&”连接；Post是将表单中的数据放在form的数据体中，按照变量和值相对应的方式，传递到action所指向URL。
	如下形式：
     http://www.imooc.com/test.asp?name=lilian&password=12345678
	2、Get是不安全的，因为在传输过程，数据被存放在请求的URL地址中，这样就可能会有一些隐私的信息被第三方看到。
	3、Get方式传输的数据量非常小，一般限制在 2KB 左右，但是执行效率却比 Post 方法好；而 Post 方式传递的数据量相对较大，它是等待服务器来读取数据，不过也有字节限制，这是为了避免对服务器用大量数据进行恶意攻击，根据微软方面的说法，微软对用 Request.Form()可接收的最大数据有限制，IIS4中为 80KB 字节，IIS5 中为 100KB 字节。

#####5.1 文本输入框，密码输入框
语法:`<form>
   <input type="text/password" name="名称" value="文本" />
</form>`

	1、type：当type="text"时，输入框为文本输入框;
       当type="password"时, 输入框为密码输入框。
	2、name：为文本框命名，以备后台程序ASP 、PHP使用。
	3、value：为文本输入框设置默认值。(一般起到提示作用)

<form  method="post" action="save.php">
    账户: 
	<input type="text" name="myName"/>
	<br>
	密码: 
    <input type="password" name="pass"/>
</form> 

#####5.2 文本域，支持多行文本输入
语法:`<textarea  rows="行数" cols="列数">文本</textarea>`	
<textarea  rows="2" cols="10">文本....</textarea>

#####5.3 单选框，复选框
语法：`<input   type="radio/checkbox"   value="值"    name="名称"   checked="checked"/>`

	1、type:
   		当 type="radio" 时，控件为单选框
   		当 type="checkbox" 时，控件为复选框
	2、value：提交数据到服务器的值（后台程序PHP使用）
	3、name：为控件命名，以备后台程序 ASP、PHP 使用
	4、checked：当设置 checked="checked" 时，该选项被默认选中
**注意:同一组的单选按钮，name 取值一定要一致，比如上面例子为同一个名称“radioLove”，这样同一组的单选按钮才可以起到单选的作用**	
<label>性别:</label>
    <label>男</label>
    <input type="radio" value="1"  name="gender" />
    <label>女</label>
    <input type="radio" value="2"  name="gender" />
    
#####5.4 下拉表框
语法:(**单选**)`<select> <option value="提交的值"> 显示的值  </option> </select>`	
（**多选**）	`<select multiple = “multiple”> <option value="提交的值" > 显示的值  </option> </select>`	
例子：（单选）		<label>爱好:</label>
    <select>
      <option value="看书">看书</option>
      <option value="旅游">旅游</option>
      <option value="运动" selected = "selected">运动</option>
      <option value="购物">购物</option>
    </select>    	

例子：（多选）<select multiple="multiple">
      <option value="看书">看书</option>
      <option value="旅游">旅游</option>
      <option value="运动">运动</option>
      <option value="购物">购物</option>
    </select>
  
 **当设置属性 selected=“selected”时，标记该属性的值即为默认选项**
 
#####5.5 `label`标签
	label标签不会向用户呈现任何特殊效果，它的作用是为鼠标用户改进了可用性。如果你在 label 标签内点击文本，就会触发此控件。就是说，当用户单击选中该label标签时，浏览器就会自动将焦点转到和标签相关的表单控件上（就自动选中和该label标签相关连的表单控件上）。

语法：`<label for="控件id名称">`		
**注意：标签的 for 属性中的值应当与相关控件的 id 属性值一定要相同。**
<hr>
####6. 按钮
	只有处于同一表单之下的时候，按钮才会起作用。个人理解，若有错误请指正。
#####6.1 提交按钮
语法：`<input   type="submit"   value="提交">`

		type：只有当type值设置为submit时，按钮才有提交作用
		value：按钮上显示的文字
**例子：**
	<form>
	<label for="myName">姓名：</label>
    <input type="text" value=" " name="myName " />
    <input type="submit" value="提交" name="submitBtn" />
    </form>
  
#####6.2 重置按钮
语法：`<input type="reset" value="重置">`	
**例子：**<form action="save.php" method="post" >
    <label>爱好:</label>
    <select>
      <option value="看书">看书</option>
      <option value="旅游" selected="selected">旅游</option>
      <option value="运动">运动</option>
      <option value="购物">购物</option>
    </select>
    <input type="submit" value="确定"  />
    <input type="reset" value="重置"  />
</form>
<hr>
####7. `<body>`标签
#####7.1  段落`<p>`
语法：`<p>段落内容</p>`	
	**注意：每一段的段落内容要放到一个`<p> <\p>`当中去，有几段就需要几个`<p>`**
#####7.2 标题`<hx>`
	标题总共有6个默认样式，从h1 - h6
语法：`<h1>标题内容</h1>`		
**例子： ** <h1>标签1</h1>
		<h3>标签3</h3>
		<h5>标签5</h5>
#####7.3 强调语气`<em>`,`<strong>`
语法：`<em>需要强调的文本</em> 和  
<strong>需要强调的文本</strong> `		

**注意：**       但两者在强调的语气上有区别:`<em>` 表示强调，`<strong>` 表示更强烈的强调。并且在浏览器中`<em>` 默认用**斜体**表示，`<strong>` 用**粗体**表示。两个标签相比，目前国内前端程序员更喜欢使用<strong>表示强调

#####7.4 `<span>`标签为文字设置
**`<span>`标签是没有语义的，它的作用就是为了设置单独的样式用的。**		
**语法：**`<span>文本</span>`					
	
例子： 
<style>
span{color:blue;}
</style>
<span >文本</span>


#####7.5 短文引用，`<q>`标签。长文本引用，`<blockquote>`

**语法：**<p>`<q>引用文本</q>`	</p><p>`<blockquote>引用文本</blockquote>`</p>
**例子：**<p><q>短文引用文本</q></p><p>
<blockquote>长文本引用文本</blockquote></p>

#####7.6 换行，`<br>`标签. 空格，`&nbsp;`
<hr>
#####7.7 添加水平横线，`<hr>`标签
	在要插入水平线的两个段落之间输入<hr> 就可以实现插入横线，正如上面的横线例子。
#####7.8 `<address>`标签，为网页添加地址信息
**语法：**`<address>地址信息</address>`
**例子：**<address>地址信息</address>
<hr>

####8. 样式`Style`
#####8.1 字体大小`font-size`
**语法：**`<块标签 style="font-size: 大小 px;"> 内容 <块标签> `

**例子：** <p style="font-size 50px;">这就是例子</p>
<br> 代码：`<p style="font-size 50px;">这就是例子</p>`

#####8.2 颜色`color`，背景色`background-color`
**语法：**			
颜色：`<块标签 style="color: red/blue/green ...;"> 内容 <块标签>`		
背景色：`<块标签 style="color: red/blue/green ...;"> 内容 <块标签>` 

**例子：** <p style="color:green"> 这是个例子 </p>
**代码**`<p style="color:green"> 例子 </p>`

#####8.3 字体`font-family`
**语法：** `<p style="font-family : Bodoni"> 例子 </p>`	
**例子：** <p style="font-family : Impact"> 例子 </p>






<hr>
###CSS
####1. 入门
#####1.1介绍
	CSS全称为“层叠样式表 (Cascading Style Sheets)”，它主要是用于定义HTML内容在浏览器内的显示样式，如文字大小、颜色、字体加粗等。
<p>css 样式由选择符和声明组成，而声明又由属性和值组成</p>
	选择符：又称选择器，指明网页中要应用样式规则的元素，如本例中是网页中所有的段（p）的文字将变成蓝色，而其他的元素（如ol）不会受到影响。
	声明：在英文大括号“｛｝”中的的就是声明，属性和值之间用英文冒号“：”分隔。当有多条声明时，中间可以英文分号“;”分隔，如下所示：
	p{font-size:12px;color:red;}

注意：	
1、最后一条声明可以没有分号，但是为了以后修改方便，一般也加上分号	
2、为了使用样式更加容易阅读，可以将每条代码写在一个新行内，如下所示：
#####1.2注释代码`/* , */`
	就像在Html的注释一样，在CSS中也有注释语句：用/*注释语句*/来标明（Html中使用<!--注释语句-->)。
<hr>
####CSS样式基础知识
#####2.1 内联式CSS样式：可以直接写在HTML中
内联式css样式表就是把css代码直接写在现有的HTML标签中，如下面代码：
<p style="color:red">这里文字是红色。</p>
注意要写在元素的开始标签里，下面这种写法是错误的：		
`<p>这里文字是红色。</p style="color:red">`	<br>	
并且css样式代码要写在style=""双引号中，如果有多条css样式代码设置可以写在一起，中间用分号隔开。如下代码：	
`<p style="color:red;font-size:18px">这里文字是红色。</p>`	<p style="color:red;font-size:18px">这里文字是红色。</p>

#####2.2 嵌入式CSS样式，写在当前的文件中
	嵌入式css样式，就是可以把css样式代码写在<style type="text/css"></style>标签之间。如下面代码实现把三个<span>标签中的文字设置为红色：
`<style type="text/css">`	
`span{`		
`color:red;`	
`}`
`</style>`

**注意：**
嵌入式css样式必须写在<style></style>之间，并且一般情况下嵌入式css样式写在<head></head>之间。如右边编辑器中的代码

#####2.3 外部式css样式，写在单独的一个文件中
	外部式css样式(也可称为外联式)就是把css代码写一个单独的外部文件中，这个css样式文件以“.css”为扩展名，在<head>内（不是在<style>标签内）使用<link>标签将css样式文件链接到HTML文件内
`<link href="base.css" rel="stylesheet" type="text/css" />`		
注意：	
1、css样式文件名称以有意义的英文字母命名，如 main.css。	
2、rel="stylesheet" type="text/css" 是固定写法不可修改。		
3、<link>标签位置一般写在<head>标签之内。

#####2.4 三种方法的优先级
######内联式 > 嵌入式 > 外部式
但是嵌入式>外部式有一个前提：嵌入式css样式的位置一定在外部式的后面。如右代码编辑器就是这样，<link href="style.css" ...>代码在<style type="text/css">...</style>代码的前面（实际开发中也是这么写的）。
<hr>
####3. 选择器
每一条css样式声明（定义）由两部分组成，形式如下：		
<p>选择器{<br>
    样式;<br>
}</p>

在{  }之前的部分就是“选择器”，“选择器”指明了{}中的“样式”的作用对象，也就是“样式”作用于网页中的哪些元素。

#####3.1 标签选择器
	标签选择器其实就是html代码中的标签。如右侧代码编辑器中的<html>、<body>、<h1>、<p>、<img>。
`p{font-size:12px;line-height:1.6em;}`		
**上面的css样式代码的作用：为p标签设置12px字号，行间距设置1.6em的样式。**

#####3.2 类选择器
**语法：**`.类选择器名称{ CSS 样式代码; }`		
	
	注意：	
	1、英文圆点开头	
	2、其中类选器名称可以任意起名（但不要起中文噢）
使用方法：		
第一步：使用合适的标签把要修饰的内容标记起来，如下：	
	`<span>胆小如鼠</span>`		
第二步：使用class="类选择器名称"为标签设置一个类，如下：	
`<span class="stress">胆小如鼠</span>`		
第三步：设置类选器css样式，如下：	
`.stress{color:red;}`/*类前面要加入一个英文圆点*/	

#####3.3 ID选择器
在很多方面，ID选择器都类似于类选择符，但也有一些重要的区别

	1、为标签设置id="ID名称"，而不是class="类名称"。	
	2、ID选择符的前面是井号（#）号，而不是英文圆点（.）。

#####3.4 ID选择器和类选择器的区别
**相同点：**可以应用于任何元素。
**不同点：**		

	1. ID选择器只能在一个HTML文档中使用一次。	
	2. 可以使用类选择器词列表方法为一个元素同时设置多个样式。我们可以为一个元素同时设多个样式，但只可以用类选择器的方法实现，ID选择器是不可以的（不能使用 ID 词列表）。
	
#####3.5 其他各种选择器
1. 子选择器
**语法：**` .类选择器 > 标签 { 样式 }`
2. 包含选择器
**语法：**` .类选择器 空格 标签 { 样式 }`
3. 通用选择器
**语法：** ` * { 样式 }`
4. 伪类选择符
**语法：** `标签 : hover { 样式 }`
5. 分组选择符
**语法：** `标签1, 标签2 { 样式 }`
<hr>

####4. 继承， 层叠
#####4.1 继承
	继承是一种规则，它允许样式不仅应用于某个特定html标签元素，而且应用于其后代。比如下面代码：如某种颜色应用于p标签，这个颜色设置不仅应用p标签，还应用于p标签中的所有子元素文本，这里子元素为span标签
	
	p{color:red;}
	<p>三年级时，我还是一个<span>胆小如鼠</span>的小女孩。</p>
	
#####4.2 特殊性
**标签的权值为1，类选择符的权值为10，ID选择符的权值最高为100。**		
######注意：还有一个权值比较特殊--继承也有权值但很低，有的文献提出它只有0.1，所以可以理解为继承的权值最低。

#####4.3 层叠
	层叠就是在html文件中对于同一个元素可以有多个css样式存在，当有相同权重的样式存在时，会根据这些css样式的前后顺序来决定，处于最后面的css样式会被应用。		
**内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。**
<hr>

`p{color:red;}`<br>
`p{color:green;}`<br>
`<p class="first">三年级时，我还是一个<span>胆小如鼠</span>的小女孩。</p>`<br>
	
	最后 p 中的文本会设置为green，这个层叠很好理解，理解为后面的样式会覆盖前面的样式。
	
#####重要性
	我们在做网页代码的时，有些特殊的情况需要为某些样式设置具有最高权值，怎么办？这时候我们可以使用!important来解决。


	这里注意当网页制作者不设置css样式时，浏览器会按照自己的一套样式来显示网页。并且用户也可以在浏览器中设置自己习惯的样式，比如有的用户习惯把字号设置为大一些，使其查看网页的文本更加清楚。这时注意样式优先级为：浏览器默认的样式 < 网页制作者样式 < 用户自己设置的样式，但记住!important优先级样式是个例外，权值高于用户自己设置的样式。
	
注意：!important要写在分号的前面

####5 格式化排版
#####5.1 字体`font-family`
**语法：**` 标签 { font-family: "字体类型"}`

#####5.2 字号， 颜色
**语法：**`标签 { font-size: value ; color: #XXX;} `

#####5.3 粗体
**语法：** `标签 { font-weight:bold;}`
#####5.4 斜体
**语法：** `标签 { font-style: italic;}`		
#####5.5 下划线
**语法：**`标签 { text-decoration: underline;}`

#####5.6 删除线
**语法：**`标签： {text-decoration:line-through;}`

#####5.7 缩进
**语法：**`标签 {text-indent:  缩进空格数 em ;}`

#####5.8 行高
**语法：**`标签 { line-height : 数字 em;}`
#####5.9 字间距、字母间距
文字间隔		
**语法：**`标签 { letter-spacing: number px;}`
单词间距		
**语法：**`标签 {word-spacing: number px}`

#####5.10 对齐
**语法：**`标签 {text-align: center/left/right;}`

<hr>
####6 盒模型
#####6.1 元素分类
	在CSS中，html中的标签元素大体被分为三种不同的类型：块状元素、内联元素(又叫行内元素)和内联块状元素。

常用的块状元素有：		
`<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>`		
常用的内联元素有：		
`<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>`		
常用的内联块状元素有：		
`<img>、<input>`

#####6.2 块级元素
块级元素特点：

	1、每个块级元素都从新的一行开始，并且其后的元素也另起一行。（真霸道，一个块级元素独占一行）
	2、元素的高度、宽度、行高以及顶和底边距都可设置。
	3、元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。
	
#####6.3 内联元素
	在html中，<span>、<a>、<label>、<input>、 <img>、 <strong> 和<em>就是典型的内联元素（行内元素）（inline）元素。当然块状元素也可以通过代码display:inline将元素设置为内联元素。
	
内联元素特点：

	1、和其他元素都在一行上；
	2、元素的高度、宽度、行高及顶部和底部边距不可设置；
	3、元素的宽度就是它包含的文字或图片的宽度，不可改变。
	
#####6.4 内联块状元素
	内联块状元素（inline-block）就是同时具备内联元素、块状元素的特点，代码display:inline-block就是将元素设置为内联块状元素。(css2.1新增)，<img>、<input>标签就是这种内联块状标签
	
inline-block元素特点：
	
	1、和其他元素都在一行上；
	2、元素的高度、宽度、行高以及顶和底边距都可设置。

#####6.5 边框
	盒子模型的边框就是围绕着内容及补白的线，这条线你可以设置它的粗细、样式和颜色(边框三个属性)

**语法：** `块标签 { border: 边框粗细  样式  颜色;}`

<p> <code> 
	块标签 { <br>
	border-width: 2px;<br>
	border-style:solid;<br>
	border-color:red;<br>
}</code></p>

**注意：**

	1、border-style（边框样式）常见样式有：
	dashed（虚线）| dotted（点线）| solid（实线）。

	2、border-color（边框颜色）中的颜色可设置为十六进制颜色，如:
	border-color:#888;//前面的井号不要忘掉。

	3、border-width（边框宽度）中的宽度也可以设置为：
	thin | medium | thick（但不是很常用），最常还是用象素（px）。

######单面设定边框
**语法：**`标签 {border-bottom/top/right/left: 边框粗细 样式 颜色; }`

#####6.6 宽度和高度
	盒模型宽度和高度和我们平常所说的物体的宽度和高度理解是不一样的，css内定义的宽（width）和高（height），指的是填充以里的内容范围。

<img src="http://img.mukewang.com/539fbb3a0001304305570259.jpg">

#####6.7 填充
	元素内容与边框之间是可以设置距离的，称之为“填充”。填充也可分为上、右、下、左(顺时针)。

**语法：**`块标签 { padding: 上 下 左 右;}`

#####6.8 边界
	元素与其它元素之间的距离可以使用边界（margin）来设置。边界也是可分为上、右、下、左。

**语法：**`块标签 { margin: 上 右 下 左;}`
	
如果四面的距离都相同可以写成如下形式：	
`块标签 { margin: num px;}`	
如果上下，左右的值相同：	
`块标签 { margin: num_up_down px num_left_right px;}`



######padding和margin的区别，padding在边框里，margin在边框外。
<hr>
####7. 布局模型
	在网页中，元素有三种布局模型：
	1、流动模型（Flow）
	2、浮动模型 (Float)
	3、层模型（Layer）

#####7.1 流动模型
	流动（Flow）是默认的网页布局模式。也就是说网页在默认状态下的 HTML 网页元素都是根据流动模型来分布网页内容的。
	
流动布局模型具有2个比较典型的特征：
	
	第一点，块状元素都会在所处的包含元素内自上而下按顺序垂直延伸分布，因为在默认状态下，块状元素的宽度都为100%。实际上，块状元素都会以行的形式占据位置。如右侧代码编辑器中三个块状元素标签(div，h1，p)宽度显示为100%。
	第二点，在流动模型下，内联元素都会在所处的包含元素内从左到右水平分布显示。（内联元素可不像块状元素这么霸道独占一行）
	
#####7.2 浮动模型
	设置元素浮动就可以实现这一愿望。任何元素在默认情况下是不能浮动的，但可以用CSS定义为浮动，如div、p、table、img等元素都可以被定义为浮动。如下代码可以实现两个div元素一行显示。

**语法：**` 块标签 { float: left/center/right; }`	

#####7.3 层模型
	层布局模型就像是图像软件PhotoShop中非常流行的图层编辑功能一样，每个图层能够精确定位操作，但在网页设计领域，由于网页大小的活动性，层布局没能受到热捧。但是在网页上局部使用层布局还是有其方便之处的。
	
层模型有三种形式：
	
	1、绝对定位(position: absolute)
	2、相对定位(position: relative)
	3、固定定位(position: fixed)
	
	