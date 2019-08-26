
 # vue项目中
 ## 1.  处理ie9中调用el-select中显示光标的问题
    document.querySelector('.el-input__inner').setAttribute('unselectable','on');

 
 ## 2. calc() 函数用于动态计算长度值。
    需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
    任何长度值都可以使用calc()函数进行计算；
    calc()函数支持 "+", "-", "*", "/" 运算；
    calc()函数使用标准的数学运算优先级规则； 

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
## 4. /deep/  >>>  
   vue引用了第三方组件，需要在组件中局部修改第三方组件的样式，而有不想去除scoped属性造成组件之间的样式污染，此时可使用>>>，穿透scoped，有些sass之类的预处理器无法正确解析>>>,keyi shiyong /deep/操作符
   外层 >>> 第三方组件 {
       样式
   }
   /deep/ 第三方组件 {
       样式
   }

