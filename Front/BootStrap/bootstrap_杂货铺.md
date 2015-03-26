##Bootstrap 杂货铺

#####错误警告类

has-error类用于表示输入错误，或者格式错误等等。

##### 导航栏标签代码
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
                    <!--divider样式通过生成一个分割线将元素上下间距扩大-->
                    <li><a href="#">AAAA</a></li>
                    <li class="divider"></li>
                    <li><a href="#">BBBB</a></li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
```


##### 主内容和侧边栏
```
	<div id='content' class='row-fluid'>
	  	<div class='span9 main'>
    		<h2>Main Conte****nt Section</h2>
    		<p>主内容</p>
  		</div>
  		<div class='span3 sidebar'>
  		  <h2>Sidebar</h2>
    		<p>侧边栏</p>
  		</div>
	</div>	
```