<!--
 * @Author: your name
 * @Date: 2021-07-08 17:10:20
 * @LastEditTime: 2021-08-12 10:36:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /practice/tips/bp-tips.md
-->
# 记录开发班牌过程中遇到的问题

班牌首页使用的是阿里的微前端框架乾坤，

1、导航插件则是一般h5配置即可
2、首页插件配置地址，需要以index.html 为结尾，否则页面无法加载 比如： https://xxx/example/index.html
3、首页插件不展示，显示白屏的原因主要有两个：

+ 存在跨域问题，需要nginx配置

 ```js
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Credentials' 'true';
```

+ app_code 配置不正确，会有对应的格式要求

+ 产品上架，在集成开发平台上把地址配错了也是有可能的

4、首页插件并不是一个单独的h5项目， 最终会以div的形式插入到班牌首页的根html，所以设置 自适应配置的时候，如果多个项目配置不同可能会相互影响, 这个就坑了一下，所以还是要做好准备工作，把一切都了解清楚， but 之前问了相关的研发，他们貌似也不清楚，后来通过在笔记本上映射班牌，查看element后才知道的

```html
<html>
 <head>***</head>
 <body>
   <div>应用1</div>
   <div>应用2</div>
   <div>应用3</div>
 </body>
</html>
```

5、新通知导航部分是写到h5项目的， 所以不可避免的需要处理一下版本控制逻辑， location.replace, 但是在班牌上的回退按钮回退不能实现回到首页，解决方法是处理一下兼容性问题：

```js
  if (history.replaceState) {
    history.replaceState({}, document.title, url);
    location.reload(); //刷新
  } else {
    location.replace(url);
  }
```

6、点击首页插件一般会有跳转到对应导航应用的功能，如果代码貌似没有什么问题，有一种可能是，集成开发平台上的导航appKey 和 首页插件的redireKey不一样导致的， 所以需要配置正确！

7、那么问题来了，怎么做好这每一小块的自适应配置呢！
