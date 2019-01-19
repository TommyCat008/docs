const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve(dir) {
    console.log('path', path.join(__dirname, '.', dir));
    return path.join(__dirname, '.', dir)
}

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': resolve('src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['vender', 'runtime', 'main'],
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'static'),
            to: 'static',
            ignore: ['.*']
        }]),
        new VueLoaderPlugin(),
        new ExtractTextPlugin('./static/css/[name].min.css')
    ],
    module: {
        rules: [
            //转化ES6语法
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
                // exclude: __dirname + 'node_modules',
                // include: __dirname + 'src',
                // options: {
                //     presets: ['env']
                // }
            },
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
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }]
                })
            },
            {
                // 增加加载图片的规则
                test: /\.(png|svg|jpg|gif)$/,
                include: resolve('static'),
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]',
                        outputPath: './static/images',
                        publicPath: '../images'
                    }
                }]
            },
            {
                // 增加加载图片的规则
                test: /\.(png|svg|jpg|gif)$/,
                include: resolve('src'),
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]',
                        outputPath: './static/images',
                        publicPath: './static/images'
                    }
                }]
            },
            {
                // 字体
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'static/fonts/[name].[ext]'
                }
            }
        ]
    }
};