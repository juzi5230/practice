# deck.gl

## IconLayer

- IconLayer 可以使用现有的图片左右显示内容，也可以自定义

现有图片的使用如： [官网事例](https://deck.gl/docs/api-reference/layers/icon-layer)

自定义的话， 指定iconAtlas的值， 如官网所示： iconAtlas (String|Texture2D|Image|ImageData|HTMLCanvasElement|HTMLVideoElement|ImageBitmap|Promise|Object, optional)

如下为使用canvas自定义icon内容

```js
        let tagEle = document.createElement('canvas')
        var tagCxt= tagEle.getContext("2d");
        var img = document.getElementById('carTagImg') // 获取图片元素
        tagCxt.scale(2, 2) // 设置scale 为2， 2， 原有尺寸的2倍
        tagCxt.drawImage(img, 0, 0, 53, 22); // 设置图片大小为画布的二分之一， 这些设定是为了处理画布内容模糊问题
        tagCxt.font = "8px PingFangSC-Semibold, PingFang SC"
        tagCxt.fillStyle = "#010F1C"
        tagCxt.textBaseline = 'middle'
        tagCxt.textAlign = 'center'
        tagCxt.fillText("customer-text", 26.5, 12) // 文字位置居中

        new IconLayer({
          id: 'xxx',
          data: data, // 自定义data值
          pickable: true,
          iconAtlas: tagEle, // 自定义Icon内容
          iconMapping: { // icon位置及大小相关配置
            marker: {
              x: 0,
              y: 0,
              width: 106,
              height: 44,
              anchorY: 50,
              mask: false
            }
          },
          getIcon: d => 'marker'
        })
```