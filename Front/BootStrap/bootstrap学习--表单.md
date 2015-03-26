##Bootstrap学习--表单
####2015-03-24

###基本表单
* 首先向父表单`<form>`元素添加**role='form'**
* 把标签和控件放在一个带有**class.form-group**的`div`中，这样可以获取最佳间距。
* 向所有的文本元素`<input>`, `<textarea>`,`<select>`中添加**class.form-control**。

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link href="../bower_components/bootstrap/dist/css/bootstrap.css">
</head>
<body>
    <form role="form">
        <div class="form-group">
            <label for="name">名称</label>
            <input type="text" class="form-control" id="name" placeholder="请输入名称">
        </div>
        <div class="form-group">
            <label for="'inputfile">文件输入</label><br/>
            <input type="file" id="'inputfile">
            <p class="help-block">这里是块级帮助文本的实例</p>
        </div>
        <div class="checkbox">
            <label><input type="checkbox">请打勾</label>
        </div>
        <button type="submit" class="btn btn-default">提交</button>
    </form>

</body>
</html>
```
**实例：**
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link href="../bower_components/bootstrap/dist/css/bootstrap.css">
</head>
<body>
    <form role="form">
        <div class="form-group">
            <label for="name">名称</label>
            <input type="text" class="form-control" id="name" placeholder="请输入名称">
        </div>
        <div class="form-group">
            <label for="'inputfile">文件输入</label><br/>
            <input type="file" id="'inputfile">
            <p class="help-block">这里是块级帮助文本的实例</p>
        </div>
        <div class="checkbox">
            <label><input type="checkbox">请打勾</label>
        </div>
        <button type="submit" class="btn btn-default">提交</button>
    </form>

</body>
</html>

###内联表单
	创建内联表单中的元素都是向左对齐，标签是并排的，<form>中需要添加class.form-inline

* 默认情况，Bootstrap 中的 input、select 和 textarea 有 100% 宽度。在使用内联表单时，您需要在表单控件上设置一个宽度。
* 使用 class .sr-only，您可以隐藏内联表单的标签。

```
<form class="form-inline" role="form">
   <div class="form-group">
      <label class="sr-only" for="name">名称</label>
      <input type="text" class="form-control" id="name" 
         placeholder="请输入名称">
   </div>
   <div class="form-group">
      <label class="sr-only" for="inputfile">文件输入</label>
      <input type="file" id="inputfile">
   </div>
   <div class="checkbox">
      <label>
      <input type="checkbox"> 请打勾
      </label>
   </div>
   <button type="submit" class="btn btn-default">提交</button>
</form>
```
**例子**	：
<img src='http://www.w3cschool.cc/wp-content/uploads/2014/06/inlineform_demo.jpg'>

###水平表单
**需要进行水平布局**	
* 父标签`<form>`中添加**class.form-horizontal**	
* 把标签和控件放在一个带有**class.form-group**的`div`中。	
* 向标签添加**class.control-label**


###表单支持控件
	ootstrap 支持最常见的表单控件，主要是 input、textarea、checkbox、radio 和 select。
####输入框
	最常见的表单文本字段是输入框 input。用户可以在其中输入大多数必要的表单数据。Bootstrap 提供了对所有原生的 HTML5 的 input 类型的支持，包括：text、password、datetime、datetime-local、date、month、time、week、number、email、url、search、tel 和 color。适当的 type 声明是必需的，这样才能让 input 获得完整的样式。

####复选框(CheckBox)和单选框(Radio)
复选框和单选按钮用于让用户从一系列预设置的选项中进行选择。

* 当创建表单时，如果您想让用户从列表中选择**若干个**选项时，请使用 checkbox。如果您限制用户只能选择**一个**选项，请使用 radio。
* 对一系列复选框和单选框使用** .checkbox-inline 或 .radio-inline class**，控制它们显示在同一行上。


<div>
   <label class="checkbox-inline">
      <input type="checkbox" id="inlineCheckbox1" value="option1"> 选项 1
   </label>
   <label class="checkbox-inline">
      <input type="checkbox" id="inlineCheckbox2" value="option2"> 选项 2
   </label>
   <label class="checkbox-inline">
      <input type="checkbox" id="inlineCheckbox3" value="option3"> 选项 3
   </label>
   <label class="checkbox-inline">
      <input type="radio" name="optionsRadiosinline" id="optionsRadios3" 
         value="option1" checked> 选项 1
   </label>
   <label class="checkbox-inline">
      <input type="radio" name="optionsRadiosinline" id="optionsRadios4" 
         value="option2"> 选项 2
   </label>
</div>

####选择框

* 使用`<select>`展示列表选项
* 使用**multiple= *multiple **:`<select multiple class="form-control">`

**例子**
<html>
<head>
   <title>Bootstrap 实例 - 选择框</title>
   <link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
   <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
   <script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
</head>
<body>

<form role="form">
   <div class="form-group">
      <label for="name">选择列表</label>
      <select class="form-control">
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>4</option>
         <option>5</option>
      </select>
      <label for="name">可多选的选择列表</label>
      <select multiple class="form-control">
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>4</option>
         <option>5</option>
      </select>
   </div>
</form>

</body>
</html>

<hr>
###静态控件

####表单控件状态
**输入框焦点：**		
	当输入框接收到**:focus**时， 输入框的轮廓会被移除，同时应用box-shadow

**禁用的字段集：**		
	如果您想要禁用一个输入框 input，只需要简单地添加 disabled 属性，这不仅会禁用输入框，还会改变输入框的样式以及当鼠标的指针悬停在元素上时鼠标指针的样式。

**验证状态：**		
Bootstrap 包含了错误、警告和成功消息的验证样式。只需要对父元素简单地添加适当的 class（.has-warning、 .has-error 或 .has-success）即可使用验证状态。

**表单控件大小：**		
您可以分别使用 class .input-lg 和 .col-lg-* 来设置表单的高度和宽度
```
 <div class="row">
      <div class="col-lg-2">
         <input type="text" class="form-control" placeholder=".col-lg-2">
      </div>
      <div class="col-lg-3">
         <input type="text" class="form-control" placeholder=".col-lg-3">
      </div>
      <div class="col-lg-4">
         <input type="text" class="form-control" placeholder=".col-lg-4">
      </div>
   </div>
   
```
 <div class="row">
      <div class="col-lg-2">
         <input type="text" class="form-control" placeholder=".col-lg-2">
      </div>
      <div class="col-lg-3">
         <input type="text" class="form-control" placeholder=".col-lg-3">
      </div>
      <div class="col-lg-4">
         <input type="text" class="form-control" placeholder=".col-lg-4">
      </div>
   </div>
   
 **表单帮助文本：**		
 Bootstrap 表单控件可以在输入框 input 上有一个块级帮助文本。为了添加一个占用整个宽度的内容块，请在` <input> `后使用 .help-block。	
 
 ```
 <form role="form">
   <span>帮助文本实例</span>
   <input class="form-control" type="text" placeholder="">
   <span class="help-block">一个较长的帮助文本块，超过一行，
   需要扩展到下一行。本实例中的帮助文本总共有两行。</span>
</form>
 ```	
  
  <form role="form">
   <span>帮助文本实例</span>
   <input class="form-control" type="text" placeholder="">
   <span class="help-block">一个较长的帮助文本块，超过一行，
   需要扩展到下一行。本实例中的帮助文本总共有两行。</span>
</form>