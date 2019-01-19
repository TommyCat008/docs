const webpack = require('webpack');
const Merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonConfig = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = Merge(CommonConfig, {
    devtool: 'source-map',
    output: {
        filename: 'static/scripts/[name].js',
    },
    performance: {
        // 关闭性能提醒
        hints: false,
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), // dist目录下可能会放置freedo，不能每次都删除整个dist
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],

    //压缩js  不能写在plugins中，因为是新版本的webpack
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'vender',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all'
                }
            }
        },
        // 不知道为什么打包之后文件大小没有什么变化，等以后内容多了试试看大小会不会变化。
        // runtimeChunk: {
        //     name: 'runtime'
        // }

        // 暂时不知道为什么，打开这个就会报错的，已经解决了，是因为babel的问题。
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false,
                },
                extractComments: false,
            })
        ]
    },
});