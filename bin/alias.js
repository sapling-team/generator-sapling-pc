/**
 * Created by xiangwenwen on 16/4/13.
 */

var path = require('path');
var containerPath = path.resolve('./');

//	别名
var alias = {
  config:path.resolve(containerPath,'./app/src/module/config'),
  tplEng:path.resolve(containerPath,'./app/link/artTemplate/dist/template')
};

module.exports = alias;
