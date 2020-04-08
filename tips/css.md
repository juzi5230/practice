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