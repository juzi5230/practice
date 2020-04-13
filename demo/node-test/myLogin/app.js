const http = require('http')
const url = require('url')
const querystring = require('querystring')
const fs = require('fs')
let user = {
    admin: 123456
}
http.createServer((req, res) => {
    let path, get, post = {
        username: ''
    }
    if(req.method === 'GET') {
        let {pathname, query} = url.parse(req.url, true)
        path = pathname
        get = query
        complete()
    } else if(req.method === 'POST'){
       let arr = []
       path = req.url
       req.on('data', buffer => {
           arr.push(buffer)
       })
       req.on('end', ()=>{
           post = querystring.parse(Buffer.concat(arr).toString())
           console.log('1111', post)
           complete()
       })
    }
    function complete() {
        // 可能会出现中文乱码
        // res.writeHead(200, {
        //     'Content-type': "text/plain;charset=utf-8"
        // })
        if(path === '/login') {
            let {username, password} = get
            if(!user[username]) {
                res.end(JSON.stringify({
                    err: 1, 
                    msg: '用户名不存在',
                    des:{username, password, aa: user[username] || 'aa'}
                }))
            } else if(user[username] != password) {
                res.end(JSON.stringify({
                    err: 2,
                    msg: '密码错误',
                    des:{username, password}
                }))
            } else {
                res.end(JSON.stringify({
                    err: 0,
                    msg: '登陆成功',
                    des:{username, password}
                }))
            }
        } else if(path === '/reg') {
            let {username, password} = post
            if(user[username]) {
                res.end(JSON.stringify({
                    err: 1,
                    msg: '账户已经存在' + post
                }))
            } else {
                user[username] = password
                res.end(JSON.stringify({
                    err:0,
                    msg: '注册成功'
                }))
            }
        } else {
            fs.readFile(`./${path}`, (err, data) =>{
                if(err) {
                    res.end('404' + path +  err)
                } else {
                    res.end(data)
                }
            })
        }
    }
}).listen('8080')