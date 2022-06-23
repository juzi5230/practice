# 搭建组件库

## 搭建vue组件库

- 初始化项目 vue creat teleUI
- 根目录添加项目配置，vue.config.js， 具体代码如下：

```js
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // 修改 src 目录 为 examples 目录
  lintOnSave: true,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
    config.resolve.alias
      .set('@', resolve('./packages'))
      .set('@style', resolve('./style'))
  }
}

```
- package.json 中添加命令： 

```js
"lib": "vue-cli-service build --target lib --name telcomUI --dest lib packages/index.js"
```

- 修改src文件夹名称->examples
- 根目录下新建文件夹 packages用于存放组件
- packges 目录下新建index.js, 用于安装组件，具体代码示例如下：

```js
// 导入颜色选择器组件
import Button from './Button'

// 存储组件列表
const components = [
    Button
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) { // 项目中引入组件时-Vue.use(XX)，会自动找install 方法并执行
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}

```

- 打包生成组件文件

```js
npm run lib
```

### 将vue组件库发布到npm上

#### 修改package.json文件

- name 需要独一无二
- version 版本号，每次上次需要修改
- private值为false，否则为私有发布不上去
- 添加main属性，用于指出引入文件的入口文件， eg: lib/teleUI.min.umd.js
- 也可以再加一些其他的属性，eg：

```js
"author" : {
    "name": "xxx"
}
```

#### 根目录添加.npmignore文件， 功能类似.gitignore, 用于npm上传所需要忽略的文件

```js
  examples/
  packages/
  public/
  vue.config.js
  babel.config.js
  *.map
```

#### npm 发布

- 首先登录npm账号
```js
  npm login
  // 输入用户名
  // 输入密码
  // 输入邮箱
```
- 发布

```js
 npm publish // 命令执行成功即可在https://www.npmjs.com/中搜到自己的组件库， 可能立马搜搜不到
```
#### 使用

- 可通过npm install 安装自己的软件， 并可在nodemodule中找到相关的文件， 项目使用方式类似elementUI
- 引入css时，使用类似elementUI：
```js
import 'element-ui/lib/theme-chalk/index.css';
```