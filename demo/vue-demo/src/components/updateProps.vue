<template>
  <div>
    <div @click="changeDeliveredValue">{{tempData}}</div>
    <child :deliveredValue.sync="tempData"></child>
  </div>
</template>

<script>
import child from './child'
export default {
  data() {
    return {
      tempData: '1211111111111111111111'
    }
  },
  watch: {
    // 无论是父组件还是子组件触发数据的变化，都是父组件的数据先被监听到变化
    tempData: function(val) {
      console.log('父组件： ', val)
    }
  },
  methods: {
    changeDeliveredValue() {
      console.log('父组件触发了数据的变化')
      this.tempData = Math.pow(Math.random() * 10, Math.random() * 10)
    }
  },
  components: {
    child
  }
}
</script>
