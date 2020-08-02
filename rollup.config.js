import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
export default {
    input :'./src/index.js',//入口
    output:{
        format:'umd',//模块化的类型 esmodule
        name:'Vue',
        file:'dist/umd/vue.js',
        sourcemap:true,
    },
    plugin:[
        babel({
            exclude:'node_modules/**'
        }),
        serve({
            port:3000,
            contentBase:'',
            openPage:'./index.html'
        })
    ]
}