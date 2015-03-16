##Swift Skills Accumulation

###《Swift by Tutorials》
###2015.01.30
1. 在swift中，所有的数字类型在进行数学运算时必须要描述清楚你想要转换成为的类型，否则编译器会报错。
不会像c++等语言那样自动转换，要自己说明。
>var radius = 4		
let pi = 3.14159	
var area = Double(radius) * Double(radius) * pi

2. Swift中的switch case 语句中必须要加入default以防止出现意外情况能有应对措施。

3. 在Swift中声明string类型，所做初始化也必须是string类型，注：nil不是string类型，所以
> var str = nil //这么声明是会报错的。


###2015.01.31
1. Swift中的数组是强类型的，与C++中的数组相同，只能容纳同一类型的元素，所以对于用惯了OC的同学来说可能很是不习惯（还好LZ学的是C++）。不过其另一个特点是Swift会自动推导初始化时所使用的元素类型，所以这是懒人的福音啊。（不过还是推荐自己来定义类型才好。）
>	var array:[Int] = [1, 2, 3, 4, 5]

2. Swift中的字典的定义方式：
> var dictionary:[Int: String] = [1 : "Dog", 2 : "Cat"]

3. Swift中的字典和数组都是复制传递，即A复制给B后，改变B中元素，对A没有任何影响。


###2015.02.01
####Class and Struct
1. 在Xcode中，如果想要给UIView设定圆边角，要在Identity Inspector中的User Defined Runtime Attribute中增加layer.cornerRadius属性，然后Type设定为Number。后面的值根据需要来另行设定。

2. Swift中的结构体可以和类一样定义方法。(早就知道可以的，不过作者特意强调，我也就记一下好了) :)

3. **Swift中class类型为引用传递，而struct类型为值传递。**

4. **convenience initializer**，convenience  关键字用于表示这个初始化函数并不是全部由自己来完成的，而是通过借助其他非convenience的初始化函数来完成的。

#####2015.02.02
1. class 的**extension**是用于添加附加的功能给类。同时，struct也可以添加 extension。个人理解的extension就是为了给项目添加一些个人对于类功能的临时个人需求，这些功能在该项目之外不会再必需或者需求会改变。不需要把class的内容扩充使项目负担加重。

2. **final**关键字用于说明需要修饰的该类不存在子类。

3. Swift中class的三种属性
>• **Public**: Everything has access.		• **Internal**: Only other code within the same target (library or app) has access. This is the default access level.		• **Private**: Only the single source file has access.
####2015.02.04
1. Swift中的 **subscript**关键字是由setter和getter方法组成的.（不一定两种方法都有，可以仅有setter或getter方法）>		
	**例：关键字查找	**		subscript(key: KeyType)->ValueType?{		
        get{		
            return self.dictionary[key]		
        }		
        set{		
            if let index = find(self.array, key){		
            }else{		
                self.array.append(key)		
            }        
            self.dictionary[key] = newValue
        }
    }
    
    			
	>    **例：下表查找	**	
    subscript(index:Int)->(KeyType, ValueType)	
    {	
        get{	
            precondition(index < self.array.count, "Index out-of-bounds")	
            let key = self.array[index]		
  /Volumes/KINGSTON/25605_by_waikeung/3.mpg          let value = self.dictionary[key]!	
            return (key, value)	
        }
    }
    2. 	**Swift中的precondition方法类似于assert方法。用于提前差错控制**
	>语法：precondition(判断条件，“出错时的报错提示”)		PS：第二个字符串为可选参数
	
	>> **The difference between precondition with assertion**	
	>>The difference between the two is that assertions are compiled out in release builds, whereas preconditions are not. Assertions are designed to catch bugs during development, whereas preconditions are designed to throw fatal errors when a condition that must be true, is not.
	

###2015.02.06
####Function and Closure
1. Swift中的函数定义都是全局性的，即整个项目都可以调用。这点和Class与Struct中的方法刚好相反。

2. 虽然可能没什么用，但是还是记录下来。Swift中的Void类型函数返回值，可以被认为返回的是一个空的元组类型。
>**typealias   Void = ()		**

3. Swift中默认传递给函数的参数为常量不可以被改变

###2015.02.08
####Enum and Switch
1. Swift 中的 枚举类型可以为String类型，但是如果要将其定义为**非Int类型**的话，则其中的没个元素都**必须进行初始化**，否则编译器会报错 