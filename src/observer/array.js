//原方法
let oldArrayProtoMethods = Array.prototype;
export let arrayMethods = Object.create(oldArrayProtoMethods)
let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]
methods.forEach(method=>{
    arrayMethods[method] = function(...args){
        console.log('function used')
        const result =  oldArrayProtoMethods[method].apply(this,arguments)
        let inserted;
        let ob = this.__ob__;
        switch(method){
            // 都是追加，应该再次劫持
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case  'splice':  //vue.$set原理
                inserted = args.slice(2)
            default:
                break;
        }
        if(inserted) ob.observeArray(inserted)
        return result;
    }
})