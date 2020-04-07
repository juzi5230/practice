# vue 问题累计

参考网址： https://juejin.im/post/5e8a9b1ae51d45470720bdfa

## watch

### 1. 立即执行

watch 是在监听属性改变时才会触发，有些时候，我们希望在组件创建后 watch 能够立即执行
可能想到的的方法就是在 create 生命周期中调用一次，但这样的写法不优雅，或许我们可以使用这样的方法

```vue
export default {
    data() {
        return {
            name: 'Joe'
        }
    },
    watch: {
        name: {
            handler: 'sayName',
            immediate: true
        }
    },
    methods: {
        sayName() {
            console.log(this.name)
        }
    }
}
```

### 2. 触发监听执行多个方法

使用数组可以设置多项，形式包括字符串、函数、对象

```vue
export default {
    data: {
        name: 'Joe'
    },
    watch: {
        name: [
            'sayName1',
            function(newVal, oldVal) {
                this.sayName2()
            },
            {
                handler: 'sayName3',
                immaediate: true
            }
        ]
    },
    methods: {
        sayName1() {
            console.log('sayName1==>', this.name)
        },
        sayName2() {
            console.log('sayName2==>', this.name)
        },
        sayName3() {
            console.log('sayName3==>', this.name)
        }
   }
}
```

## 3. 监听多个变量

watch本身无法监听多个变量。但我们可以将需要监听的多个变量通过计算属性返回对象，再监听这个对象来实现“监听多个变量”

```vue
export default {
    data() {
        return {
            msg1: 'apple',
            msg2: 'banana'
        }
    },
    compouted: {
        msgObj() {
            const { msg1, msg2 } = this
            return {
                msg1,
                msg2
            }
        }
    },
    watch: {
        msgObj: {
            handler(newVal, oldVal) {
                if (newVal.msg1 != oldVal.msg1) {
                    console.log('msg1 is change')
                }
                if (newVal.msg2 != oldVal.msg2) {
                    console.log('msg2 is change')
                }
            },
            deep: true
        }
    }
}
```
### 使用 @hook 即可监听组件生命周期，组件内无需做任何改变

通常我们监听组件生命周期会使用 $emit ，父组件接收事件来进行通知
子组件

```vue
export default {
    mounted() {
        this.$emit('listenMounted')
    }
}
<template>
    <div>
        <List @listenMounted="listenMounted" />
    </div>
</template>
```

其实还有一种简洁的方法，使用 @hook 即可监听组件生命周期，组件内无需做任何改变。同样的， created 、 updated 等也可以使用此方法。

```vue
<template>
    <List @hook:mounted="listenMounted" />
</template>
```

## $event

$event 是事件对象的特殊变量，在一些场景能给我们实现复杂功能提供更多可用的参数

### 在原生事件中表现和默认的事件对象相同

```vue
<template>
    <div>
        <input type="text" @input="inputHandler('hello', $event)">
    </div>
</template>
export default {
    methods: {
        inputHandler(msg, e) {
            console.log(e.target.value)
        }
    }
}
```

### 在自定义事件中表现为捕获从子组件抛出的值

```vue
my-item.vue

export default {
    methods: {
        customEvent() {
            this.$emit('custom-event', 'some value')
        }
    }
}

App.vue
<template>
    <div>
        <my-item v-for="(item, index) in list" @custom-event="customEvent(index, $event)">
            </my-list>
    </div>
</template>
export default {
    methods: {
        customEvent(index, e) {
            console.log(e) // 'some value'
        }
    }
}
```

## 手动挂载组件

```vue
import Vue from 'vue'
import Message from './Message.vue'

// 构造子类
let MessageConstructor = Vue.extend(Message)
// 实例化组件
let messageInstance = new MessageConstructor()
// $mount可以传入选择器字符串，表示挂载到该选择器
// 如果不传入选择器，将渲染为文档之外的的元素，你可以想象成 document.createElement()在内存中生成dom
messageInstance.$mount()
// messageInstance.$el获取的是dom元素
document.body.appendChild(messageInstance.$el)
```
