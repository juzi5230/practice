
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

  由于不同的浏览器，比如Internet Explorer 6,Internet Explorer 7,Mozilla Firefox等，对CSS的解析认识不一样，因此会导致生成的页面效果不一样，得不到我们所需要的页面效果。这个时候我们就需要针对不同的浏览器去写不同的CSS，让它能够同时兼容不同的浏览器，能在不同的浏览器中也能得到我们想要的页面效果。<u>这个针对不同的浏览器写不同的CSS code的过程，就叫CSS hack,也叫写CSS hack</u>

  ### 常用的css hack

    “\9″ IE6/IE7/IE8/IE9/IE10都生效
    “\0″ IE8/IE9/IE10都生效，是IE8/9/10的hack
    “\9\0″ 只对IE9/IE10生效，是IE9/10的hack
  *eg:min-width: auto\0;*

  ### el-element 对ie的兼容性问题

    多是因为ie不兼容flex布局导致，有些可以使用display：inline-block解决

  _eg：el-radio-group在ie9中使用会导致文字不显示，可能是font-size：0导致_
  *tips: 常见将li标签设置为display:inline-block/inline后，两个li标签之间会有空白，使用font-size： 0设置ul的属性可以去除这些空白，但是会导致ul中的文字不显示，因此需要设置li标签的font-size为需要的文字大小*

