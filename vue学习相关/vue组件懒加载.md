### 在路由里面使用懒加载的方式引入组件

使用require的方式进行组件的加载

```
import NotFound from './views/404'

// 首页内容
import Home from "./views/Home";

import IndexPage from "./views/index/index";

export default [
    {
        path: '/404',
        component: NotFound,
        name: 'notFound'
    },
    {
        path: '/',
        component: Home,
        name: 'home',
        children: [
            {
                path: 'index',
                component: IndexPage,
                name: 'indexpage'
            }
        ]
    },
    {
        path: '/jobs',
        component: resolve => require(['./views/Jobs'], resolve),
        name: 'jobs'
    },
    {
        path: '/news',
        component: resolve => require(['./views/news'], resolve),
        name: 'news'
    },
]

```

使用如上方法，在打包的时候会打包出两个js文件，但是名字却是不可控的。但是会从main.js中抽离出来引入的组件。

1、但是使用以上的方式生成异步组件js的时候，浏览器加载的时候会报错。
2、报错 Cannot read property 'call' of undefined 
3、不知道这个错误是在哪里，预估是因为webpack在找相应的模板标识符的时候出错了
4、终于找到原因了，是和css样式抽离插件冲突了，把webpack.common.js中相关css的抽离代码改一下，就能在浏览器上展示了。
```
    {
        test: /\.css$/,
        // use: [{
        //     loader: 'style-loader'
        // },
        // {
        //     loader: 'css-loader'
        // }],
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
    },
    {
        test: /\.scss$/,
        // 注意 是sass-loader ，不是 scss-loader
        // use: ['style-loader', 'css-loader', 'sass-loader']
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
        })
    },
```
5、使用上面这个方法有一个问题，就是图片的引入不正确的问题又出现了，不知道如何解决呢。

### 在组件中引入组件时使用懒加载