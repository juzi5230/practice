console.log('lallalla')

// 全局变量
process.env.dev = true
console.log(process.env.dev)
if(process.env.dev) {
    console.log('我是开发环境')
} else {
    console.log('我是生产环境')
}

console.log(process.argv)

let num1 = parseInt(process.argv[2]) // 获取参数
let num2 = parseInt(process.argv[3]) // 获取参数

console.log('11111')
console.log(process.argv[0])
console.log(process.argv[1])
console.log(process.argv[2])
console.log(process.argv[3])
// console.log(process.env)
// console.log(process.env)

console.log(num1 + num2)  // 运行命令： node globalConfigMod.js 1 2， 会打印出结果： 3


console.log(__dirname)
