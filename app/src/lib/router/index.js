/**
 * Created by xiangwenwen on 16/4/12.
 */

var AppRouter = require('./routers');
var router;
module.exports = {
    start:function(){
        router = new AppRouter;
        Backbone.$ = window.$;
        Backbone.history.start();
    },
    navigate:function(hash){
        if(router){
            router.navigate(hash,{
                trigger:true
            })
        }
    },
    router:function(){
        return router;
    }
}
