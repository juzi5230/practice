<template>
  <div class="container">
    <a href="https://juejin.im/post/5e8694b75188257372503722">为什么不使用index作为key值</a>
    <ul>
      <li v-for="(value, index) in arr" :key="index">
        <!-- <test /> -->{{value}}
      </li>
    </ul>
    <button @click="handleDelete">delete</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3]
    }
  },
  methods: {
    handleDelete() {
      this.arr.splice(0, 1)
    }
  }
//   components: {
//     test: {
//       template: '<li>{{Math.random()}}</li>'
//     }
//   }
}
</script>
<style lang="scss" scoped>
.container {
  font: {
    size: 10px + 10px;
  }
}
</style>
