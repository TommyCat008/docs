JavaScript的超集，基于ES6.
#### 1、安装全局的TypeScript

```
npm i -g typescript
```

#### 2、使用命令编译.ts文件为.js文件

```
tsc XXX.ts
```

#### 3、类型注解

TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。

```
// 给函数的参数添加数据类型的注解
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

参数的传递规则，必选参数、可选参数以及默认参数。可选参数要放在必选参数的后面以及默认参数的前面。

```
<!--三种传参方式的介绍-->
functiontest(a:string, b?:string, c:string="hhh") {

    console.log(a);

    console.log(b);

    console.log(c);

}
```

可以使用的类型
number string boolean any(可以是任何类型的数据) void(声明方法，说明方法不需要返回值)

#### 接口 interface 

这里我们使用接口来描述一个拥有firstName和lastName字段的对象。 在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements语句。

```
<!--声明属性-->
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

greeter(user);
```
在调用greeter方法的时候，传参必须是interface中定义好的接口内容（多传或者少传都要保证和interface中的一致），否则会报错。

声明函数，必须要==实现implements==接口的关键字

```
interface Animal {
    eat();
}

class Sheep implements Animal {
    eat() {
        console.log('sheep eating');
    }
}

class Monkey implements Animal {
    eat() {
        console.log('monkey eating')
    }
}
```

#### 类 class 自定义类型


```
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

greeter(user);
```

访问控制符： 默认的是public、私有化private 、受保护的protected。
- public可以被任意访问
- private 私有化只能在类的内部被访问
- protected 在类里和子类中可以访问

注意在构造函数里面填写参数的时候，如果构造函数里面没有定义this.name=name并且不填写public关键字的话，类里面的方法是无法访问name的。需要解决的方法就是定义一个public，或者在class类中定义name并在constructor中进行this.name = name赋值操作;
只能是一下两种方式：

```
class Shape {

    name: string;

    constructor(name: string) {
        this.name = name;
    };
}
```
```
class Shape {

    constructor(public name: string) {
        
    };
}
```
#### 继承 extends

继承一个已存在的类并创建一个派生类，继承使用关键字 extends

```
class Shape {

    area: number;
    color: string;

    constructor(public name: string, width: number, height: number) {
        this.area = width * height;
        this.color = "pink";
    };

    shoutout() {
        return "I'm " + this.color + " " + this.name + " with an area of " + this.area + " cm squared.";
    }
}

class Shape3D extends Shape {
 
    volume: number;
 
    constructor ( public name: string, width: number, height: number, length: number ) {
        super( name, width, height );
        this.volume = length * this.area;
    };
 
    shoutout() {
        return "I'm " + this.name +  " with a volume of " + this.volume + " cm cube.";
    }
 
    superShout() {
        return super.shoutout();
    }
}
 
var cube = new Shape3D("cube", 30, 30, 30);
console.log( cube.shoutout() );
console.log( cube.superShout() );
```

- Shape3D 继承了 Shape 类, 也继承了 Shape 类的 color 属性。
- 构造函数中，super 方法调用了基类 Shape 的构造函数 Shape，传递了参数 name, width, 和 height 值。 继承允许我们复用 Shape 类的代码，所以我们可以通过继承 area 属性来计算 this.volume。
- Shape3D 的 shoutout() 方法重写基类的实现。superShout() 方法通过使用 super 关键字直接返回了基类的 shoutout() 方法。
- 子类的构造函数constructor必须要调用父类的构造函数


#### 泛型 generic

参数化的类型，一般是用来限制集合的内容，指定存放的元素类型。以<>来表示

```
class Greeter<T> {
    greeting: T;
    constructor(message: T) {
        this.greeting = message;
    }
    greet() {
        return this.greeting;
    }
}

let greeter = new Greeter<string>("Hello, world");

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function() {
    alert(greeter.greet());
}
```
注意定义传参的类型是class的时候，其子类也是可以被接受的。

#### 模板字符串

可以使用以下的方式来拆分模板内的传参，template会是一个数组，而name和age会是在模板中的参数。
```
function test(template, name, age) {
    console.log(template);
    console.log(name);
    console.log(age);
}

var name = '张三';

var age = '18';

test`hellp,i'm ${name}, my age is ${age}`
```