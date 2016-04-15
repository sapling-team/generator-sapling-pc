/**
 * Created by xiangwenwen on 16/4/12.
 */

var $ = require('jquery');
$(function () {
  var MainView = require('./views/code/main.view');
  var mainView = new MainView();
  console.log(mainView);
  require('../stylesheets/code.scss');
});
