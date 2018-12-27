1、创建一个对象并通过字面定义变量的方式添加两个属性

```
let a = new Object();

a.name = 'hehe';
a.age = 18
```

2、通过object内置方法添加属性


```
Object.defineProperty(obj, prop, descriptor)

Object.defineProperty(a, 'time', {
    value: '123'
})
```

另外还有三个特性描述的属性值是可选的，如果没有写默认是false。

writable 设置当前属性值是否是可写入的

enumerable 设置属性是否是可以被枚举

configurable 设置当前属性是否是可以删除的

存取数值描述

set 设置当前属性值方法

get 获取属性值的方法

注意：set和get不时必须成对出现的，不设置的时候会被定义成undefined，但是在严格模式下是需要成对出现的。

3、添加多个属性


```
Object.defineProperties(obj, props)

example:

Object.defineProperties(a, {
    time1: {
        value: 1,
        // 设置time1是可以被改写的
        writable: true
    },
    time2: {
        value: 2,
        // 设置time2是可以被枚举的
        enumerable: true
    },
    time3: {
        value: 3,
        // 设置time3是可以被删除掉
        configurable: true
    }
})
```

get和set方法就不在做赘述

