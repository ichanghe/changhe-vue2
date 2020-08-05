(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    //原方法
    let oldArrayProtoMethods = Array.prototype;
    let arrayMethods = Object.create(oldArrayProtoMethods);
    let methods = [
        'push',
        'pop',
        'shift',
        'unshift',
        'reverse',
        'sort',
        'splice'
    ];
    methods.forEach(method=>{
        arrayMethods[method] = function(...args){
            console.log('function used');
            const result =  oldArrayProtoMethods[method].apply(this,arguments);
            let inserted;
            let ob = this.__ob__;
            switch(method){
                // 都是追加，应该再次劫持
                case 'push':
                case 'unshift':
                    inserted = args;
                    break;
                case  'splice':  //vue.$set原理
                    inserted = args.slice(2);
            }
            if(inserted) ob.observeArray(inserted);
            return result;
        };
    });

    function def(data,key,value){
        Object.defineProperty(data,key,{
            enumerable:false,
            configurable:false,
            value
        });
    }

    class Observer{
        constructor(value){
            // value.__ob__ = this;
            def(value,'__ob__',this);
            // definproperty 重新定义属性
            if(Array.isArray(value)){
                //数组操作方法
                //函数劫持或者叫切片编程
               value.__proto__ = arrayMethods;
                // debugger
                this.observeArray(value);
            }else {
                this.walk(value);
            }
            
        }
        walk(data){
            // console.log(data)
            let keys = Object.keys(data);
            keys.forEach((key)=>{
                defineReactive(data,key,data[key]);
            });
        }
        observeArray(value){
            value.forEach(item=>{
                observer(item);
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
        // console.log(data)
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

    // 字母a-zA-Z_ - . 数组小写字母 大写字母  
    const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名
    // ?:匹配不捕获   <aaa:aaa>
    const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
    // startTagOpen 可以匹配到开始标签 正则捕获到的内容是 (标签名)
    const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
    // <div aa   =   "123"  bb=123  cc='123'
    // 捕获到的是 属性名 和 属性值 arguments[1] || arguments[2] || arguments[2]
    const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
    // <div >   <br/>
    const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >

    function parseHTML(html){
        while(html){
            let textEnd = html.indexOf('<');
            if(textEnd == 0){
                // 索引为0 是标签
              let startTagMatch =  parseStartTag();
              break;
            }
            function advance(n){
                html = html.substring(n);
            }
            function parseStartTag(){
                let start =  html.match(startTagOpen);
                if(start){
                    const match = {
                        tagName:start[1],
                        attrs:[]
                    };
                    advance(start[0].length);
                    console.log(start,'-----');
                    let end ,attr;
                    while(!(end == html.match(startTagClose))&& (attr = html.match(attribute))){
                        advance(attr[0].length);
                        // match.attrs.push({name:attr[1],value:attr[3]||attr[4]||attr[5]})
                    }
                    // if(end){
                    //     advance(end[0].length)
                    //     return match;
                    // }
                    console.log(html,'html');
                }
                
                
            }
        }
    }
    // ast 语法树
    function compileToFunction(template){
        console.log(template);
        let root =    parseHTML(template);
        return function render(){

        }
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

            // 如果传入el,实现挂在流程
            if(vm.$options.el){
                vm.$mount(vm.$options.el);
            }
        }; 
        Vue.prototype.$mount = function (el){
            const vm= this;
            const options = vm.$options;
            el = document.querySelector(el);
            // render->template->el内容
            if(!options.render){
                // 模版编译
                let template = options.template;
                if(!template&&el){
                    template = el.outerHTML;
                }
                const render = compileToFunction(template);
            }
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
