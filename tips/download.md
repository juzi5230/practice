
  # 下载预览

  + 项目开发中使用a标签下载文件，但是修改文件名不生效， 原因： download 修改文件名，在非同源/跨域情况下不起作用，找到了以下方法：

  ```js
      downloadFiles (url, name) {
      // let a = document.createElement('a')
      // a.download = name
      // a.href = url // 这里的请求方式为get，如果需要认证，接口上需要带上token
      // a.click()
      
      var a = document.createElement("a");
      a.href = url
      a.download = name;
      a.click();
  ```

  ```js
    courseDownload(url, filename) {
      let _this = this
      this.getBlob(url, function(blob) {
        _this.saveAs(blob, filename);
      })
    },
    getBlob(url,cb) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = function() {
        if (xhr.status === 200) {
          cb(xhr.response);
        }
      };
      xhr.send();
    },
    saveAs(blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
      } else {
        var link = document.createElement('a');
        var body = document.querySelector('body');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);
        link.click();
        body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }
    }
```

+ 项目中只有遇到预览的问题， 由于后端会将文档类文件转码成pdf文件，所以前端主要使用pdfjs预览文件， 如果是图片的话，就在新的页面打开

```js
    if (type.toLowerCase() === "pdf") {
      // window.open("./static/pdfjs/web/viewer.html?file=" + file.convertUrl);
      window.open("./pdfjs-2.5.207-es5/web/viewer.html?file=" + file.convertUrl)
    } else {
      let routeUrl = this.$router.resolve({
        path: "/preview",
        query: {
          previewUrl: file.convertUrl,
        },
      });
      window.open(routeUrl.href, '_blank');
    }
```
