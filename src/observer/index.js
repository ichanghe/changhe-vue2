class Observer{
    constructor(value){
        // definproperty 重新定义属性
        this.walk(value);
    }
    walk(data){
        console.log(data)
        let keys = Object.keys(data)
        keys.forEach((key)=>{
            defineReactive(data,key,data[key])
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
    console.log(data)
    // debugger
    return new Observer(data)
}
