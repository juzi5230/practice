let http = require('http')
let fs = require('fs')
let querystring = require('querystring')

http.createServer((req, res) => {
  console.log(req.url)
  console.log(querystring.parse(req.url))

  let result = []
  // post 请求下参数体积往往比较大，会被分成多段发送
  req.on('data', buffer => {
      result.push(buffer)
  })

  req.on('end', () => {
      let data = Buffer.concat(result).toString()
      console.log(querystring.parse(data))
  })
}).listen('8888')