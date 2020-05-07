
<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
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
  color: #2c3e50;
}
.inblock {
  display: inline-block;
}
.mg20 {
  margin: 20px;
}
body {
  background-image: linear-gradient(to right, lightgrey 1px, transparent 0), linear-gradient(to bottom, lightgrey 1px, transparent 0);
  background-size: 10px 10px;
}
.slide-fade-enter-active {
  transition: all .5s;
}
.slide-fade-leave-active {
  transition: all .2s;
}
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(-1000px);
}
.lightblue {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  box-shadow: 0 0 0 100px rgb(0, 0, 255);
  border-radius: 50% 50% 50% 50%;
  background-color: transparent;
}
.border-type {
  width: 100px;
  height: 100px;
}
</style>
