
import {observer} from './observer/index'
export function initState(vm){
    const opts = vm.$options
    if(opts.props){
        initProps(vm)
    }
    if(opts.methods){
        initMethods(vm)
    }
    if(opts.data){
        initData(vm)
    }
    if(opts.computed){
        initComputed(vm)
    }
    if(opts.watch){
        initWatch(vm)
    }
}
function initProps(){}
function initMethods(){}
function initData(vm){
    let data = vm.$options.data;
    // debugger;
    // console.log(typeof data)
    data = typeof data == 'function'?data.call(vm):data;
    // 对象 或数组
    // console.log(data)
    // 数据劫持
    observer(data)

}
function initComputed(){}
function initWatch(){}