// const mod1 = require('mod') // 从node_module中引入，没有，则从node的安装目录中找
const mod1 = require('./midTemp/mod') // 当前目录中找， 可以省略后缀

// 批量导入1

console.log(mod1)

// 批量导入2

mod1()

// 批量导入3

let p = new mod1('hello')
p.show()

