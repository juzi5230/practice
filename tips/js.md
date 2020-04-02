# js tips

## 闭包

闭包就是能够读取其他函数内部变量的函数
由于内部匿名函数的作用域链 在引用 外部包含函数的活动对象 ，即使外部函数执行完毕了，它的活动对象还是不会被销毁！

即，外部函数的执行环境作用域链都销毁了，它的活动对象还在内存中留着呢。

并且根据垃圾回收机制，被另一个作用域引用的变量不会被回收。

所以，除非内部的匿名函数解除对活动变量的引用（解除对匿名函数的引用），才可以释放内存。

+ 常见问题， 如下代码

```js
<script type="text/javascript">
 function test(){
  var arr = [];
  for(var i = 0; i < 10; i++){
    arr[i] = function(){
      console.log(i);
    }
  }
  return arr;
 }
 var myArr = test();
 for(var j = 0;j<10;j++){
  myArr[j]();
 }
</script>
```

+ 使用立即执行函数解决闭包的问题

```js
<script type="text/javascript">
 function test(){
  var arr = [];
  for(var i = 0; i < 10; i++){
   (function(j){
    arr[j] = function(){
     console.log(j);
    }
   }(i));
  }
  return arr;
 }
 var myArr = test();
 for(var j = 0;j<10;j++){
  myArr[j]();
 }
</script>
```

## 内存泄漏

### 谷歌浏览器中查看内容泄漏

+ 打开开发者工具，选择 Performance 面板
+ 在顶部勾选 Memory
+ 点击左上角的 record 按钮
+ 在页面上进行各种操作，模拟用户的使用情况
+ 一段时间后，点击对话框的 stop 按钮，面板上就会显示这段时间的内存占用情况(如下图)
+ 查看js-heap走势图

> 有两种方式来判定当前是否有内存泄漏：

+ 多次快照后，比较每次快照中内存的占用情况，如果呈上升趋势，那么可以认为存在内存泄漏
+ 某次快照后，看当前内存占用的趋势图，如果走势不平稳，呈上升趋势，那么可以认为存在内存泄漏

<img src="images/leak.png">

### 造成内存泄漏的常见情况

+ 闭包
+ 未处理的setTimeout
+ dom引用
+ 全局变量
