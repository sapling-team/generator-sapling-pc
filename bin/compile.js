/**
 * Created by xiangwenwen on 16/4/14.
 */

module.exports = complie;

function maps(obj,arr) {
  var random = obj.random;
  return arr.map(function (v) {
    if(random){
      var r = ''+ Math.random(0);
      v = v + '?'+ r.substr(2);
    }
    return v;
  });
}

function complie (obj) {
  var isArray = Array.isArray;
  var script = obj.script;
  var style = obj.style;
  obj.cdn = obj.cdn || false;
  obj.random = obj.random || false;
  if (isArray(script)){
      obj.script = maps(obj,script);
  }else{
      console.error('配置文件script不是一个数组')
  }
  if (isArray(style)){
      obj.style = maps(obj,style);
  }else{
      console.error('配置文件style不是一个数组')
  }
  return obj;
}