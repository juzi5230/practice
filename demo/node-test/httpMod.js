let http = require('http')
let fs = require('fs')
// http.createServer(() => { // 创建服务器， 使用浏览器访问localhost: 8888, 终端会打印出‘我来了’
//     console.log('我来了。。。')
// }).listen(8888)

// 添加参数
// http.createServer((req, res) => { // 创建服务器， 使用浏览器访问localhost: 8888, 页面中会显示 ‘index’
//     // console.log('我来了。。。')
//     res.write('index')
//     res.end()
// }).listen(8888)

// 添加访问内容
http.createServer((req, res) => { // 创建服务器， 使用浏览器访问http://localhost:8888/midTemp/1.html, 终端中会打印出 ‘/midTemp/1.html’
    // console.log('我来了。。。')
    console.log(req.url)
    fs.readFile(`./${req.url}`, (err, data) => {
      if(err) {
          console.log(err)
          res.writeHead(404)
          res.end('404 not found')
      } else {
          console.log(data)
          console.log(data.toString())
        //   res.writeHead(200) // 默认写上， 不需要再手动填写
          res.end(data) // 通过res返还给页面
      }
    })
}).listen(8888)