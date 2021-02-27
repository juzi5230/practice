# 开发 tips

## vConsole

h5应用开发过程中，一般是使用浏览器调试，但是真的将代码放到h5端，偶尔还是会遇到一些处理不到的情况，比如，之前遇到的情况， 使用new Date('2020-11-17 12:12')(safari、ie貌似都不行， 慎用), 这样的格式转换，兼容性没有考虑到，chrom调试一切正常，但是手机打开应用后，时间参数返回的却是null，这种情况就比较坑

于是就考虑，怎么如浏览器一样查看h5端的代码、接口返回及报错信息呢？

发现了一个比较好用的工具 - VCosole， 调用也非常简单， 因为非项目必须，所以直接在项目的html页面中添加如下代码, 不需要时随手可以删除：

```javascript
    <script src="http://wechatfe.github.io/vconsole/lib/vconsole.min.js?v=3.2.0"></script>
    <script>
      var vConsole = new VConsole();
    </script>
```

![vConsole](images/vConsole.jpeg)

项目启动后，就会出现一个vConsole的按钮，点击即可打开上图所示的模拟devtools 的界面，此时报错信息也可以看到啦～

## Charles

之前维护过一段时间公司的一个公共组件，是一个单纯的js文件，每次维护都比较费劲， 不能像vue项目一样启动查看效果

解决方法： 使用代理工具charles，使用本地js文件替换调线上文件查看效果

使用步骤：
1、 打开charles应用 -> 点击工具栏中的tools -> 点击Map Local -> 点击 add

打开弹窗， Map From 为线上链接地址，可以依次填写每个参数，如果觉得麻烦， 可以获取链接完整路径直接填写到path， 其他参数就会自动补全了（这一点还是不错的～）； Local Path 为本地的文件路径

2、填写完步骤1中的参数点击确定，重新刷新页面就可以看到，线上文件已经被替换为本地文件啦～

![override](images/charles0.png)
![override](images/charles1.png)

## overrides

这个是chrome浏览器devtools自带的一个入口， 它可以替换线上文件为本地文件

路径： option + commond + c 打开控制台， Sources -> Override -> Select folder for overrides -> 选择对应的文件

![override](images/override.png)

替换方式： 获取需要替换文件的路径，从域名级别开始，依次新建文件夹，并在最里层放上我们要替换的本地文件即可
eg： http://www.baidu.com/js/a.js

新建文件夹1，文件夹名称为： www.baidu.com
文件夹1下，新建文件夹2， 名称为: js
在文件夹2下 放我们的本地文件， a.js

此时打开页面，可以看到 线上文件已经被本地文件替换了～

## lighthouse

### 使用方式

+ 打开devtool，点击audit后点击generate report即可，但是可能会经常碰到 卡顿在 lighthouse is warming up这一步上

+ 使用命令行， 全局安装lighthouse： npm install -g lighthouse即可，然后在终端输入： lighthouse url（想要测试的网址），eg： lighthouse https://www.baidu.com. 命令：lighthouse --help 可以查看可用的输入输出选项

lighthouse 最终默认生成html文件，报告中会给出相应的修复方案，根据生成的报告结果，可以分析页面的性能，并对不足之处作出修改。示例如下：

![override](images/lighthouse.jpg)

