let path = require('path')
let fs = require('fs')

console.log(path.dirname('/node-test/package.json')) // 打印路径
console.log(path.basename('/node-test/package.json')) // 打印路径包含对应文件
console.log(path.extname('/node-test/package.json')) // 打印类型， 可以通过这个方法判断文件类型
console.log(path.extname('https://img.yzcdn.cn/vant/cat.jpeg')) // 打印类型， 可以通过这个方法判断文件类型

console.log(path.resolve('/node-test/a/b/c', '../../', 'd')) // 处理路径逻辑

console.log(path.resolve(__dirname, 'index.js')) // 获取绝对路径


// 异步读写方法

// fs.readFile('./midTemp/a.txt', (err, res) => {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log(res)
//         console.log(res.toString())
//     }
// })

// fs.writeFile('./midTemp/b.txt', '生成文件并写入内容', (err) => {
//     if(err) {
//         throw err
//     }
// })

// fs.writeFile('./midTemp/b.txt', '写入文件但不覆盖原有内容', {flag: 'a'}, (err) => {
//     if(err) {
//         throw err
//     }
// })

// 同步读写方法， 没有了回调函数

// let data = fs.readFileSync('./midTemp/a.txt')
// console.log(data.toString())
// console.log(data)


// fs.writeFileSync('./midTemp/b.txt', '生成文件并写入内容333') // 覆盖原有内容
fs.writeFileSync('./midTemp/b.txt', '生成文件并写入内容444', {flag: 'a'}) // 不覆盖原有内容