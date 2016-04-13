/**
 * Created by xiangwenwen on 16/4/12.
 */

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var containerPath = path.resolve('./');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('css/[name]-[hash].css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getEntry = require('./getEntry');
var rmdir = require('./rmdir');
rmdir('./app/www/');

//配置入口文件
var entrys = getEntry('./app/src/*.js');

//添加插件
var plugins = [];

process.env.NODE_ENV = 'product';
//注入环境变量
plugins.push(new webpack.DefinePlugin({
    'process.env':{
        'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
    }
}));

//切割css文件
plugins.push(extractSASS);

//提取公共文件
plugins.push(new webpack.optimize.CommonsChunkPlugin('common','common-[hash].js'));

//处理html
var pages = getEntry('./app/web/*.jade');
for(var chunkname in pages){
    var conf = {
        filename:chunkname+'.html',
        template:pages[chunkname],
        inject:true,
        minify:{
            removeComments:true,
            collapseWhitespace: false
        },
        chunks:['common',chunkname],
        hash:false
    }
    plugins.push(new HtmlWebpackPlugin(conf));
}

//配置webpack
var config = {
    entry:entrys,
    output:{
        path:path.resolve(containerPath,'app/www'),
        publicPath:'./',
        filename:'[name]-[hash].js'
    },
    devtool:'eval-source-map',
    module:{
        loaders:[
            {
                test:/\.html$/,
                loader:'raw',
                exclude:/(node_modules)/
            },
            {
                test:/\.js$/,
                loader:'eslint-loader',
                exclude:/(node_modules)/
            },
            {
                test:/\.sass$/i,
                loader:extractSASS.extract(['css','sass'])
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=8192'
            },
            {
                test:/.jade$/,
                loader:'jade-loader',
                exclude:/(node_modules)/
            }
        ]
    },
    plugins:plugins,
    resolve:{
        alias:{ //别名
            'config':path.resolve(containerPath,'./app/src/lib/config.js')
        }
    },
    externals:{ //导出外部对象
        jquery:'window.jQuery',
        backbone:'window.Backbone',
        underscore:'window._',
        tplEng:'window.artTemplate'
    }
};
module.exports = config;