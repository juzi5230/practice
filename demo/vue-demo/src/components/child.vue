<template>
  <div @click="updateValueM">1111</div>
</template>

<script>
export default {
  props: ['deliveredValue'],
  watch: {
    deliveredValue: function(val) {
      console.log('子组件： ', val)
    }
  },
  methods: {
    updateValueM: function() {
      console.log('子组件触发了数据的变化')
      const temp = Math.random() * 100
      this.$emit('update:deliveredValue', temp)
    }
  }
}
</script>
