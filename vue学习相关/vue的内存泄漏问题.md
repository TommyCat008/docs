JS 程序的内存溢出后，会使某一段函数体永远失效（取决于当时的 JS 代码运行到哪一个函数），通常表现为程序突然卡死或程序出现异常。

这时我们就要对该 JS 程序进行内存泄漏的排查，找出哪些对象所占用的内存没有释放。这些对象通常都是开发者以为释放掉了，但事实上仍被某个闭包引用着，或者放在某个数组里面。

#### 泄漏点

1、DOM/BOM 对象泄漏；

2、script 中存在对 DOM/BOM 对象的引用导致；

3、JS 对象泄漏；

5、通常由闭包导致，比如事件处理回调，导致 DOM 对象和脚本中对象双向引用，这个是常见的泄漏原因；

#### 关注点

1、DOM 中的 addEventLisner 函数及派生的事件监听，比如 Jquery 中的 on 函数，Vue 组件实例的 $on 函数;（在vue中通过Bus.$on事件绑定消息不会因为组件的销毁而清除事件，因此在使用on事件之前需要使用off来清除掉之前监听的事件）

2、其它 BOM 对象的事件监听， 比如 websocket 实例的 on 函数;

3、避免不必要的函数引用；

4、如果使用 render 函数，避免在 HTML 标签中绑定 DOM/BOM 事件;

#### 如何处理

1、如果在 mounted/created 钩子中使用 JS 绑定了 DOM/BOM 对象中的事件，需要在 beforeDestroy 中做对应解绑处理；

2、如果在 mounted/created 钩子中使用了第三方库初始化，需要在 beforeDestroy 中做对应销毁处理（一般用不到，因为很多时候都是直接全局 Vue.use）；

3、如果组件中使用了 setInterval，需要在 beforeDestroy 中做对应销毁处理；

#### vue组件中处理addEventListener

调用 addEventListener 添加事件监听后在 beforeDestroy 中调用 removeEventListener 移除对应的事件监听。为了准确移除监听，尽量不要使用匿名函数或者已有的函数的绑定来直接作为事件监听函数。

例子如下：
```javascript
mounted() {
    const box = document.getElementById('time-line')
    this.width = box.offsetWidth
    this.resizefun = () => {
      this.width = box.offsetWidth
    }
    window.addEventListener('resize', this.resizefun)
},
beforeDestroy() {
    window.removeEventListener('resize', this.resizefun)
    this.resizefun = null
}
```

#### 观察者模式引起的内存泄漏

在 spa 应用中使用观察者模式的时候如果给观察者注册了被观察的方法，而没有在离开组件的时候及时移除，可能造成重复注册而内存泄漏；

举个栗子：进入组件的时候 ob.addListener("enter",_func)，如果离开组件 beforeDestroy 的时候没有 ob.removeListener("enter",_func)，就会导致内存泄漏。

更详细的栗子参考：德州扑克栗子

#### 上下文绑定引起的内存泄漏

```javascript
var ClassA = function(name) {
    this.name = name
    this.func = null
}

var a = new ClassA("a")
var b = new ClassA("b")

b.func = bind(function() {
    console.log("I am " + this.name)
}, a)

b.func()
// 输出: I am a

a = null // 释放a
// b = null;        // 释放b
// b.func = null;   // 释放b.func

function bind(func, self) {
    // 模拟上下文绑定
    return function() {
        return
        func.apply(self)
    }
}
```
