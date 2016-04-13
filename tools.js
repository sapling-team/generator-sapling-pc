/**
 * Created by xiangwenwen on 16/4/12.
 */

var fs = require('fs');
var path = require('path');
var argv = process.argv;
var args = argv.slice(2);
var env = process.env;
var pwd = env.PWD;
var logInfo = {
    LANG:env.LANG,
    USER:env.USER
};
var file = {
    'model':'bin/temp/model.js',
    'view':'bin/temp/view.js'
};
console.log('dir path ---> ',pwd);
var task = args[0];
var target = args[args.length - 1];
if (task && target) {
    var all = task.split('.');
    var name = all[0];
    var type = all[1];
    if (!name) {
        logInfo.ERROR = 'enter file name';
        console.warn(logInfo)
        return;
    }
    if (!type) {
        logInfo.ERROR = 'enter file type';
        console.warn(logInfo);
        return;
    }
    var tplPath = path.resolve(file[type]);
    if (!/\/$/.test(target)) {
        target = target + '/'
    }
    var targetPath = path.resolve(target+name+'.'+type+'.js');
    fs.readFile(tplPath,{encoding:'utf8'},function(err,data){
        if (err) {throw err}
        var e = fs.writeFileSync(targetPath,data,'utf8');
        if (!e) {
            console.log('create '+type+ ' type file : ' + targetPath);
        }else{
            throw e;
        }
    });
}else{
    logInfo.ERROR = 'enter file name as .file type and target dir';
    console.warn(logInfo)
}