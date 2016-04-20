/**
 * Created by xiangwenwen on 16/4/12.
 */

var base = require('base-extend-backbone');
var BaseRouter = base.Router;
var IndexView = require('../../views/index/main.view');

var AppRouter = BaseRouter.extend({
  routes: {
    index: 'indexRouter',
    'index/:id': 'indexRouterId'
  },
  indexRouter: function () {
    this.addLifeCycleHelper('index', IndexView);
  },
  indexRouterId: function (id) {
    this.addLifeCycleHelper('index-' + id, IndexView, id);
  }
});

module.exports = AppRouter;
