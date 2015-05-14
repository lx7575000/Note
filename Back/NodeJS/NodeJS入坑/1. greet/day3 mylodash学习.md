#day3 Node.JS入坑mylodash学习

###2015-05-06

###Function are Value

JS中的函数只是一种特殊的对象，它同时也可以增添各种千奇百怪的类型。

```
var foo = function() {};
foo.a = 1;
foo.a // => 1
```

不过与其他对象不同的一点是，它的**length**和**name**两个对象是不可以更改的。其他的与任意对象没有差别。

```
function bar(a,b,c)  {

}

bar.name; // => "bar"
bar.length; // => 3

bar.name = "foo";
bar.namel # => "bar"
bar.length = 0;
bar.length; # => 3
```


Function 中可以传递返回另一个函数， 它可以是匿名的闭包函数，也可以其他的函数类型。由此就可以显示出，JS中的Function也是一种**值类型**。

```
function generateFunction() {
  return function() { ... }
}

// create a function in a function
function outterFunction() {
  function innerFunction() {
    ...
  }

  innerFunction();
}
```

###闭包的理解

	返回函数的函数，内部的这个函数会 capture 外部函数在那一刻的状态，内部的这个函数就叫做闭包。

闭包在我的理解中有点类似于存在于外部函数中的内部函数，需要使用到外部Function中所定义的变量值，可以根据不同的情况生成不同值类型的版本。如下代码中，闭包函数用到了不同需求所设定的不同的**counter**值。最后Function中返回值还是Function类型。

即，当我们调用外部函数时，它会根据我们的要求生成一个**scope**，其中的内部函数，会使用这个**scope**中所指定的值。正如下面的不同**scope**中counter的值不相同，我们的内部函数`increment`和`decrement`会使用我们调用生成版本的**couter值**

```
function makeCounter (val) {
	var counter = val;
	

	return [
		function increment () {
		counter ++ ;
		console.log('counter : ' + counter);
		return counter;
	},

	function decrement () {
		counter --;
		console.log('counter : ' + counter);
		return counter;
	}
	];
};

var counter = makeCounter(5);
var counter1_inc = counter[0];
var counter1_dec = counter[1];

// create a second counter that starts with 10
var counter2 = makeCounter(10);
var counter2_inc = counter2[0];
var counter2_dec = counter2[1];
```

###Create the mylodash package

1. 首先生成package.json 和 做好git的初始化，并且项目名称为**mylodash**。
2. 然后加入调错的工具**mocha**和**Chai**


创建最基础的`index.js`的 **package文件**

```
in index.js add

var _ = {

};

module.exports = _;
```

下面我会根据要求逐渐完成，lodash的功能。
从Github上拖下来一个调试文件，然后根据调试的要求，完成我们的各个小模块。

```
git clone https://github.com/hayeah/fork2-nodejs-mylodash-spec spec
```

	To complete a task, you need to:

	1. Understand the feature that you are implementing.
	2. Implement the feature.
	3. Pass the test.

#### Once
这个模块的作用是使注册的函数，只能够被执行一次。即，将一个函数注册到**once**当中，它其中会有一个状态变量，通过它来控制，使注册其中的函数只在第一次调用的时候被执行。

```
_.once = function(fn){
	var invoked = false;
	return function(){
		if(invoked){
			return 1;
		}else{
			invoked = true;
			return fn();
		}
	};
};
```

#### Memoize

#### bind
// 需要重新理解一下**this**，再来写这一部分的笔记才好。