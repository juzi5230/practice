# 项目中常见问题

## 全局安装tslint、ts后，可以使用命名自动生成默认的配置文件

以tslint为例

      // 全局安装tslint： 进行全局安装 
      
      npm install -g tslint

      // 在项目目录中自动生成tslint.json配置文件

      tslint --init

## npm install

参考链接： https://blog.csdn.net/aaqingying/java/article/details/101371352

+ **npm install 和 npm i 是一样的,都是安装package.json文件中的依赖包。

       安装单独的依赖包时，npm install <packageName>

+ 命令区别

  –save 等同于 -S （常用，可保存在package.json文件中），
  -S, --save 安装包信息将加入到dependencies（生产阶段的依赖,也就是项目运行时的依赖，就是程序上线后仍然需要依赖）
  –save-dev 等同于 -D
  -D, --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作用。）
  在用npm install 单独安装 npm 包时，有两种命令参数可以把它们的信息写入 package.json 文件，一个是npm install–save,另一个是 npm   install –save-dev，他们表面上的区别是 –save 会把依赖包名称添加到 package.json 文件 dependencies 下，–save-dev 则添加到 package.  json 文件 devDependencies 下。
  dependencies是运行时的依赖，devDependencies是开发时的依赖。 即devDependencies 下列出的模块，是我们开发时用的
  像jQuery库或者Angular框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了，这是dependencies;
  而写 ES6 代码，需要babel转换成es5，转换完成后，我们只需要转换后的代码，上线的时候，直接把转换后的代码部署上线，不需要bebal了，上线了不需  要，这就是devDependencies。
  正常使用npm install时，会下载dependencies和devDependencies中的模块，当使用npm install –production或者注明NODE_ENV变量值为  production时，只会下载dependencies中的模块

+ 在npm中安装固定的版本号package，只需要在其后加 ‘@版本号’

  ```js
    npm install  --save  esri-loader@1.0.0
  ```

## git 中tag的使用

tag是git版本库的一个标记，指向某个commit的指针。

tag主要用于发布版本的管理，一个版本发布之后，我们可以为git打上 v.1.0.1 v.1.0.2 ...这样的标签。

      git tag <tagName> //创建本地tag

      git push origin <tagName> //推送到远程仓库
