https://juejin.cn/post/7208005892313579576
1、mvvm的理解
2、vue的特点
3、vue的生命周期
- 对于 vue 来讲，生命周期就是一个 vue 实例从创建到销毁的过程
- 在生命周期的过程中会运行着一些叫做生命周期的函数，给予了开发者在不同的生命周期阶段添加业务代码的能力， 其实和回调是一个概念，当系统执行到某处时，检查是否有 hook(钩子)，有的话就会执行回调

```md
vue2 生命周期

beforeCreate：是 new Vue( ) 之后触发的第一个钩子，在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问。
created：在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 updated 函数。可以做一些初始数据的获取，在当前阶段无法与 DOM 进行交互，如果非要想，可以通过 vm.$nextTick 来访问 DOM 。
beforeMount：发生在挂载之前，在这之前 template 模板已导入渲染函数编译。而当前阶段虚拟 DOM 已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发 updated。
mounted：在挂载完成后发生，在当前阶段，真实的 DOM 挂载完毕，数据完成双向绑定，可以访问到 DOM 节点，使用 $refs 属性对 DOM 进行操作。
beforeUpdate：发生在更新之前，也就是响应式数据发生更新，虚拟 DOM 重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。
updated：发生在更新完成之后，当前阶段组件 DOM 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。
beforeDestroy：发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。
destroyed：发生在实例销毁之后，这个时候只剩下了 DOM 空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

beforeCreate( 创建前 )
created (创建后）
beforeMount (挂载前)
mount (挂载后)
beforeUpdate (更新前)
updated (更新后)
beforeDestroy（销毁前）
destroy（销毁后）

vue3 生命周期
setup             创建实例前
onBeforeMount    挂载DOM前
onMounted        挂载DOM后
onBeforeUpdate   更新组件前
onUpdated   更新组件后
onBeforeUnmount  卸载销毁前
onUnmounted   卸载销毁后

```
4、vue 参数传递


5、vuerouter
6、vuex 是什么，怎么使用，什么场景下需要使用
7、v-if， v-show的区别
8、如果组件中有20个小模块，只有背景图片不一样，其他样式完全一样，这个怎么处理（添加不同的class、使用scss 的for 循环等）
9、 == 和 === 的作用和区别


https://juejin.cn/post/7095899257072254989
1、html语义化
2、img 标签上title、alt的作用


axios： 
https://juejin.cn/post/6844904008872624142?searchId=202307240957154F59ED333C79CC9EB2F4

1、axios 修改头部参数，比如所有接口添加token，authorazation，或者数据返回后想要做某种处理应该怎么做，在哪做
拦截器： 请求拦截、响应拦截

css： 
https://juejin.cn/post/6844903810125529101?searchId=20230724095443E10C76807F7D7783BBB1
1、盒模型
2、div居中
3、flex布局
4、两栏布局
5、display有哪些属性