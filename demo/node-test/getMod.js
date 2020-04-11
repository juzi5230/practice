let http = require('http') // http模块
let url = require('url') // url模块

http.createServer((req, res) => { // 运行/midTemp/getMod.html文件， 可以查看效果
    // console.log(req.url)
    // let [url, query] = req.url.split('?')

    // console.log(url.parse(req.url, true))
    let {pathName, query} = url.parse(req.url, true)
    console.log(pathName, query)
}).listen('8888')