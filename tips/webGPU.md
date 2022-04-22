# webGPU 

## 示例代码

- [代码地址](https://github.com/Orillusion/orillusion-webgpu-samples.git)
- [视频讲解](https://www.zhihu.com/org/orillusionguan-fang/zvideos)

```others
不能将一般的array、object直接传递给GPU, 需要转换成typedArray的形式， new FLoat32Array→生成的数据是给cpu使用的，GPU没法直接使用，需要使用device.creatBuffer为GPU创建变量， new FLoat32Array（[1.0, 0.0, 1.0, 1.0]）, 一个数字对应4个字节
GPUBufferUsage.COPY_DST // 表示当前buffer可以作为拷贝的目标，如果不加这个参数，对应变量是不能被写入数据的，变量a加了这个参数，可以被拷贝

GPUBufferUsage.UNIFORM // 只读，不可更改，最大值64kb

GPUBufferUsage.STORAGE // 最大值2GB，可更改

arrayStride 表示要将buffer以多大的数据量进行切分

color为0-1的小数

通过creatBindGroup将buffer进行组合，对应的参数为entries，为一个array类型，可以绑定多个资源
```
## 基础知识

- 坐标系： webGPU坐标， 屏幕中心点为（0， 0， 0）， 对应xyz， 屏幕往里，为z轴，z轴的范围为0-1，x轴为从左往右，-1到1， y轴从下往上为-1到1
![camera](images/webGPU_coordinate.png)

- 任何的变化都可以通过平移、旋转、缩放来实现，通过矩阵可以实现响应的变化，定点坐标矩阵信息→通过平移、旋转、缩放矩阵，将一个图形进行坐标变换，近大远小。如下图所示：
![camera](images/webGPU_matrix.png)
![camera](images/webGPU_camera.png)