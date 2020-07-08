[TOC]

#### 一、在vscode中配置ts的自动编译功能

1、在项目的根目录运行tsc --init 来生成一个ts的配置文件tsconfig.json，生成之后进入配置文件，需要修改其中配置项outDir的值，你可以指定其编译之后的路径。

2、点击vscode的菜单 任务(Terminal)->运行任务->点击tsc：监视tsconfig.json文件然后就可以自动生成代码


#### 二、数据类型

在ts中，为了保证编码的规范性和维护性，ts新增的类型校验。

目前存在的数据类型如下
- 布尔类型
- 数字类型
- 字符串类型
- 数组类型
- 元组类型
- 枚举类型
- 任意类型
- null和undefined
- viod类型
- never类型

```typescript
// 布尔类型
var flag:boolean = true;

// flag = 123; // 错误的写法

// 数字类型
var num:number = 123;

// 字符串类型
var str:string = 'string'

// 数组类型 两种方式定义数组
var arr_1:number[] = [123, 11] // 表示数组中的数据都是number类型

var arr_2:Array<number> = [12, 123] // 第二种定义方式

// 元组方式定义 元组属于数组的一种，即可以在数组中支持多种数据类型，元组中的类型顺序要和结果一一对应
var arr:[number, string] = [1, 'string']

// 枚举类型，在程序中用自然语言中相应含义的单词代表某一状态，程序将会很容易阅读和理解。
enum Flag {
    success = 1, 
    error = 2
}

let s:Flag = Flag.success;

// 任意类型 any ，定义后赋值可以是任意类型的数据
var anyval:any = 123;

anyval = 'str';  // 不会报错


// null 和 undefined 数据类型的子类型
// 如果定义变量的时候没有赋值，会直接报错，那么可以在定义的时候可以直接给定义成undefined
var num:undefined;

// 也可以以或的形式定义
var num:undefined | number;

// 一个元素可能是多个类型
var num:null | undefined | number;


// viod 类型 ，在ts中的void表示没有任何类型，一般用于定义方法的时候方法没有返回值

// es5的写法
function run() {
    console.log('run');
}

run();

// 表示方法没有返回任何类型
function run():void {
    console.log('run')
}
run();


// never类型，代表从不会出现的值
var a:never;

a = 123; // 错误的写法

a = (() => {
    throw new Error('错误')
})

```

#### 三、函数的定义

es5的函数定义方法

```javascript
// 一般声明
function run() {

}

// 匿名式函数
var run = function() {

}
```

ts的声明方式，传参要指定类型，返回内容要指定返回类型

```typescript
// 指定了函数的返回类型，返回值要保持一致，否则会报错
function run():string {
    return '123'
}

// 匿名函数定义方式，和之前是一样的只是需要保证有类型即可。
var fun = function():number {
    return 123
}

// 定义方法传参，传参定义类型，返回值也定义是何种数据类型
function getInfo(name: string, age: number):string {
    return `${name}:${age}`
}

// 可选参数，在形参后添加问好表示此参数是可选的。
function getInfo(name: string, age?: number):string {
    return `${name}:${age}`
}

// 默认参数，在调用方法的时候可以默认指定参数的值
// 注意的是，默认参数是在函数被调用的时候如果没有传参才会使用默认值，如果有传参的话就会使用传递的参数
function getInfo(name: string, age: number=20):string {
    return `${name}:${age}`
}

// 剩余参数，使用三点运算符来接受传递过来的值
// 意思是拿到函数传参的时候的number数组
function sum(...nums:number[]):number {
    var sum = 0;
    for (var i=0; i < nums.length; i++) {
        sum = sum+nums[i];
    }
    return sum;
}

sum(1, 2, 3, 4)


// 函数重载
// Java中方法的重载指两个或两个以上的同名函数，但传参不一样，这时会出现函数重载的情况。
// typescript中的重载，通过为同一个函数提供多个函数类型定义来试下多种功能的目的
// 在es5中同名的方法会被覆盖掉 
function css(config) {
    return {}
}

function css(config, value) {
    return {}
}

// 在typescript中的重载功能
function getInfo(name:string):string;
function getInfo(age:number):string;
function getInfo(str: any):any {
    if (typeof str === 'string') {

    } else {
        return '123'
    }
}
// 此时getInfo('张三')|getInfo(20) 正确
// getInfo(true) // 错误

```

#### 四、es5中的类

```javascript
// 创造一个构造函数以及在其原型链上创建方法
function Person(name, sex) {
    this.name = name,
    this.sex = sex,
    this.run = function() { // 实例方法
        console.log(this.name + '在运动');
    }
    this.work = function() { // 实例方法
        console.log(this.name + '在内部工作');
    }
}

// 注意：原型链上面的属性会被多个实例共享，构造函数不会共享
Person.prototype.sex = '女';
Person.prototype.work = function() {
    console.log(this.name + '在工作');
}
Person.prototype.play = function() {
    console.log(this.name + '在游玩');
}

// 静态方法的名字可以和实例方法的名字一样，实例方法需要创建实例才能调用，静态方法可以直接调用
Person.getInfo = function() { 
    console.log('静态方法')
}

// 创建实例
var p = new Person('张三', '男');
console.log(p.sex);
console.log(p.work()) // 在查找方法的时候，首先会查找构造函数内部的方法，其次再查找原型链上的方法。

Person.getInfo(); // 调用静态方法

// 继承类（es5继承的方式分为原型链、对象冒充的方式）

// 1、对象冒充
function Son() {
    Person.call(this); // 对象冒充的方式实现继承，但是无法继承原型链里面的属性和方法
}

var s = new Son();
s.run();  // 可以执行
s.play(); // 执行失败

// 2、原型链继承，既可以继承构造函数里面的属性和方法，也可以继承原型链上面的属性和方法。
function Son() {

}
Son.prototype = new Person();

var s = new Son();
s.run(); // 可以执行 
s.play(); // 可以执行  
// 原型链继承的方式，在实例化原型的时候是无法给父类传递参数的。
var s = new Son(name, age); // 这种实例化方式父类是拿不到值的


// 3、原型链+对象冒充组合方式来继承
function Son(name, sex) {
    Person.call(this, name, sex);
}
Son.prototype = new Person();

```

#### 五、typescript中的类

```typescript
class Person {
    name:string; // 定义属性，省略了public关键字

    constructor(name:string) { // 构造函数，在实例化的时候触发的方法
        this.name = name;
    }

    run():string {
        return `${this.name}在运动`
    }

    getName():string {
        return this.name;
    }

    setName(name:string):void {
        this.name = name;
    }
}
var p = new Person('张三');
p.run();

// ts继承的实现 extends, super
class Son extends Person {
    constructor(name:string) {
        super(name); // 调用父类的构造函数
    }

    run():string {
        return `子类，${this.name}在运动`
    }
}

var s = new Son('李四');

// 父类的方法和子类的方法一致
s.run(); // 如果父子都有同一个方法，则会优先执行子类的方法。

```

#### 六、类里面的修饰符
```typescript
// 定义属性的时候提供三种修饰符 
public // 公有，类里面、子类、类外面都可以访问
protected // 在类里面、子类里面可以访问，类外面不可以访问
private // 类里面可以访问，子类和类外部不可访问
// 类外部是指不可被创建的实例直接点出 例如 p.name

class Person {
    name:string; // 定义属性，省略了public关键字
    protected age:string;
    private tall:string;

    constructor(name:string) { // 构造函数，在实例化的时候触发的方法
        this.name = name;
        this.age = '28';
        this.tall = 178;
    }

    run():string {
        return `${this.name}在运动`
    }

    getName():string {
        return this.name;
    }

    setName(name:string):void {
        this.name = name;
    }
}

class Son extends Person {
    constructor(name:string) {
        super(name); // 调用父类的构造函数
    }

    run():string {
        return `子类，${this.name}在运动`
    }
}

var s = new Son('李四');
console.log(s.name); // public是可以完全被访问到的
console.log(s.age); // 受保护类型不可以直接被外部使用，
console.log(s.tall); // 私有类型只能在父类内部使用
```

#### 七、静态属性、静态方法、抽象类、多态
Q: 为什么会出现静态方法呢？
以jQuery为例子进行讲解
```javascript
// jQuery中的api有 $('#box').css('color', 'red') 和 $.get('url', function() {})这两种
function $(element) {
    return new Base('element');
}

$.get(url, callback) { // get方法
    ......
}

function Base(element) {
    this.element = element;

    this.css = function(attr, value) {
        this.element.style.attr = value;
    }
}

$('#box').css('color', 'red');

$.get('url', function() {})
```

静态属性和静态方法
```typescript
class Person {
    public name:string;
    static age:string;
    constructor(name:string) {
        this.name = name;
        this.age = 28;
    }

    run():string {
        console.log(this.name + '在跑步')
        return this.name + '在跑步';
    }

    work():string {
        console.log(this.name + '在工作');
        return `${this.name}在工作`;
    }

    // es6 静态方法无法直接调用类里面的属性，需要在类中定义静态属性，
    static sleep():string {
        return this.age + '在睡觉'; 
    }
}
```
多态：父类定义一个方法不去实现，让继承它的子类去实现，每个子类有不同的表现叫做多态。多态的意义是运行时代码区不同。
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    eat() {
        console.log('吃的方法')
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    eat() {
        return this.name + '吃肉';
    }
}

class Cat extends Animal {
    constructor(name:string) {
        super(name);
    }

    eat() {
        return this.name + '吃老鼠';
    }
}
```

抽象方法和抽象类：它是提供其他类继承的基类，不能直接被实例化。用abstract关键字定义的抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
```typescript
// abstract抽象方法只能放在抽象类中
// Animal这个类要求它的子类必须包含eat方法
// 抽象类和抽象方法是定义标准
abstract class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract eat(): any;
}

// var a = new Animal(); // 错误的写法，抽象类不可被实例化

class Dog extends Animal {
    constructor(name: string) {
        super(name)
    }

    eat(): string { // 子类必须实现父类的eat方法
        return this.name + '吃狗粮';
    }
}

var d = new Dog('dog');

console.log(d.eat())

```

#### 八、接口（定义标准）
接口是一种规范的定义，它定义了行为和动作规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。ts中的接口类似于Java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

- 属性类接口
- 函数类型接口
- 可索引接口
- 类类型接口
- 接口扩展

1、属性接口，json的约束
```typescript
// 自定义方法传入参数，对json进行约束
function printLabel(LabelInfo: {label:string}):void {
    console.log('有点东西')
}


printLabel({label: '哈哈'});

// printLabel({label: '哈哈', name: '张三'}) // 错

// 接口方式
interface Name {
    age?:number;
    firstName:string;
    lastName:string;
}

function printName(name: Name):void {
    console.log(name.firstName + ' . ' + name.lastName);
}

printName({
    firstName: '张',
    lastName: '三'
})
```

ajax的封装
```typescript
interface Config {
    type: string;
    url: string;
    data?: string;
    dataType: string
}

function ajax(config: Config) {
    var xhr = new XMLHttpRequest();

    xhr.open(config.tyope, config.url, 'true');

    xhr.send(config.data);

    xhr.onreadystatechange = function() {
        
        if (xhr.readyState == 4 && xhr.status == 200)
            console.log('成功')
    }
}

ajax({
    type: 'get',
    url: 'http://www.baidu.com',
    dataType: 'json'
})
```

2、函数类接口，对方法传入的参数以及返回值进行约束。
```typescript
interface encrypt {
    // 对传参进行约束，函数使用必须符合我的约束
    (key: string, value: string): string; 
}

var md5: encrypt = function (key: string, value: string): string {
    // 模拟md5
    return key + value;
}
```

3、可索引接口，数组或对象的约束。
```typescript
// 对数组的约束
interface userArray {
    // 意思是索引值应该是number，值是string类型
    [index:number]:string
}
var arr:userArray = ['asd']

// 对象约束
interface userObj {
    [index:string]:string;
}

var obj:userObj = {
    name: 'zhangsan'
}
```

4、类类型接口，对类的约束。

```ts
// 对于软件设计可以约束开发，必须按照接口的设计来实现类

interface Animal {
    name: string;
    eat(str: string): void;
}

// Dog类实现接口，必须实现接口的内容
class Dog implements Animal {
    name: string
    constructor(name:string) {
        this.name = name;
    }

    eat() { // 实现类的方法，可以不传参数
        console.log(this.name + '吃东西');
    }
}

var dog = new Dog('小狗');

dog.eat();
```

5、接口的扩展
```ts
interface Animal {
    eat():void;
}

interface Person extends Animal {
    work():void;
}

// Web 必须实现Person和Animal这两个接口
class Web implements Person {
    name:string;
    constructor(name:string) {
        this.name = name;
    }

    eat() {
        console.log(this.name + '喜欢吃');
    }

    work() {
        console.log(this.name + '在工作')
    }
}
```

#### 九、泛型
在软件开发中，代码不禁要创建一支的定义良好的API，同时也要考虑可重用性。组件不禁能够支持当前的数据类型，同时也能支持未来的数据类型。这在创建大型系统是为你提供了十分灵活的功能。

在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。

通俗理解：泛型就是解决类、接口、方法的复用性、以及对不特定数据类型的支持。

##### 简单的泛型使用

```typescript
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity(68, "Semlinker"));

```

##### 泛型接口

```typescript
// 这个里面的类型变量V和M只要有效的字母就可以
interface Identities<V, M> {
    num: V,
    str: M
}

function identity<T, U>(num: T, str: U): Identities<T, U> {
    console.log(`num: ${typeof num}`)
    console.log(`str: ${typeof str}`)
    let identities: Identities<T, U> = {
        num,
        str
    }

    return identities
} 

// 在调用过程中，可以切换传参的类型，这样在定义形参的类型的时候就不必写入any
identity(123, '12312')
identity('123', 12312)
```

##### 泛型类

```ts
interface GenericInterFace<U> {
    value: U;
    getVal: () => U
}

class IdentityClass<T> implements GenericInterFace<T> {
    value: T;

    constructor(value: T) {
        this.value = value
    }

    getVal(): T {
        return this.value
    }
}

// 在实例化的时候，类会根据传递的类型去限制接口内属性的各种类型
const numberClass = new IdentityClass<Number>(123);
console.log(typeof numberClass.getVal())

const stringClass = new IdentityClass<string>('123');
console.log(typeof stringClass.getVal())
```

##### 泛型约束

###### 确保属性的存在

有时候，我们希望类型变量
