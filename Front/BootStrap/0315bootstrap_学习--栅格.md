#Bootstrap 学习--栅格
####2015-03-15
@(土鳖的学习笔记)
###栅格布局
    该布局方法是通过一系列的行(row)和列(col)来进行排布创建页面的。

    
首先，行和列要包含在容器(container)之中。以便为其赋予合适的排列(aligment)和内补(padding).使用行在水平方向创建一组列元素。我们所要布局的内容应该都放在列元素内。即，列元素都是行的**子元素**。

**代码栗子：**
```
<div class='container'>
    <div class='row'> 
        <!-- 内部都是列元素 -->
        <div class='col-xs-4'>
            <h2 class='page-header'>
                
<!--page-header是Bootstrap用于表示标题的-->
            </h2>
            <p>这是列内元素</p>
        </div>
        <div class='col-xs-4'>
            <p>这是列内元素</p>
        </div>
        <div class='col-xs-4'>
            <p>这是列内元素</p>
        </div>
    </div>
</div>

```
####列元素的设置
![enter image description here][1]
由上图可知，列的属性选择可以是多样的。所以我们一般可以对列设置多个属性。

`<div class='col-md-5 col-xs-3...还可以根据不同情况在后面进行设置'>`

>Bootstrap中将网页分为12格，所以col后面的数字带便占几个格位置.
如果设置多个col,Bootstrap会根据适用类型不同自行进行选择的。

####列偏移
可以通过`col-md-offset-*`的方法来进行位置侧移。与上面差不多，就是进行 * 个格数的偏移。
####嵌套列
我们可以在已有的列元素内继续定义 `row` 和 `col`来进行嵌套类型。
**切记， 嵌套列所包含的列应该小于等于12**
####列排序
两种方法：
`col-md-push-*`向后跳跃 * 个栅格
`col-md-pull-*`向前跳跃 * 个栅格

  [1]: http://images.cnitblog.com/blog/401119/201311/03180040-3aa5f467848c4e67a02bb7d7f3138492.png
  