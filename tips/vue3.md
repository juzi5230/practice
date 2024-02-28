# vue3 
- computed、watch、watchEffect 横向对比 <a href="https://juejin.cn/post/7239528592883122234?searchId=2024022811294470DDB1A687019950D03C"></a>

```vue3
<template>
  <div>
    <div class="speaker-section">
      <speakerContentTextArea></speakerContentTextArea>
    </div>
    <div>
      <!-- data: {{ data1 }} <br> -->
      data-age: {{ myData.age }} {{ myData.friends }}<br>
      data1-age: {{ myData1.age }} {{ myData1.friends }} <br>
      count: {{  count }}<br>
      myData2: {{ myData2 }}<br>
      myData3: {{ myData3 }}<br>
      countTest: {{ countTest }}<br>
    </div>
    <button @click="ageHandler">change age</button>
    <button @click="ageHandler1">change age1</button>
    <button @click="countHandler">change count</button>
    <button @click="myData2Handler">myData2Handler</button>
    <button @click="myData3Handler">myData3Handler</button>
    <button @click="countTestHandler">countTest</button>
  </div>
</template>

<script setup>
import speakerContentTextArea from '@/components/multitypeContent/speakerContentTextArea.vue'
import { computed, reactive, shallowReactive, ref, readonly, shallowReadonly, watch, watchEffect } from 'vue'
// 1、reactive 对象数据
const myData = reactive({ // 响应式
  name: 'cheng',
  age: 18,
  friends: ['李磊', '韩梅梅']
})
//2、 shallowReactive 对象数据 浅响应式 第一层是响应式的，内部结构是非响应式的,改变了但是页面没有响应式更新，下次页面更新会带出最新的修改
const myData1 = shallowReactive({ // 响应式
  name: 'cheng',
  age: 18,
  friends: ['李磊', '韩梅梅']
})
const data1 = computed(() => myData.name + ',,' + myData.friends[0])
// 3、ref 
const count = ref(0)
// 4、readonly
const myData2 = readonly({ // 非响应式，只读
  name: 'cheng',
  age: 18,
  friends: ['李磊', '韩梅梅']
})
// 4、shallowReadonly
const myData3 = shallowReadonly({ // 非响应式，根属性只读, 其他属性可修改，但新数据不会立马渲染到页面上
  name: 'cheng',
  age: 18,
  friends: ['李磊', '韩梅梅']
})

// 5、watch
const countTest = ref(0)
watch(countTest, (newValue, oldValue) => {
  console.log('countTest changed', newValue, oldValue)
})
// watch 不能直接监听ref 、reactive对象中的某个属性，会报错
const countTest1 = reactive({ // 非响应式，只读
  name: 'cheng',
  age: 18,
  friends: ['李磊', '韩梅梅']
})
// 以下为错误示范
watch(countTest1.age, (newValue, oldValue) => {
  console.log('countTest changed。。。1', newValue, oldValue)
})
// 以下为正确示范
watch(() => countTest1.age, (newValue, oldValue) => {
  console.log('countTest changed。。。2', newValue, oldValue)
})
const countTestHandler = () => {
  countTest.value++
  countTest1.age++
}
const ageHandler = () => {
  myData.age++
  // myData.friends.push('露西')
}
const ageHandler1 = () => {
  // myData1.age++
  // d++
  myData1.friends.push('露西')
}
const countHandler = () => {
  count.value++
}
const myData2Handler = () => {
  myData2.age++
  myData2.friends.push('露西')
}
const myData3Handler = () => {
  // myData3.age++
  myData3.friends.push('露西')
}
watchEffect(() => { // 如果项目中有一段逻辑，需要用到多个响应式数据，就可以使用watchEffect
  console.log('......ceshi...' + myData.age + '........' + countTest.value)
})
</script>
<style scoped>
.speaker-section {
  width: 400px;
  height: 200px;
}
</style>

```