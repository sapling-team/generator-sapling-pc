var gulp = require('gulp');
var browser = require('browser-sync');
var browserSync = browser.create();


gulp.task('server',function(){
    browserSync.init({
        server:'./app/',
        port:3000
    });
    gulp.watch('./app/**/*.*',function(file){
        console.log(file.path);
        browserSync.reload();
    })
});

var webpack = require('webpack');
