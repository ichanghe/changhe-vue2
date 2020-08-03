import {arrayMethods} from './array'
import { def} from '../util/index'
class Observer{
    constructor(value){
        // value.__ob__ = this;
        def(value,'__ob__',this)
        // definproperty 重新定义属性
        if(Array.isArray(value)){
            //数组操作方法
            //函数劫持或者叫切片编程
           value.__proto__ = arrayMethods
            // debugger
            this.observeArray(value)
        }else{
            this.walk(value);
        }
        
    }
    walk(data){
        // console.log(data)
        let keys = Object.keys(data)
        keys.forEach((key)=>{
            defineReactive(data,key,data[key])
        })
    }
    observeArray(value){
        value.forEach(item=>{
            observer(item)
        })
    }

}
 function defineReactive(data,key,value){
     observer(value)
        Object.defineProperty(data,key,{
            get(){
                console.log('get value')
                return value
            },
            set(newValue){
                if(newValue == value)return
                observer(newValue)
                value= newValue
                console.log('set value')
            }
        })
}
export function observer(data){
    // debugger
    // console.log(data)
    if(typeof data !== 'object'&& data !== null)return //不是对象就检测对象
    // console.log(data)
    // debugger
    return new Observer(data)
}
