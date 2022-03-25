
<template>
  <div>
      <div id="canvas-frame"></div>
    <el-button type="primary" @click="changeRoute" class="next-page">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </div>
</template>

<script>
/*eslint-disable*/
import * as THREE from 'three' //引入Threejs
export default {
  name: 'threeJsDemo',
  data() {
    return {
       renderer: '',
       camera: '',
       scene: '',
       cube: '',
       width: 100,
       height: 100
    }
  },
  methods: {
    changeRoute() {
      this.$router.push({
        path: '/ImageShow/123'
      })
    },
    initThree() {
      // 同原生 WebGL 环境搭建过程一样，Three.js 也需要先设置画布 canvas 元素的大小
      this.width = document.getElementById('canvas-frame').clientWidth // 设置宽度属性为浏览器窗口宽度
      this.height = document.getElementById('canvas-frame').clientHeight // 设置高度属性为浏览器窗口高度
      // 新建一个 WebGL 渲染器并赋值给 this.renderer 变量
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      })
      // 设置画布大小为浏览器窗口大小
      this.renderer.setSize(this.width, this.height)
      // 将画布元素挂载到页面
      document.getElementById('canvas-frame').appendChild(this.renderer.domElement)
      // 设置清空画布的颜色为白色
      this.renderer.setClearColor(0xFFFFFF, 1.0)
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000)
      this.camera.position.x = 0 // 设置相机在三维空间坐标中 x 轴的位置
      this.camera.position.y = 10 // 设置相机在三维空间坐标中 y 轴的位置
      this.camera.position.z = 5 // 设置相机在三维空间坐标中 z 轴的位置
      this.camera.up.x = 0
      this.camera.up.y = 0
      this.camera.up.z = 1
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))// 设置相机的观察点
    },
    initScene() {
      this.scene = new THREE.Scene()
    },
    initObject() {
      // 首先创建一个一个几何类的实例并赋值给 geometry 变量
      var geometry = new THREE.BoxGeometry(1, 1, 1)
      // 然后创建一种材质的实例 MeshBasicMaterial 材质的构造函数能够创建一种简单的不受场景灯光效果影响的材质
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      // Mesh 是一种三角形网格基本单元的构造函数，类似于我们原生 WebGL 中的片元着色器它用于连接几何体和材质
      this.cube = new THREE.Mesh(geometry, material)
      // 最后将创建好的几何立方体添加到场景中
      this.scene.add(this.cube)
    },
    render() {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    // 最后将 Threee.js 环境初始化，场景创建，相机创建渲染器创建以及渲染初始化等函数合成到一起执行我们就完成了一个旋转立方体的绘制
    threeStart() {
      this.initThree()
      this.initCamera()
      this.initScene()
      this.initObject()
      this.render()
    }
  },
  mounted() {
    this.threeStart()
  }
}
</script>

<style scoped>
  #canvas-frame {
    border: none;
    cursor: pointer;
    width: 100%;
    height: 600px;
    background-color: #eee;
  }
</style>
