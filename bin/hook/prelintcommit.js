var fs = require('fs');
var childProcess = require('child_process');
var spawnSync = childProcess.spawnSync;

var report = spawnSync('');
console.log(report);
if(report.status){
	console.log('请review你的源代码，让其通过eslint的检查');
}
process.exit(report.status);

// var eslint = require('eslint');
// var CLIEngine = eslint.CLIEngine;
// var eslintConfig = {
// 	"extends": "airbnb/legacy",
// 	"rules": {
//     "semi": 2
//   },
//   "env":{
//   	"jquery":true,
//   	"commonjs":true,
//   	"browser":true
//   }
// }
// var cli = new CLIEngine(eslintConfig);
// var report = cli.executeOnFiles([
// 	'app/src/',
// 	'app/stylesheets/',
// 	'app/web/'
// ]);

// console.log(report);
// console.log(report.errorCount);
