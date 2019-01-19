const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, "./"),
        compress: true,
        port: 1000,
        open: true,
        stats: "errors-only",
        overlay: true
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'static/scripts/[name].js',
    },
    performance: {
        // 关闭dev模式下的性能提醒
        hints: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development') // 在编译的代码里设置了`process.env.NODE_ENV`变量
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
});