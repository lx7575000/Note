#JS封装、继承总结

###2015-05-11

###封装

封装的基本要求是：

1. **实例与原型之间要有联系**
2. **防止代码重复（类似于工厂模式）**
3. **生成的实例之间要有内在联系（即是同一原型对象的实例）**

所以我们创造了`构造函数模式`：

####构造函数模式

构造模式最通俗的解释就是内部使用的是`this变量`，对构造函数使用`new运算符`生成新实例。并且`this`变量会被绑定在生成的实例对象上。

**注： 生成的对象实例中会自动含有一个constructor，它指向构造函数本身。**

```
function Constructor(val, exp){
	this.val = val;
	this.exp = exp;
}

var obj = new Constructor(1, 2);
/*
此时生成的obj实例对象内部的this就是指向obj对象本身。
即在obj内部可以认为obj.val === this.val
*/
```

**另外：JS提供了一个大杀器 `instanceof` 可以用来检验原型构造函数对象和实例对象的关系。**

```
console.log(obj instanceof Constructor) 
// true
```

当然，构造函数也是存在其缺点的。因为方法的功能是不变的，所以没有必要每次创建新对象就要把方法的代码重新复制给每一个对象（**浪费内存**，和虽然少但仍真实存在的**复制方法花费的时间**），可以令所有对象共用一个方法，只是改变传入的参数值即可。因此，构造函数方法仍需要被我们改进，这样原型链思想就被引入了。

#### Prototype模式

JS规定每个构造函数(**其实应该是每个对象，但具体只有在构造函数中才会应用到**)都具有一个prototype属性，指向另一个对象。这个对象(构造函数的prototype)的所有属性和方法都会被构造函数的实例继承。

**这时，推荐的做法是将不变可以共用的方法放到构造函数的prototype上，而每个对象私有的属性放在构造函数本身。**

```
function Animal(name, age){
	this.name = name;
	this.age = age;
};

Animal.prototype.say = function(words){
	console.log(words);
};
Animal.prototype.type = '哺乳动物'

var obj = new Animal('Tom', 2);
obj.say('Meum....');
```

#####检验prototype的验证方法
* `isPrototypeOf()`		
	
	该方法是用来判断实例和某个**prototype对象**之间关系的。

```
console.log(Animal.prototype.isPrototypeOf(obj));
//true
```

* `hasOwnProperty()`		
	这个方法是用来判断某一属性是本地属性还是继承自prototype对象的属性。
	
```
console.log(obj.hasOwnProperty('name'));
//true
console.log(obj.hasOwnProperty('type'));
//false
```

* `in`运算符
	`in运算符`可以用来判断某个实例是否属于含有某个属性（不管是本地，还是prototype上的。`in`会向上追朔搜寻）。
	
	`in`运算符的另一个作用是，循环遍历对象的所有**属性**(注意是属性哦！)。

```
for(var key in obj){
	console.log(key + ' : ' + obj[key]);
};
/*
	name : Tom,
	age : 1,
	type : 哺乳动物
*/
```

###构造函数的继承

```
function Person(){
};
Person.prototype.species = 'Human';

function Student(name, age){
	this.name = name;
	this.age = age;
};
```

**如上代码所示，想要Student 继承 Person的内容，该如何做比较好。**
####1. 构造函数绑定
最简单的方法是使用`call`或者`apply`方法，将父对象的构造函数绑定在子对象上。

```
function Student(id, class){
	Person.apply(this, arguments);
	this.id = id;
	this.class = class;
}
//此时就可以通过Student实例直接调用Person的各种属性。
```

####2. prototype模式（推荐）
使用prototype属性，令Student的prototype对象，指向一个**Person实例（注意是实例）**,则所有的Student实例就能继承Person。

```
Student.prototype = new Person('lx', 19);
//完全删除prototype对象原来的值，继承Person赋予的新值。
Student.prototype.constructor = Student;

```
任何一个prototype对象都必备一个constructor属性。更重要的一点是，每个实例对象同样也有一个constructor属性，**默认会调用prototype对象的constructor属性。**

所以在运行完第一行代码之后，obj.constructor也指向Person。

```
obj.constructor == Student.prototype.constructor
//true
```

这样做会导致原型继承链的紊乱，所以我们就通过**第二行**来手动纠正。之后，构造器重新指向Student。

**切记： 如果替换了prototype对象，那么下一步必然是为新的prototype对象添加上constructor属性，让它重回正途，指回原来的构造函数。**

```
o.prototype = {};
o.prototype.constructor = o;
```

####3. 直接继承prototype(不推荐)

即令Student对象的prototype直接继承Person的prototype。

```
Student.prototype = Person.prototype;
Student.prototype.constructor = Student;
var obj = new Student('Tom', 19);
```

**优点：**效率高，不需要建立Person实例，节省内存。

**缺点：**Student.prototype 和 Person.prototype现在指向同一个对象，因此对Student.prototype的任意修改都会影响到Person.prototype。

因此上述代码的第二行：
`Student.prototype.constructor = Student;`其实会将Person.prototype对象的constructor也修改掉了。

####4. 利用空对象做中介，实现继承（极力推荐）
因为上一种方法存在缺点，所以又想出了通过空对象作为中介来间接的继承。

```
var F = function(){};

F.prototype = Person.prototype;
Student.prototype = new F();
Student.prototype.constructor = Studnet;
```

F是个空对象，所以几乎不会占内存。此时修改的Student的prototype对象，就不会影响到Person.prototype对象了。

```
封装成函数：

function extend1(child, parent){
	var F = function(){};
	
	F.prototype = parent.prototype;
	child.prototype = new F();
	child.prototype.constructor = child;
	child.uber = parent.prototype; 
}
```

函数的最后一行：
`child.uber = parent.prototype; `	
意思是为子对象设定一个**uber属性**，这个属性可以直接指向父对象的prototype属性。这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质（用处不大）。


####5. 拷贝继承
这种方法是将所有父对象的方法和属性拷贝过来，实现继承。

```
function extend2(child, parent){
	var p = parent.prototype;
	var c = child.prototype;
	for(var key in p){
		c[key] = p[key];
	}
	c.uber = p;//可以无视
}
```

###非构造函数的继承

所谓非构造函数就是两个对象都是普通对象，不是构造函数。因此无法使用构造函数的方法实现继承。

####1. object方法

```
function object(o){
	var F = function(){};
	F.prototype = o;
	return new F();
}
```
上面这个函数就是将子对象的prototype属性指向了父对象。从而使子对象与父对象联系在一起。

首先现在父对象的基础上生成子对象：

```
var Student = object(Person);
```

然后加上子对象本身的属性：

```
Student.name = 'Tom';
Student.age = 11;
```

此时，子对象已经全部继承了父对象的属性。

####2. 浅拷贝
将父对象的属性全部拷贝给子对象，也可以实现继承。

```
function extendCopy(p){
	var c = {};
	
	for(var key in p){
		c[key] = p[key];
	}
	c.uber = p;
	
	return c;
}
```

**缺点：**如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能（子对象直接复制了父对象的prototype）。

####3. 深拷贝（推荐）
所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要**递归**调用"浅拷贝"就行了。

```
function deepCopy(p, c){
	var c = c || {};
	
	for(var i in p){
		if(typeof p[i] === 'object'){
			c[i] = (p[i].constructor === Array) ? [] : {};
		}else{
			c[i] = p[i];
		}
	}
	return c;
}
```

这样就可以重新为子对象生成一个新的对象或数组，以后子对象的修改不会影响到父对象的内容了。