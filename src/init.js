import {initState} from './state'
export function initMixin(Vue){
    // console.log(options)
    Vue.prototype._init = function(options){
        const vm = this
        vm.$options = options
        // 响应式数据原理
        // debugger;
        initState(vm)
        // 数据变化会更新

        // 如果传入el,实现挂在流程
        if(vm.$options.el){
            vm.$mount(vm.$options,el)
        }
    } 
    Vue.prototype.$mount = function (el){
        const vm= this
        el = document.querySelector(el);
        // render->template->el内容
        if(!options.render){
            // 模版编译
            let template = options.template
            if(!template&&el){
                template = el.outerHTML;

            }
            console.log(template)
        }
    }
}