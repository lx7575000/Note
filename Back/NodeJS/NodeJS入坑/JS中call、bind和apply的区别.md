#JS中call(), bind()和apply()的各自特点和不同

###2015-05-08


####call和apply的区别

首先先说些区别较小的：**call() 和 apply()**

两者的唯一区别是：**call调用参数用正常的参数引用形式，而apply则是通过将所有参数放入一个数组当中，然后将该数组以参数引用的形式传入其中。**

####call和apply的作用

call的语法形式：

```
obj1.call(obj2, [parameter1, parameter2, ...]);
```

apply的语法形式：

```
obj1.apply(obj2, parameter1, parameter2, ...);
```

上文已经说明了，apply和call作用相同，只有一点点区别。
现在说明他们的作用：obj1可以理解为是一个对象的方法，它要调用obj2作为其作用域。即，令该方法中的`this === obj2`(可以理解为，将obj1放入到obj2中来执行）。后面的**parmeterX**则是作为传入方法obj1中的参数。

**注：obj2的位置可以为空，此时JS会默认认为，作用域为全局global。**

####bind()作用
**With "bind()" method, we can set the context of a function. So in the future we can invoke this function variant without specifying the context when invoked.**



我对于**bind**的理解是，当你想要在一个方法能在后面的某个时段运行在**特定**的作用域的时候，推荐来使用它。

```
var fun = obj1.method
fun.bind(obj2) 
或者 
fun.bind({fun内所调用方法需要用到的属性值})
```

例子：

```
function Person(name, age){
	this._name = name;
	this._age = age;
};

Person.prototype.say = function(){
	return ('Hello ' + this._name;);
};

var textperson = new Person('tom', 22);
var fun = textperson.say;
//fun方法其实就是textperson.say

fun.bind(textperson);
//fun将作用域绑定在testperson之中，可以使其查找到_name属性，否则输出的_name属性值为undefined
console.log(fun());
fun.bind({_name : 'tom'});
//与前者不同之处在于，我们没有将作用域放到textperson中，而是为其_name属性重新赋值。作用域为fun本身。
console.log(fun());
```