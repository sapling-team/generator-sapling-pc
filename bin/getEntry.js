/**
 * Created by xiangwenwen on 16/4/12.
 */

var path = require('path');
var glob = require('glob');

module.exports = getEntry;

function getEntry(sourcePath) {
  var entrys = {};
  var basename;
  glob.sync(sourcePath).forEach(function (entry) {
    basename = path.basename(entry,path.extname(entry));
    entrys[basename] = entry;
  });
  return entrys;
}