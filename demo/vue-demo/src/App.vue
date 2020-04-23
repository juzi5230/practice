
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    // setTimeout(function() {
    document.querySelector('#loading-iframe').style.display = 'none'
    // }, 3000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* text-align: center; */
  color: #2c3e50;

  /* margin-top: 60px; */
  background-image: linear-gradient(to right, lightgrey 1px, transparent 0), linear-gradient(to bottom, lightgrey 1px, transparent 0);
  background-size: 10px 10px;
}
.inblock {
  display: inline-block;
}
.mg20 {
  margin: 20px;
}
</style>
