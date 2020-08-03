export function def(data,key,value){
    Object.defineProperty(data,key,{
        enumerable:false,
        configurable:false,
        value
    })
}