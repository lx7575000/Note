##iOS 学习 杂货

###2015-03-21
###白胡子老爷爷Swift视频第二讲中出现的什么gui

#####NSNumberFormatter  数字格式设定
创建了一个我们自己设定的输出格式，通过创建一个NSNumberFormatter实例对象，然后设置自己需要的数字格式类型，接着将需要输入的数字放入进行初始化。最后出锅，上菜。。		
<a href='http://www.cnblogs.com/yingkong1987/archive/2013/03/11/2953774.html'>具体的直接上链接好了，人家写的很明白了，包括了具体的几种格式类型</a>	

#####numberFromString		将字符串形式的数字转换成为真正意义上的数字

```
var stringNumber = "1234"
var numberFromString = stringNumber.toInt()
println(numberFromString)
```
如上述例子中的toInt可以将字符串数字转变为整形数字，同理可以知道应该有必然会有转换成带有小数点类型的方法。		
**字符串字母什么的是绝对不可以转换成数字的，这点一定要明白。**		
#####doubleValue 又是OC的知识
它属于OC的NSNumber类型，是OC的特有类型，doubleValue，其实可以理解为是对C语言中的都变了类型的封装。		

#####Closure