(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function observer(data){
        debugger
        console.log(data);
    }

    function initState(vm){
        const opts = vm.$options;
        if(opts.props);
        if(opts.methods);
        if(opts.data){
            initData(vm);
        }
        if(opts.computed);
        if(opts.watch);
    }
    function initData(vm){
        let data = vm.$options.data;
        // debugger;
        // console.log(typeof data)
        data = typeof data == 'function'?data.call(vm):data;
        // 对象 或数组
        // console.log(data)
        // 数据劫持
        observer(data);

    }

    function initMixin(Vue){
        // console.log(options)
        Vue.prototype._init = function(options){
            const vm = this;
            vm.$options = options;
            // 响应式数据原理
            // debugger;
            initState(vm);
            // 数据变化会更新
        }; 
    }

    function Vue(options){
        //初始化
        this._init(options);
        
    }
    initMixin(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
