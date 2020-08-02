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
    } 
}