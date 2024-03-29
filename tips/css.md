# css 问题累计

## rem、em、px

+ 1、PX ：像素（Pixel）
PX是相对长度单位，它是相对于显示器屏幕分辨率而言的。
优缺点：比较稳定和精确，但在浏览器中放大或缩放浏览页面时会出现页面混乱的情况。

+ 2、EM：是相对长度单位。
EM是相对于父元素来设计字体大小的。如果当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。
优缺点：EM的值并不是固定的，它会继承父级元素的字体大小。

      EM和PX的之间的相互转换： 
      任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合:1em=16px。那么12px=0.75em,10px=0.625em。 
      为了使用方便，用em时，我们通常在CSS中的body选择器中声明 font-size=62.5%（使em值变为 16px*62.5%=10px）, 之后，你只需要将你使用的px值除以10，即可得到em值，如：12px=1.2em,10px=1em。 

+ 3、REM ：是CSS3新增的一个相对单位（root em，根em）
REM是相对单位，是相对HTML根元素。
这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。 目前，除了IE8及更早版本外，所有浏览器均已支持rem

## line-height 单位表示

+ 1. line-height:150%、line-height:1.5、line-height: 1.5em的真正区别是什么？
+ 2. 数字的时候，子元素的行高 = 子元素的字体大小 * 数字
+ 3. 百分比和em单位时，子元素的行高 = 父元素的字体大小 * 百分比（或者em单位的值）

## 标准盒模型的内容大小就是content的大小，而ie盒模型的大小则是content+padding+border总的大小

## 页面中设置灰度

```css
filter: greyscale(1);
```

## bem的命名规则

   BEM的命名规矩很容易记：block-name__element-name--modifier-name，也就是模块名 + 元素名 + 修饰器名

eg：
      page-btn__prev
      page-btn__list

## stylelint

### vue项目添加stylelint

参考网址： https://www.jianshu.com/p/8a33aa5e34b5

### stylelint关闭规则

关闭所有规则

```css
/* stylelint-disable */
a {}
/* stylelint-enable */
```

关闭单个规则

```css
/* stylelint-disable selector-no-id, declaration-no-important */
#id {
  color: pink !important;
}
/* stylelint-enable selector-no-id, declaration-no-important */
```

关闭单行

```css
#id { /* stylelint-disable-line */
  color: pink !important; /* stylelint-disable-line declaration-no-important */
}
```

注释关闭下一行的规则

```css
#id {
  /* stylelint-disable-next-line declaration-no-important */
  color: pink !important;
}
```

### 常用配置

```js
module.exports = {
  extends: ['stylelint-config-standard', 'css-properties-sorting'],
  plugins: ['stylelint-order'], // stylelint-order是CSS属性排序插件
  rules: {
    'no-descending-specificity': null,
    // "color-hex-case": "lower", // 颜色值为小写字母(stylelint-config-standard)
    // "color-no-invalid-hex": true, // 颜色值不能为无效值(stylelint-config-standard)
    // 'font-family-name-quotes': 'always-where-recommended', // 字体系列中命名时带引号
    // 'function-url-quotes': 'always', // 地址一定要写引号
    // 'number-leading-zero': 'never', // 要求或分数低于1的数字禁止前导零
    // 'number-no-trailing-zeros': true, // 禁止在数量尾随零
    // 'string-quotes': 'double', // 指定字串，双引号
    // 'length-zero-no-unit': true, // 禁止单位零长度。
    // 'value-keyword-case': 'lower', // 指定小写关键字的值
    // 'value-list-comma-newline-after': 'always-multi-line', // 在值列表的逗号后指定一个换行符或禁止留有空格
    // 'shorthand-property-no-redundant-values': true, // 不允许在简写属性冗余值
    // "property-case": "lower", // 为属性指定小写(stylelint-config-standard)
    // 'keyframe-declaration-no-important': true, // 不允许!important在关键帧声明
    // "block-closing-brace-empty-line-before": "never", // 不允许关闭括号前空一行(stylelint-config-standard)
    // "block-closing-brace-newline-after": "always", // 需要一个换行符关闭括号后的空白(stylelint-config-standard)
    // "block-opening-brace-newline-after": "always-multi-line", // 开括号的块之后需要新的一行(stylelint-config-standard)
    'selector-class-pattern': '^[a-zA-Z]+([a-zA-Z0-9]?|[a-zA-Z0-9\\-\\_\\--]*[a-zA-Z0-9])$', // 指定一个模式类选择符，限制选择器名称写法
    'selector-id-pattern': '^[a-zA-Z]+([a-zA-Z0-9]?|[a-zA-Z0-9\\-\\_\\--]*[a-zA-Z0-9])$', // 指定一个模式，id选择器，限制选择器名称写法
    // 'value-keyword-case': 'lower', // 属性值小写
    'no-empty-source': null, // 不允许空的来源
    'at-rule-no-unknown': null, // 不允许at-rules不明
    // "indentation": 2, // 指定缩进(stylelint-config-standard)
    // 'max-nesting-depth': 3, // 允许嵌套的深度为3
    'no-duplicate-selectors': true, // 不允许重复的选择器
    // "no-eol-whitespace": true, // 不允许行尾空白(stylelint-config-standard)
    // "no-invalid-double-slash-comments": true // 不允许双斜杠注释(/ /…)不支持CSS(stylelint-config-standard)
    'order/order': [ // 指定声明块内的内容顺序
      ['custom-properties', 'declarations'], {
        disableFix: true
      }
    ],
    'order/properties-order': [ // 指定声明块内属性的字母顺序
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'content',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak'
    ]
  }
}
```

## 处理ie9中调用el-select中显示光标的问题.............................

    document.querySelector('.el-input__inner').setAttribute('unselectable','on');

## calc() 函数用于动态计算长度值。........

    需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；

    任何长度值都可以使用calc()函数进行计算；.....

    calc()函数支持 "+", "-", "*", "/" 运算；
    calc()函数使用标准的数学运算优先级规则； 

## 光标和文字样式分开修改

``` css
    textarea {
        color: black; // 文字和光标颜色均为黑色
        text-shadow: 0px 0px 0px rgba(255, 0, 0, 1); //文字阴影的方式显示文字内容，为红色，光标未选中textarea时的样式
        -webkit-text-fill-color: transparent; // 文字设置透明填充色
        background-color: rgba(0, 0, 0, 0); // 背景色为透明色
    }

    /*textarea:focus{
      text-shadow:0px 0px 0px rgba(255, 0, 0, 1);// 用于修改光标选中textarea时的文字颜色显示
    }*/
```

## /deep/  >>>  

    vue引用了第三方组件，需要在组件中局部修改第三方组件的样式，而有不想去除scoped属性造成组件之间的样式污染，此时可使用>>>，穿透scoped，有些sass之类的预处理器无法正确解析>>>, keyi shiyong /deep/操作符
    外层 >>> 第三方组件 {
       样式

    }

    /deep/ 第三方组件 {
       样式

    }

## ie兼容性问题

  由于不同的浏览器，比如Internet Explorer 6, Internet Explorer 7, Mozilla Firefox等，对CSS的解析认识不一样，因此会导致生成的页面效果不一样，得不到我们所需要的页面效果。这个时候我们就需要针对不同的浏览器去写不同的CSS，让它能够同时兼容不同的浏览器，能在不同的浏览器中也能得到我们想要的页面效果。<u>这个针对不同的浏览器写不同的CSS code的过程，就叫CSS hack, 也叫写**CSS hack**</u>

### 常用的css hack

    “\9″ IE6/IE7/IE8/IE9/IE10都生效
    “\0″ IE8/IE9/IE10都生效，是IE8/9/10的hack
    “\9\0″ 只对IE9/IE10生效，是IE9/10的hack
  **eg:** *min-width: auto\0; *

### el-element 对ie的兼容性问题

    多是因为ie不兼容flex布局导致，有些可以使用display：inline-block解决

  _eg：el-radio-group在ie9中使用会导致文字不显示，可能是font-size：0导致_

  *tips: 常见将li标签设置为display:inline-block/inline后，两个li标签之间会有空白，使用font-size： 0设置ul的属性可以去除这些空白，但是会导致ul中的文字不显示，因此需要设置li标签的font-size为需要的文字大小*

## -webkit-line-clamp （限制在一个块元素显示的文本的行数）

    限制在一个块元素显示的文本的行数。

    -webkit-line-clamp 是一个不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。

    为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：

    display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示
    -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式

    text-overflow，可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本

  *eg:*
  

``` 
    *overflow : hidden; //超出部分隐藏*   
    *text-overflow: ellipsis;  //内容超出显示为省略号*    
    *display: -webkit-box;  //必要的属性*   
    *-webkit-line-clamp: 2;  //显示为两行内容*    
    *-webkit-box-orient: vertical;  //设置或检索伸缩盒对象的子元素的排列方式*     
  ```

    如果你标签内的是英文，英文是不会自动换行的，所以你需要让他自动换行添加如下代码即可:
    word-wrap:break-word;
    word-break:break-all;

## 水平居中

+ 行内元素: text-align: center
+ 块级元素: margin: 0 auto
+ position:absolute +left:50%+ transform:translateX(-50%)
+ display:flex + justify-content: center

## img的srcset

+ srcset属性允许作者根据不同分辨率或不同的视窗尺寸提多个不同分辨图像。用户代理会根据之前获取的任何资源做选择，从而避免多个资源加载浪费带宽和相关性能问题
+ 属性格式：图片地址 宽度描述w 像素密度描述x。 多个资源时，使用逗号分割

```html
<img srcset="banner-360w.jpg, banner-720w.jpg 2x, banner-1080w.jpg 3x" src="720.jpg"></img>
<img src="small.jpg " srcset="big.jpg 1920w, middle.jpg 800w, small.jpg 1x" />
```

## dpr

DPR:
　　设备像素比DPR(devicePixelRatio)是默认缩放为100%的情况下，设备像素和CSS像素的比值
　　dpr，也被成为device pixel ratio，即物理像素与逻辑像素的比，那也就不难理解：iphone6下dpr=2，iphone6+下dpr=3（考虑的是栅格化时的像素，并非真实的物理像素）;
　　
      DPR = 设备像素 / CSS像素(某一方向上)

## 清浮动

+ 1. 在最后一个浮动元素后面添加新标签， 设置clear： both

```html
  <div class="fahter clearfix">
  <div class="big">big</div>
  <div class="small">small</div>
  <div class="clear">额外标签法</div>
  </div>
```

```css
  .fahter{
  width: 400px;
  border: 1px solid deeppink;
  }
  .big{
  width: 200px;
  height: 200px;
  background: darkorange;
  float: left;
  }
  .small{
  width: 120px;
  height: 120px;
  background: darkmagenta;
  float: left;
  }
```

+ 父级添加overflow属性

```css
  .fahter{
    width: 400px;
    border: 1px solid deeppink;
    overflow: hidden;
  }
```

+ 为父元素使用after伪元素清浮动

```css
  .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
  }
  .clearfix{
    *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
  }
```

## @media

```css
@media screen and (max-width: 400px) {
    body {
        background-color:lightblue;
    }
}
```

## flex布局

+ 项目开发中经常使用第三方组件库， 如element、vant来实现页面布局，平时比较少使用纯flex布局开发， 还是需要熟悉下的，万一哪天有的布局不能很好的复用第三方库的效果呢～

参考网址： http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

## 性能比较

css的渲染机制是从右向左查询， 第二种只需要查询一层，而第一种需要查询两层 

+ 1 、 .box .a {}
+ 2、 a {}

## css 选择器

明明所有的文档你都看了，但是遇到相关的应用依然不确定是否是它！

element3的icon样式中有这样的代码：

```css
  [class^='el-icon-'],
  [class*=' el-icon-'] {
  /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'element-icons' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
  
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
```

一开始感觉好神奇， 貌似第一次见这种使用方法， 然而看了

[w3c 参考链接](https://www.w3school.com.cn/cssref/css_selectors.asp)

之后， 忽然觉得自己啥也不是， 明明那么基础的东西， 我却感觉很新奇 ？！ 伤害性不大，侮辱性极强！

## backdrop-filter
backdrop-filter CSS 属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。 因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明
