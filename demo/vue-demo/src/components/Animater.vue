
<template>
  <div>
    <div class="animater-container inblock mg20">
      <div class="js-animater animater" ref="animateObject"></div>
      <div class="css-animater animater"></div>
    </div>
    <el-button type="primary" @click="changeRoute" class="next-page">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    <div class="bg-image-set inblock mg20"></div>
    <!-- <div class="square"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      startL: '',
      startT: '',
      progressL: '',
      progressT: '',
      element: '',
      timestamp: '',
      left: 0,
      top: 0
    }
  },
  methods: {
    // 使用js和requestAnimationFrame实现动画效果， 使得动画效果的刷新频率和页面刷新频率同步，减少不必要的刷新（与使用setTimeout相比，使用setTimeout时，可能运行函数时，页面没有刷新，浪费cpu资源）
    step() {
      this.timestamp = new Date().getTime()
      if (this.progressL / 10 >= 200) {
        this.left = 1
        this.startL = ''
      }
      if (this.progressT / 10 >= 200) {
        this.top = 1
        this.startT = ''
      }
      if (this.top === 1 && this.left === 2) {
        this.startT = this.startT ? this.startT : this.timestamp
        this.progressT = this.timestamp - this.startT
        if (200 - this.progressT / 10 > 0) {
          this.element.style.top = 200 - this.progressT / 10 + 'px'
          window.requestAnimationFrame(this.step)
        } else {
          this.top = 0
          this.left = 0
          this.startT = ''
          this.startL = ''
          this.progressL = ''
          this.progressT = ''
        }
      }
      if (this.progressL / 10 < 200 && this.left === 0) {
        if (!this.startL) {
          this.startL = this.timestamp
        }
        this.progressL = this.timestamp - this.startL
        window.requestAnimationFrame(this.step)
        this.element.style.left = Math.min(this.progressL / 10, 200) + 'px'
      }
      if (this.progressT / 10 < 300 && this.progressL / 10 >= 200 && this.top === 0) {
        this.startT = this.startT ? this.startT : this.timestamp
        this.progressT = this.timestamp - this.startT
        window.requestAnimationFrame(this.step)
        this.element.style.top = Math.min(this.progressT / 10, 200) + 'px'
      }
      if (this.top === 1 && this.left === 1) {
        this.startL = this.startL ? this.startL : this.timestamp
        if ((200 - (this.timestamp - this.startL) / 10) > 0) {
          this.progressL = this.timestamp - this.startL
          window.requestAnimationFrame(this.step)
          this.element.style.left = 200 - this.progressL / 10 + 'px'
        } else {
          this.left = 2
        }
      }
    },
    changeRoute() {
      this.$router.push({
        path: '/ImageShow/123'
      })
    }
  },
  mounted() {
    this.element = this.$refs.animateObject
    window.requestAnimationFrame(this.step)
  }
}
</script>

<style scoped>
.animater {
  position: absolute;
  background: linear-gradient(lightblue, blue);
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.animater-container {
  position: relative;
  height: 220px;
  width: 220px;
  border: 1px solid lightgray;
  background: white;
  background-image:
    linear-gradient(
      90deg,
      rgba(200, 0, 0, .5) 50%,
      transparent 0
    ),
    linear-gradient(
      rgba(200, 0, 0, .5) 50%,
      transparent 0
    );
  background-size: 30px 30px;
}

/* 使用css3实现动画效果 */
.css-animater {
  /* will-change: left, top, transform; */

  /* animation: revolution 10s infinite; */
  animation: revolution 10s ease-out infinite, rotation 2s linear infinite;
}

@keyframes revolution {
  0% {
    top: 0;
    left: 0;
  }
  25% {
    top: 0;
    left: 200px;
  }
  50% {
    top: 200px;
    left: 200px;
  }
  75% {
    top: 200px;
    left: 0;
  }
  100% {
    top: 0;
    left: 0;
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/*  使用background-image： liner-gradient 可以实现很多复杂的背景图片，可以有效减少图片的引入，减少http请求及请求大小，优化页面效果 */
.bg-image-set {
  width: 320px;
  height: 260px;
  background-color: #fff;
  background-image: linear-gradient(to right, lightgrey 20%, transparent 0), linear-gradient(to bottom, lightgrey 20%, transparent 0), linear-gradient(to bottom right, #00efb8 60%, #3ba089 0);
  background-size: 100px 50px;
}

/* .square {
  width: 200px;
  height: 200px;
  background-image: linear-gradient(to right, lightgrey 1px, transparent 0), linear-gradient(to bottom, lightgrey 1px, transparent 0);
  background-size: 10px 10px;
} */
.next-page {
  position: absolute;
  right: 25px;
  bottom: 35px;
}
</style>
