var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var containerPath = path.resolve('./');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('css/[name].css');


//添加插件
var plugins = [];

if(process.env.NODE_ENV === 'product'){
    //注入环境变量
    //plugins.push(new webpack.DefinePlugin({
    //    'process.env':{
    //        'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
    //    }
    //}));

    /*
    * 非windows用户提醒:建议使用环境变量的方式,将上方的注释去掉,在npm scripts中输入如下:
    *
    * NODE_ENV=product webpack --colors --config bin/webpack.config.js --optimize-minimize
    * */

    //非环境变量的方式

    //plugins.push(new webpack.optimize.UglifyJsPlugin({
    //    compress:{
    //        warnings:false
    //    }
    //}));
}

//切割css文件
plugins.push(extractSASS);

//提取公共文件
plugins.push(new webpack.optimize.CommonsChunkPlugin('common.js'));


//配置入口文件

var entryMap = {
    'index.main':'./app/src/index.main.js'
};

//配置webpack
var config = {
    entry:entryMap,
    output:{
        path:path.resolve(containerPath,'app/resource'),
        filename:'[name].js'
    },
    devtool:'source-map',
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