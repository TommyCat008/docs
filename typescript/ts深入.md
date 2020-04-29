#### 一、在vscode中配置ts的自动编译功能

1、在项目的根目录运行tsc --init 来生成一个ts的配置文件tsconfig.json，生成之后进入配置文件，需要修改其中配置项outDir的值，你可以指定其编译之后的路径。

2、点击vscode的菜单 任务(Terminal)-》运行任务 点击tsc：监视tsconfig.json文件然后就可以自动生成代码


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

// 在typescript中的重载
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