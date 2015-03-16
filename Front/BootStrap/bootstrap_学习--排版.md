##Bootstrap 学习--排版
###2015-03-16
@(土鳖的学习笔记)
#### 标题`head`

Html中的所有标签从`<h1>`到`<h6>`都可以使用。
    
`page-header`是专门用于标题标签的样式。
<h3 class='page-header'> page-header</h4>

标题中还可以包含`<small>`标签，用于作为副标题，同时也可应用于作为小号文本。
```
<h1>主标题</h1>
<small>副标题</small>
```
<h3>h3主标题</h3><small>这里是副标题</small>
<hr>

#### 主体`body`
##### 主体段落字体
Bootstrap中的`.lead`样式来让段落显示突出。
**举个栗子：**
```
<p class='lead'>
例子样式
</p>
```
<p class='lead'>
例子样式
</p>
<hr>
#####文本小号字体：
`.small`类型可以用于作为小号文本字体而使用。其字体大小为父容器字体的**85%**而存在。
<p style='font-size = 20px'>
字体大小为20px<br/>
<small>小号字体</small>
</p>
#####斜体和粗体：
而对于`em`, `strong`在此不多做详述。

#####对齐class
可以在标签中直接添加属性来将文本进行对齐。
<p class='text-center'>中间对齐</p>
<p class='text-left'>左对齐</p>
<p class='text-right'>右对齐</p>
```
<p class='text-center'>中间对齐</p>
<p class='text-left'>左对齐</p>
<p class='text-right'>右对齐</p>
```

#####强调class
```
<h1>强调Class</h1>
    <p class="text-muted">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
    <p class="text-primary">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
    <p class="text-success">.Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
    <p class="text-info">Maecenas sed diam eget risus varius blandit sit amet non magna..</p>
    <p class="text-warning">Maecenas sed diam eget risus varius blandit sit amet non magna..</p>
    <p class="text-danger">.Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
    <h1></h1>
```
<h4>强调Class</h4>
<p class="text-muted">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
<p class="text-primary">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
<p class="text-success">.Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
<p class="text-info">Maecenas sed diam eget risus varius blandit sit amet non magna..</p>
<p class="text-warning">Maecenas sed diam eget risus varius blandit sit amet non magna..</p>
<p class="text-danger">.Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
<hr>

#####缩略图

当鼠标悬停在缩写和缩写词上时就会显示完整内容，Bootstrap实现了对HTML的<abbr>元素的增强样式。缩略语元素带有title属性，外观表现为带有较浅的虚线框，鼠标移至上面时会变成带有“问号”的指针。如想看完整的内容可把鼠标悬停在缩略语上, 但需要包含title属性。

<p class='text-center'>
<abbr title="attribute">缩略图例子</abbr>
</p>
**为缩略语添加.initialism可以将其font-size设置的更小些。**
<p class='text-center'>
<abbr title="HyperText Markup Language" class="initialism">缩略图另一个例子，有木有觉得有点小了？</abbr>
</p>
##### 地址格式`address`
`<address>`标签用于来显示地址类型内容。
**栗子：**
<p class='text-center'>
<address>
  <strong>Twitter, Inc.</strong><br>
  795 Folsom Ave, Suite 600<br>
  San Francisco, CA 94107<br>
  <abbr title="Phone">P:</abbr> (123) 456-7890
</address>
</p>

#####引用选项`blockquote`
    命名来源:添加<small>标签来注明引用来源。来源名称可以放在<cite>标签里面.
```
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
</blockquote>
```
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
</blockquote>
> 与.text-right 相似的另一个类型为.pull-right可以具有相同的右对齐功能。由此类推，必然有.pull-left的功能。

####列表
**无样式列表**
`.list-unstyled`用于移除列表的样式，搞得就和段落没什么区别了。感觉没什么用处的样式。
<ul class='list-unstyled'>
    <li>行一</li>
    <li>行二</li>
    <li>行三</li>
</ul>

**描述：**
直接上代码： `dl` `dt` `dd`三个标签。
```
<dl>
      <dt>.Lorem ipsum dolor sit amet</dt>
      <dd>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet</dd>
</dl>
```
<dl>
      <dt>.Lorem ipsum dolor sit amet</dt>
      <dd>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet</dd>
</dl>
**水平排列的描述**
.dl-horizontal可以让`<dl>`内短语及其描述排在一行。开始是像`<dl>`默认样式堆叠在一起，随着导航条逐渐展开而排列在一样。
```
<dl class='dl-horizontal'>
      <dt>.Lorem ipsum dolor sit amet</dt>
      <dd>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet</dd>
</dl>
```
<dl class='dl-horizontal'>
      <dt>.Lorem ipsum dolor sit amet</dt>
      <dd>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet</dd>
</dl>
