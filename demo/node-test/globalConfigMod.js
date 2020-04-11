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

let num1 = parseInt(process.argv[2])
let num2 = parseInt(process.argv[3])

console.log(num1 + num2)  // 运行命令： node globalConfigMod.js 1 2， 会打印出结果： 3


console.log(__dirname)
