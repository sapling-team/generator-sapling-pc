/**
 * Created by xiangwenwen on 16/4/12.
 */

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var containerPath = path.resolve('./');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('[name].css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getEntry = require('./getEntry');
var rmdir = require('./rmdir');
var alias = require('./alias');
rmdir('./app/www/');

//配置入口文件

var entrys = getEntry('./app/src/*.js');

//添加插件
var plugins = [];

//if(process.env.NODE_ENV === 'product'){
//    //注入环境变量
//    //plugins.push(new webpack.DefinePlugin({
//    //    'process.env':{
//    //        'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
//    //    }
//    //}));
//    /*
//    * 非windows用户提醒:建议使用环境变量的方式,将上方的注释去掉,在npm scripts中输入如下:
//    *
//    * NODE_ENV=product webpack --colors --config bin/webpack.config.js --optimize-minimize
//    * */
//}

//切割css文件
plugins.push(extractSASS);

//提取公共文件
plugins.push(new webpack.optimize.CommonsChunkPlugin('common','common.js'));

//处理html
var pages = getEntry('./app/web/*.jade');
for(var chunkname in pages){
    var conf = {
        cdn:false,
        filename:chunkname+'.html',
        template:pages[chunkname],
        inject:true,
        minify:{
            removeComments:true,
            collapseWhitespace: false
        },
        chunks:['common',chunkname],
        hash:true
    }
    plugins.push(new HtmlWebpackPlugin(conf));
}

//配置webpack
var config = {
    entry:entrys,
    output:{
        path:path.resolve(containerPath,'./app/www/'),
        publicPath:'./',
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
                test:/\.scss$/i,
                loader:extractSASS.extract(['css','sass'])
            },
            {
                test:/.jade$/,
                loader:'jade-loader',
                exclude:/(node_modules)/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=[name].[ext]'
            }
        ]
    },
    plugins:plugins,
    resolve:{
        alias:alias,
        extensions: ['', '.js', '.css', '.scss', '.jade', '.png', '.jpg']
    },
    externals:{ //导出外部对象
        jquery:'window.jQuery',
        backbone:'window.Backbone',
        underscore:'window._'
    }
};
module.exports = config;