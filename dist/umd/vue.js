(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    class Observer{
        constructor(value){
            // definproperty 重新定义属性
            this.walk(value);
        }
        walk(data){
            console.log(data);
            let keys = Object.keys(data);
            keys.forEach((key)=>{
                defineReactive(data,key,data[key]);
            });
        }

    }
     function defineReactive(data,key,value){
         observer(value);
            Object.defineProperty(data,key,{
                get(){
                    console.log('get value');
                    return value
                },
                set(newValue){
                    if(newValue == value)return
                    observer(newValue);
                    value= newValue;

                    console.log('set value');
                }
            });
    }
    function observer(data){
        // debugger
        // console.log(data)
        if(typeof data !== 'object'&& data !== null)return //不是对象就检测对象
        console.log(data);
        // debugger
        return new Observer(data)
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
        vm._data = data = typeof data == 'function'?data.call(vm):data;
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
