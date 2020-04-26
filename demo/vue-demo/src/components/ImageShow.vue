<template>
  <div class="image-container">
      <!--修改网速为mid-tier mobile， 可以查看图片加载的过程，从上到下， fadeIn方式显示等-->
      <!-- 显示方式，可以使用ps在保存图片时， 保存为web应用格式类型， 然后修改相关配置实现， 转换为srgb， 透明度、交错 -->
      <!-- prototype1， prototype2 首先使用了ps修改了图片的尺寸，然后使用tiny进行了压缩， 减小图片的大小 -->
      <img src="../assets/images/prototype.jpg" alt="" width="200" height="216">
      <img src="../assets/images/prototype1.png" alt="">
      <img src="../assets/images/prototype2.png" alt="">
      <img srcset="../assets/images/prototype.jpg, ../assets/images/prototype1.png 2x, ../assets/images/prototype2.png 3x" src="prototype.jpg" />
  </div>
</template>

<script>
export default {
  name: 'ImageShow',
  mounted() {
    console.log(this.$route.params)
  }
}
</script>
<style scoped>
.image-container {
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  margin: 20px;
}
.image-container img {
  margin-top: 10px;
}
.lazy-container {
  width: 200px;
  height: 100px;
  border-width: 10px;
  border-style: dashed;
  border-image: linear-gradient(pink, yellow) 10;
}
</style>

