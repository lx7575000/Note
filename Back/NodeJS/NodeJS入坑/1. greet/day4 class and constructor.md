#day4 JS constructor and Class

```
function Foo() {
  this.a = 10;
}
Foo.prototype.b = 20;
foo = new Foo();
foo2 = new Foo();
foo.a // => 10
foo.b // => 20
foo.b = 30
foo.b // => 30

foo2.a // => 10
foo2.b // => 20
Foo.prototype.b = 40;
foo.b // => ?
foo2.b // => ?
```

	Question1: What is foo.constructor?

	Question2: Why is foo2.b 20 even though you didn't assign a value to it?

	Question3: What are the values of foo.b and foo2.b after you assign 40 to Foo.prototype.b?
	
Answer1： foo.constructor 就是Foo本身。

Answer2:  这是因为JS的原型链向上查找特性，我们在上面设定了**Foo.prototype.b = 20**。由于生成的**foo2**本身不存在**b**这个属性，所以JS会向上查找它的prototype，发现在上一级中有b这个属性的设定，且值为20，就将该值返回给了调用的命令。因此，foo2中的b属性其实是上一级父类中的属性调用。

Answer3: 因为**foo.b**的值重新设定过了，这意味着在对象**foo**中，重新添加了一个属性**b**。根据JS对象的原型链向上查找原理，因为对象本身已经存在了所需查找的属性，就不需继续向上查找了。相反，**foo2**因为没有重新进行赋值，所以对象本身依然不存在属性**b**，故此时**foo2.b**的值为40.