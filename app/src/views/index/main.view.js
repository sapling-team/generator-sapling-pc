'use strict';

var base = require('base-extend-backbone');
var BaseView = base.View;
var IndexModel = require('../../models/index/main.model');
var indexTemp = require('../../template/index/main.html');
var imgSrc = require('../../../images/change.png');

var View = BaseView.extend({
  el: '#indexContainer',
  rawLoader: function () {
    return indexTemp;
  },
  context: function (args) {
    console.log(args);
  },
  beforeMount: function () {
    //  初始化一些自定义属性
    this.indexParameter = {
      id: 110
    };
  },
  afterMount: function () {
    //  获取DOM Node
    this.imgContainer = this.findDOMNode('#imgContainer');
  },
  ready: function () {
    this.imgContainer.html('<img src="' + imgSrc + '"/>');
    //  初始化Model
    this.indexModel = new IndexModel();
    this.indexModel.setChangeURL(this.indexParameter);
    this.indexModel.execute(function (response) {
      console.log(response);
    }, function (e) {
      console.log(e);
    });
  },
  beforeDestroy: function () {
    //  进入销毁之前,将引用关系设置为null
    this.img = null;
    this.indexParameter = null;
    this.indexModel = null;
  },
  destroyed: function () {
    //  销毁之后
  }
});

module.exports = View;
