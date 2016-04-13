/**
 * Created by xiangwenwen on 16/4/13.
 */

var path = require('path');
var containerPath = path.resolve('./');

var alias = { //别名
    'config':path.resolve(containerPath,'./app/src/lib/config.js'),
    'tplEng':path.resolve(containerPath,'./app/link/template')
}

module.exports = alias;