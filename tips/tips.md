
# vue项目中

## 1.  处理ie9中调用el-select中显示光标的问题

    document.querySelector('.el-input__inner').setAttribute('unselectable','on');

***

## 2. calc() 函数用于动态计算长度值。

    需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
    任何长度值都可以使用calc()函数进行计算；
    calc()函数支持 "+", "-", "*", "/" 运算；
    calc()函数使用标准的数学运算优先级规则； 
***
## 3. 光标和文字样式分开修改

```css
    textarea{
      color: black; // 文字和光标颜色均为黑色
      text-shadow: 0px 0px 0px rgba(255, 0, 0, 1); //文字阴影的方式显示文字内容，为红色，光标未选中textarea时的样式
      -webkit-text-fill-color: transparent; // 文字设置透明填充色
      background-color:rgba(0, 0, 0, 0); // 背景色为透明色
    }
    /*textarea:focus{
      text-shadow:0px 0px 0px rgba(255, 0, 0, 1);// 用于修改光标选中textarea时的文字颜色显示
    }*/
```
***

## 4. /deep/  >>>  

    vue引用了第三方组件，需要在组件中局部修改第三方组件的样式，而有不想去除scoped属性造成组件之间的样式污染，此时可使用>>>，穿透scoped，有些sass之类的预处理器无法正确解析>>>,keyi shiyong /deep/操作符
    外层 >>> 第三方组件 {
       样式
    }
    /deep/ 第三方组件 {
       样式
    }
***

## 5. ie兼容性问题

  由于不同的浏览器，比如Internet Explorer 6,Internet Explorer 7,Mozilla Firefox等，对CSS的解析认识不一样，因此会导致生成的页面效果不一样，得不到我们所需要的页面效果。这个时候我们就需要针对不同的浏览器去写不同的CSS，让它能够同时兼容不同的浏览器，能在不同的浏览器中也能得到我们想要的页面效果。<u>这个针对不同的浏览器写不同的CSS code的过程，就叫CSS hack,也叫写**CSS hack**</u>

### 常用的css hack

    “\9″ IE6/IE7/IE8/IE9/IE10都生效
    “\0″ IE8/IE9/IE10都生效，是IE8/9/10的hack
    “\9\0″ 只对IE9/IE10生效，是IE9/10的hack
  **eg:** *min-width: auto\0;*

### el-element 对ie的兼容性问题

    多是因为ie不兼容flex布局导致，有些可以使用display：inline-block解决

  _eg：el-radio-group在ie9中使用会导致文字不显示，可能是font-size：0导致_

  *tips: 常见将li标签设置为display:inline-block/inline后，两个li标签之间会有空白，使用font-size： 0设置ul的属性可以去除这些空白，但是会导致ul中的文字不显示，因此需要设置li标签的font-size为需要的文字大小*
***

## 6. 阿里巴巴矢量图

    图片加入到项目中后，在线修改图片颜色，可能会导致文件下载后页面中不显示对应的样式

  *eg: 下载了✅样式的图片，但是之前修改了图片的颜色，项目中可能只显示一个绿色的方框，里面的对号并不显示（记录）*
***

## 7. Window self 属性
    
    self 属性返回指向当前 window 对象的引用，利用这个属性，可以保证在多个窗口被打开的情况下，正确调用当前窗口内的函数或属性而不会发生混乱。
    self 属性是只读的。
  注：window、self、window.self 是等价的
***

## 8.图灵机
    图灵机 (Turing machine, TM) 是由图灵在1936年提出的，它是一种精确的通用计算机模型，能模拟实际计算机的所有计算行为。
    所谓的图灵机就是指一个抽象的机器，它有一条无限长的纸带，纸带分成了一个一个的小方格，每个方格有不同的颜色。有一个机器头在纸带上移来移去。机器头有一组内部状态，还有一些固定的程序。在每个时刻，机器头都要从当前纸带上读入一个方格信息，然后结合自己的内部状态查找程序表，根据程序输出信息到纸带方格上，并转换自己的内部状态，然后进行移动。
    图灵机简单来说就是一个能接受信息、处理信息和发出信息的虚构的机器。世间万物皆为图灵机。
*词汇： 停机问题；P问题； NP问题； NPC问题*
***

## -webkit-line-clamp （限制在一个块元素显示的文本的行数）
    限制在一个块元素显示的文本的行数。
    -webkit-line-clamp 是一个不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。

    为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：

    display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示
    -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式
    text-overflow，可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本

  *eg:*
  *overflow : hidden; //超出部分隐藏*   
  *text-overflow: ellipsis;  //内容超出显示为省略号*    
  *display: -webkit-box;  //必要的属性*   
  *-webkit-line-clamp: 2;  //显示为两行内容*    
  *-webkit-box-orient: vertical;  //设置或检索伸缩盒对象的子元素的排列方式*     

    如果你标签内的是英文，英文是不会自动换行的，所以你需要让他自动换行添加如下代码即可:
    word-wrap:break-word;
    word-break:break-all;

## 数组内容发生改变，view未重新渲染？
    this.$set(target, key, value)
    target：要更改的数据源(可以是对象或者数组)

    key：要更改的具体数据(可以是字符串和数字)

    value ：重新赋的值
    另外，vue重写了数组的push、pop等方法，使这些操作下的变动可以被监听到。
