/**
 * Created by xiangwenwen on 16/4/12.
 */

var Backbone = require('backbone');
var AppRouter = require('./routers');
var appRouter = null;
var router = {
  start: function () {
    appRouter = new AppRouter;
    Backbone.$ = window.$;
    Backbone.history.start();
  },
  navigate: function (hash) {
    if (router) {
      router.navigate(hash, {
        trigger: true
      });
    }
  },
  getAppRouter: function () {
    return appRouter;
  }
};

module.exports = router;
