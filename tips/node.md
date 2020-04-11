# 记录node小细节

## 多个node版本

Node.js 的版本更新非常快，所有有时需要在多个版本之间切换，就需要安装多个版本的 Node.js.

### 工具

+ nvm（https://github.com/nvm-sh/nvm#install--update-script）， node版本管理工具

+ n（https://github.com/tj/n#installation）

### 常用命令

+ 查看版本号 nvm list 或者nvm ls
+ 下载node： nvm install 6.2.0， nvm install stable ## 安装最新稳定版 node
+ nvm uninstall <version>
+ 切换使用的node版本： node use 6.2.0

tips： nvm的安装方法详见 https://www.jianshu.com/p/622ad36ee020 和 https://www.jianshu.com/p/f6b290710262

## node运行本地文件

+ 安装完node之后，我们可以使用：node 文件名 的方式运行js文件， 也可以直接在命令行中运行js代码

```node
//创建文件夹
mkdir node-test
// 新建a.js文件
touch a.js
// 使用vscode打开文件夹
code node-test
// 运行a.js
node a // 这种方式，需要考虑文件夹下没有a文件，否则不会自动运行a.js文件，而是运行文件a
node a.js
```

进入node环境，只需在终端输入： node 按回车即可， 退出时按两次control + c
![alt node 命令行运行](images/cmdNode.jpg)

## node包管理工具

+ 由于npm的服务器在国外， 国内使用可能会比较慢，所以可以使用cnpm: 淘宝npm镜像

```node
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

+ 常用命令

```node
// 初始化项目，生成package.json管理依赖
npm init

// 安装依赖

npm install xx
npm i xx

// 卸载依赖

npm uninstall xx
npm un xx

// 更新包

npm update xx
```

## node 模块

### 全局模块

+ 定义： 何时何地都能访问， 不需要引用, 具体示例可以参考demo目录下 npm-test 示例

+ process.env

+ process.argv

+ __dirname

实现简易的计算器

![简易计算器](images/node-argv.jpg)

更多全局模块可到官网学习～

### 系统模块

### 自定义模块
