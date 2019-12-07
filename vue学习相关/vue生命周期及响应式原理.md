# 生命周期
#### vue的生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

![image](https://image-static.segmentfault.com/174/175/1741752219-59c9b774a4ccf_articlex)


###### 1、在beforeCreate和created钩子函数之间的生命周期

在这个生命周期之间，进行初始化事件，进行数据的观测，可以看到在created的时候数据已经和data属性进行绑定（放在data中的属性当值发生改变的同时，视图也会改变）。
注意看下：此时还是没有el选项

###### 2、created钩子函数和beforeMount间的生命周期

这个阶段需要判断el的存在与否，如果存在则会继续进行编译，如果不存在则停止编译。在找到el之后，会继续向下查找template选项，如果存在template选择则使用，如果没有则会找到外部的HTML作为编译模版。

render函数的影响：因为render函数可以直接嵌入元素，所以可以在vue中使用render函数来生成一个HTML结构。
```
new Vue({
    el: '#app',
    render: function(createElement) {
        return createElement('h1', 'this is createElement')
    }
})
```

综上可以得出模板渲染的优先级为： render函数 > template > outer HTML

![image](https://image-static.segmentfault.com/773/928/773928444-59cb1f246d6ad_articlex)

###### 3、beforeMount和mounted 钩子函数间的生命周期

![image](https://image-static.segmentfault.com/197/486/1974863472-59cb4828a3f69_articlex)

有图可以看出，此阶段是在给vue的实例添加$el属性。

###### 4、mounted

mounted的生命周期即是已经完成了DOM的渲染，说明vue已经将数据替换。

###### 5、beforeUpdate钩子函数和updated钩子函数间的生命周期

![image](https://image-static.segmentfault.com/153/997/1539974278-59cb4e4838c57_articlex)

在此期间，beforeUpdate之前数据值接受改变，改变之后会修改vNode的date数值。分发完成之后进入beforeUpdate和updated之间开始异步渲染DOM。（因为数据变化的更新是生成了一个队列，所以在队列完成所有render之后也即是一次tick之后，才能做下一步的DOM操作。）

官方资料解释异步更新DOM：

Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

###### 6、beforeDestroy和destroyed钩子函数间的生命周期

![image](https://image-static.segmentfault.com/210/502/2105024588-59cb530314697_articlex)

beforeDestroy钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。
destroyed钩子函数在Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
销毁的顺序是父组件先进入beforeDestroy，然后其子组件开始进入beforeDestroy，紧接着销毁之后进入destroyed，最后父组件进入destroyed钩子函数。

# 响应式原理


##### 参考文档

钩子函数执行的顺序 https://blog.csdn.net/huangyilinnuli/article/details/83929539

vue的生命周期详解 https://segmentfault.com/a/1190000011381906
