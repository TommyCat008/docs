### 一、安装一系列的模块

```
npm i webpack --save-dev

<!--引用4.0以上版本之后就提示要安装这个脚手架，不然不让玩。-->

npm i webpack-cli --save-dev  

```

### 二、如何处理vue模板文件

准备工作就绪后，首先考虑如何处理vue模板文件。这里需要用到vue-loader这个依赖项，所以。。装它。

```
npm install vue-loader --save-dev
```
然后执行webpack命令webpack --config webpack.common.js，发现会报错。

```
查了一下这个错误的解释相关，说了具体原因在于vue-loader在15.0版本之后的话都是需要伴生 VueLoaderPlugin的，因此需要在webpack的配置文件的头部引入vue-loader的相关的插件。

vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.

以上问题的解决方法：

const VueLoaderPlugin = require('vue-loader/lib/plugin');

在plugin中初始化VueLoaderPlugin

new VueLoaderPlugin()

```
然后再次运行webpack命令，发现又遇到了坑啊。。。

```
vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.

这个错误意思是说没有安装vue-template-compiler这个依赖项，那就抱着试一试的态度安装一下。

npm install vue-template-compiler --save-dev
```
安装完成之后，再次尝试着编译一下，发现阔以了。

### 三、babel处理js文件

现在使用es6的语法比较多了，所以使用babel转码是必须的。

首先是安装一下三个依赖文件。

1、安装babel-loader、babel-core、babel-preset-env

```
npm i babel-loader babel-core babel-preset-env --save-dev
```

2、安装完成之后需要在项目的根目录下创建一个.babelrc

3、然后在webpack的配置文件里面添加转换js文件的引用

完成以上的操作之后，写几个es6的语法，然后webpack编译一下试试看：

果然又出错了

```
babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.

这个提示说两个依赖的版本不匹配，babel-core配不上babel-loader，所以升级一下babel-core

npm i -D @babel/core

然后卸载老的babel-core

npm un babel-core
```

接着尝试着编译一下，愉快地发现可以了！

### 四、css的打包和抽离，以及sass的编译。

1、首先需要安装一下三个css的依赖 style-loader css-loader sass-loader

```
npm i style-loader css-loader sass-loader --save-dev
```

2、然后在webpack的配置文件中配置一下css的引用

3、如果需要分离出css文件单独加载的话，需要用到extract-text-webpack-plugin这个插件，安装之后需要在plugins中创建提取css之后保存的路径。

执行webpack命令试试看什么效果。。。

果然出问题了：

```
Tapable.plugin is deprecated. Use new API on `.hooks` instead

意思是extract-text-webpack-plugin这个插件并不支持webpack4.0版本的，因此需要安装别的替代一下。

npm install extract-text-webpack-plugin@next --save-dev
```

But，使用了以上操作还是没有发现打包好的css文件出来。

着了半天发现需要这么做

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
```
编译sass类型的样式，提示错误 Cannot find module 'node-sass'，尝试安装node-sass试试看。


```
npm install node-sass --save-dev
```
以上就可以解决sass类型的样式的编译，抽离功能。

参考地址：

https://blog.csdn.net/lhtzbj12/article/details/79188447

### 五、图片的打包

需要安装一个依赖 file-loader

```
npm install file-loader --save-dev
```

### 六、分离第三方库以及manifest

这个需要创建一个optimization，然后在内部创建引入如下的方法。


```
optimization: {
        // runtimeChunk: {
        //     name: "manifest"
        // },
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'vender',
                    test: /\.js/,
                    chunks: 'initial'
                }
            }
        }
    }
```
