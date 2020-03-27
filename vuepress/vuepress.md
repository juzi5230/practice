# vuepress 学习记录

## 插槽

> 使用插槽可以根据页面布局需要定义页面显示

+ 定义插槽

```md
::: slot name11
 2、here is some description
:::
```

+ 在布局组件中利用 Content 组件来使用该插槽

```vue
1、this is some Implementation content1
<Content slot-key="name11"/> // 插槽引入
3、this is some Implementation content1
```

+ 实现效果

```result
1、this is some Implementation content1
2、here is some description
3、this is some Implementation content1
```

> 1、注意插槽名称的唯一性
> 2、插槽的位置就是插槽内容在布局组件中显示的位置，可以灵活修改

*开发项目时时间稍紧，没有细读vuepress文档，直接使用vuepress， 没有注意到插槽的使用，而是在md文件中引入vue组件时， 通过传递的参数判断页面显示的内容（类似vue中父组件多次调用子组件的方式），虽然也可以实现相关的布局，但是在md文档中需要多次调用组件，在组件中也需要接收props参数并在页面中作出判断，显然不如直接使用插槽更为方便*


## Front Matter

> 使用front Matter可以在三条虚线中预定义变量，或者自定义变量， 然后可以在自定义组件中通过$frontmatter调用

+ md文档

```front matter
---
title: Blogging Like a Hacker
lang: en-US
lala: "123"
---

# 页面其他内容
<component1/> // 调用布局组件
blablabla。。。。。
```

+ component1 布局组件

```vue
<template></template>
<script>
export default {
    mounted () {
        console.log(this.$frontmatter)
    }
}
</script>
```

+ 结果

```js
{title: "Blogging Like a Hacker", lang: "en-US", lala: "123"}
```

## 样式文件

> .vuepress/styles/palette.styl 建议只定义变量
> 额外添加样式的简便方法， 创建样式文件.vuepress/styles/index.styl， 就可以在这个文件里面添加正常的css样式了