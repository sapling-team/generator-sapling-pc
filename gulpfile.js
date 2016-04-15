var gulp = require('gulp');
var browser = require('browser-sync');
var browserSync = browser.create();


gulp.task('server',function(){
    browserSync.init({
        server:'./app',
        port:3000
    });
    gulp.watch('./app/**/*.*',function(file){
        console.log(file.path);
        browserSync.reload();
    })
});

var gutil = require('gulp-util');
gulp.task('build',function(){
    return gulp.src([
        'app/link/*.*',
        'app/link/**/*.*',
    ],{base:'app/'})
        .pipe(gulp.dest('app/www/'))
});

gulp.task('webpack',function(callback){
    var webpack = require('webpack');
    var productConfig = require('./bin/webpack.product.config.js');
    webpack(productConfig,function(err,stats){
        if(err){
            throw new gutil.PluginError('webpack',err);
        }
        gutil.log('[webpack]',stats.toString());
        callback();
    });
});