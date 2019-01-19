#### 一、vue的概念及核心思想

##### 概念 
1、vue并不是一个框架

2、vue可以结合周边的生态构成一个灵活、渐进式的框架。

##### 核心思想

1、数据驱动

2、组件化

##### 实现双向绑定的方式

Object.defineProperty()

[戳我查看原理实现](http://note.youdao.com/noteshare?id=10f36469c68873e7e3d521c65892000e)

#### 二、vue的基础知识

##### 模板语法

```
- Mustache语法： {{ masg }}
- HTML赋值：v-html=""
- 绑定赋值：v-bind:id="" :id=""
- 使用表达式：{{ok ? "yes" : "no"}}
- 文本赋值：v-text=""
- 指令：v-if="" ...
```

##### 条件渲染

```
- v-if
- v-else
- v-else-if
- v-show
- v-cloak  页面加载太快没办法显示的时候可以使用，条件渲染的功能
```

##### 事件处理器

```
- v-on:click
- v-on:click.stop 阻止冒泡
- v-on:click.stop.prevent 阻止默认的事件，即阻止按钮默认的功能：submit、a:href
- v-on:click.self div对象本身绑定事件，如果div有子元素，子元素是没有点击事件的
- v-on:click.once 执行一次
- v-on:keyup.enter | tab | delete | esc | space | up | left 等键盘事件
```

##### 组件

```
- 全局组件和局部组件
- 父子组件通信 
-   1. 父组件传值给子组件通过 prop 来传递
-   2. 子组件传值给父组件通过 emit 来传递
- slot
```
[戳我查看父子通信示例](http://note.youdao.com/noteshare?id=a037f46cbe7d77d1398464eaf3293e23)

#### 三、vue-router的功能

##### 安装
1、以直接引入/CND的方式引用vue-router

```
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>
```
2、npm方式安装

```
npm install vue-router
```
在工程中引用vue-router组件

```
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

##### 使用
1、在HTML中使用路由

```
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

2、在JavaScript中配置模板

```
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```
3、在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由

```
// Home.vue
export default {
  computed: {
    username () {
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
```

##### 动态路由匹配
1、使用场景
有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用『动态路径参数』

示例代码，根据点击不同的url会得到相应的url的参数

```
<div id="app">
  <p>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/bar">/user/bar</router-link>
  </p>
  <router-view></router-view>
</div>
```

```
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

可以在一个路由中设置多个参数，都会匹配到路由中

模式 | 匹配路径	 | $route.params
---|---| ---
/user/:username | /user/evan | { username: 'evan' }
/user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: 123 }

##### 嵌套路由
1、<router-view> 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 <router-view>。例如，在 User 组件的模板添加一个 <router-view>

2、具体示例

```
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <p>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/foo/profile">/user/foo/profile</router-link>
    <router-link to="/user/foo/posts">/user/foo/posts</router-link>
  </p>
  <router-view></router-view>
</div>
```

```
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        // 以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
        { path: '', component: UserHome },
				
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})

const app = new Vue({ router }).$mount('#app')
```

##### 编程式导航
1、除了使用 <router-link> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。
```
router.push(location, onComplete?, onAbort?)
```
注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。

2、当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。

声明式 | 编程式
---|---
<router-link :to="..."> | router.push(...)

```
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

3、跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

```
router.replace(location, onComplete?, onAbort?)
```

声明式 | 编程式
---|---
<router-link :to="..." replace> | router.replace(...)

##### 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。

```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```
要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：

```
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```
这跟代码调用 router.push() 是一回事：

```
router.push({ name: 'user', params: { userId: 123 }})
```

##### 命名视图
有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar（侧导航） 和 main（主内容） 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。
```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置（带上 s）：

```
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

##### 导航守卫

1、全局守卫

```
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
每个守卫方法接收三个参数：

to: Route: 即将要进入的目标 路由对象

from: Route: 当前导航正要离开的路由

next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。

2、全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身

```
router.afterEach((to, from) => {
  // ...
})
```

3、路由独享的守卫

在路由配置上直接定义 beforeEnter 守卫
```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

4、组件内的守卫

路由组件内直接定义以下路由导航守卫

```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
注意：beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```
注意：beforeRouteEnter 是支持给 next 传递回调的唯一守卫。对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了。

```
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```
用于在用户未进行保存操作之前调用

```
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

##### 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

#### 四、异步请求插件Axios

任性地略0.0

#### 五、ES6的常用语法知识

##### 模板字符串
以反引号(`)来替代原来的引号，极大地简化了原来在拼接字符串时使用引号的操作。变量赋值不需要以++来拼接，而是直接以${}的方式赋值。

##### 对象的解构赋值
在代码中出现如下写法的时候即是使用了解构赋值的操作，此时的对象属性没有顺序，变量和属性同名。

```
let data = {
    name,
    age,
    kalss
}
...
等同于
...
let data = {
    name: name,
    age: age,
    kalss: kalss
}
```

##### 箭头函数
那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。

```
// good
[1, 2, 3].map((x) => {
  return x * x;
});

// best
[1, 2, 3].map(x => x * x);
```


##### class类
ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。
基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

var point = new Point(1, 2);
point.toString();
```




#### 六、vuex的使用

##### 安装并引入vuex功能包

##### 创建相关的js文件并引入到main.js文件中

```
//main.js内部对store.js的配置
import store from '"@/store/store.js' 
//具体地址具体路径
new Vue({
    el: '#app',
    store, //将store暴露出来
    template: '<App></App>',
    components: { App }
});
```

```
// store.js内部的配置内容
import Vue from 'vue'; //首先引入vue
import Vuex from 'vuex'; //引入vuex
Vue.use(Vuex) 

export default new Vuex.Store({
    state: { 
        // state 类似 data
        //这里面写入数据
    },
    getters:{ 
        // getters 类似 computed 
        // 在这里面写个方法
    },
    mutations:{ 
        // mutations 类似methods
        // 写方法对数据做出更改(同步操作)
    },
    actions:{
        // actions 类似methods
        // 写方法对数据做出更改(异步操作)
    }
})
```
-----配置完成-----

##### 开始使用vuex

```
state:{
    goods: {
        totalPrice: 0,
        totalNum:0,
        goodsData: [
            {
                id: '1',
                title: '好吃的苹果',
                price: 8.00,
                image: 'https://www.shangdian.com/static/pingguo.jpg',
                num: 0
            },
            {
                id: '2',
                title: '美味的香蕉',
                price: 5.00,
                image: 'https://www.shangdian.com/static/xiangjiao.jpg',
                num: 0
            }
        ]
    }
},
gettles:{ 
    //其实这里写上这个主要是为了让大家明白他是怎么用的，
    totalNum(state){
        let aTotalNum = 0;
        state.goods.goodsData.forEach((value,index) => {
            aTotalNum += value.num;
        })
        return aTotalNum;
     },
     totalPrice(state){
        let aTotalPrice = 0;
        state.goods.goodsData.forEach( (value,index) => {
            aTotalPrice += value.num * value.price
         })
         return aTotalPrice.toFixed(2);
    }
},
mutations:{
    reselt(state,msg){
        console.log(msg) //我执行了一次；
        state.goods.totalPrice = this.getters.totalPrice;
        state.goods.totalNum = this.getters.totalNum;
    },
    reduceGoods(state,index){ 
        //第一个参数为默认参数，即上面的state,后面的参数为页面操作传过来的参数
        state.goodsData[index].num-=1;
        
        let msg = '我执行了一次'
        this.commit('reselt',msg);
    },
    addGoods(state,index){
        state.goodsData[index].num+=1;
        
        let msg = '我执行了一次'
        this.commit('reselt',msg);
        /**
            想要重新渲染store中的方法，一律使用commit 方法 
            你可以这样写 commit('reselt',{
                state: state
            })
            也可以这样写 commit({
                type: 'reselt',
                state: state 
            })
            主要看你自己的风格
        **/
    }
},
actions:{
    //这里主要是操作异步操作的，使用起来几乎和mutations方法一模一样
    //除了一个是同步操作，一个是异步操作，这里就不多介绍了，
    //有兴趣的可以自己去试一试
    //比如你可以用setTimeout去尝试一下
}
```

##### 模板文件写入方式(方式一)

```
<template>
    <div id="goods" class="goods-box">
        <ul class="goods-body">
            <li v-for="(list,index) in goods.goodsData" :key="list.id">
                <div class="goods-main">
                    <img :src="list.image">
                </div>
                <div class="goods-info">
                    <h3 class="goods-title">{{ list.title }}</h3>
                    <p class="goods-price">¥ {{ list.price }}</p>
                    <div class="goods-compute">
                        <!--在dom中使用方法为：$store.commit()加上store.js中的属性的名称，示例如下-->
                        <span class="goods-reduce" @click="$store.commit('reduceGoods',index)">-</span>
                        <input readonly v-model="list.num" />
                        <span class="goods-add" @click="$store.commit('addGoods',index)">+</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="goods-footer">
            <div class="goods-total">
                合计：¥ {{ goods.totalPrice }}
                <!--
                    如果你想要直接使用一些数据，但是在computed中没有给出来怎么办？
                    可以写成这样
                    {{ $store.state.goods.totalPrice }}
                    或者直接获取gettles里面的数据
                    {{ $store.gettles.totalPrice }}
                -->
            </div>
            <button class="goods-check" :class="{activeChecke: goods.totalNum <= 0}">去结账({{ goods.totalNum }})</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Goods',
        computed:{
            goods(){
                return this.$store.state.goods;
            }
        }
    }
</script>
```

##### 模板文件写入方式(方式二)

```
<!--goods.vue 购物车页面-->
<template>
    <div id="goods" class="goods-box">
        <ul class="goods-body">
            <li v-for="(list,index) in goods.goodsData" :key="list.id">
                <div class="goods-main">
                    <img :src="list.image">
                </div>
                <div class="goods-info">
                    <h3 class="goods-title">{{ list.title }}</h3>
                    <p class="goods-price">¥ {{ list.price }}</p>
                    <div class="goods-compute">
                        <span class="goods-reduce" @click="goodsReduce(index)">-</span>
                        <input readonly v-model="list.num" />
                        <span class="goods-add" @click="goodsAdd(index)">+</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="goods-footer">
            <div class="goods-total">
                合计：¥ {{ goods.totalPrice }}
                <!--
                    gettles里面的数据可以直接这样写
                    {{ totalPrice }}
                -->
            </div>
            <button class="goods-check" :class="{activeChecke: goods.totalNum <= 0}">去结账({{ goods.totalNum }})</button>
        </div>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations} from 'vuex';
    /**
        上面大括弧里面的三个参数，便是一一对应着store.js中的state,gettles,mutations
        这三个参数必须规定这样写，写成其他的单词无效，切记
        毕竟是这三个属性的的辅助函数
    **/
    
    export default {
        name: 'Goods',
        computed:{
            ...mapState(['goods']) 
            ...mapGetters(['totalPrice','totalNum'])
            /**
                ‘...’ 为ES6中的扩展运算符，不清楚的可以百度查一下
                如果使用的名称和store.js中的一样，直接写成上面数组的形式就行，
                如果你想改变一下名字，写法如下
                ...mapState({
                    goodsData: state => stata.goods
                })
                
            **/
        },
        methods:{
            ...mapMutations(['goodsReduce','goodsAdd']),
            /**
                这里你可以直接理解为如下形式,相当于直接调用了store.js中的方法
                goodsReduce(index){
                    // 这样是不是觉得很熟悉了？
                },
                goodsAdd(index){
                    
                }
                好，还是不熟悉，我们换下面这种写法
                
                onReduce(index){ 
                    //我们在methods中定义了onReduce方法，相应的Dom中的click事件名要改成onReduce
                    this.goodsReduce(index)
                    //这相当于调用了store.js的方法，这样是不是觉得满意了
                }
                
            **/
        }
    }
</script>
```


#### 七、项目的线上部署
