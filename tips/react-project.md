<!--
 * @Author: your name
 * @Date: 2021-07-19 20:26:23
 * @LastEditTime: 2021-07-19 20:28:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edits
 * @FilePath: /practice/tips/react-project.md
-->

# someTips

## 安装react-devtool后，项目启动报错

+ 报错信息： react项目启动报错(Uncaught TypeError: Cannot read property ‘forEach‘ of undefined at Object.injectInt)

+ 解决方法： https://blog.csdn.net/lanseguhui/article/details/109720144


## 部署

+ react 项目部署到非根目录下， 静态资源放在public文件下时，会出现找不到资源的情况， 修改路由配置可以解决

```
// index.html
let reg = /\/(.*)\//
let basename = reg.exec(window.location.pathname)

// RouterHelper.js
const creathashHistory = require("history").createBrowserHistory
export const history = creathashHistory(
    {
        basename: 'xxx' //  路由对应的pathname， 在index.html中获取
    }
);

// router 配置
import React from 'react'
import { hot } from 'react-hot-loader'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import {history} from "./RouterHelper";

const routerMap = ()=>(
	<Router history={history}> // 添加hitory配置
        <Switch>
            <Route exact component={xx}/>
        </Switch>
    </Router>
)

export default hot(module)(routerMap)

```


```
server {
    listen 9097;
    server_name  localhost;
    server_name_in_redirect off;	
	location / {
		root /xx/xx/xx/xx;
        index index.html;
        try_files $uri  /index.html;	
    }
    location /path1 { // 非根目录部署1
        alias /xx/xx/xx/xx/;
        index index.html index.htm;
        try_files $uri /xx/index.html;
    }
    location /path2 { // 非根目录部署2
        alias /xx/xx/xx/xx/;
        index index.html index.htm;
        try_files $uri /xx/index.html;
    }
}
```