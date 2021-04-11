// 模板字符串

function render (template, data) {
  let reg = /\{\{(\w+)\}\}/
  while(reg.test(template)) {
    const name = reg.exec(template)[1]
    let t = template.replace(reg, data[name])
    template = t
  }
  return template
}
let template = '你好， 现在是{{year}}年, {{month}}月，岁月静好'
const data = {
  year: '2021',
  month: '04'
}
console.log(render(template, data))


/// 图片懒加载
let imgList = [...document.querySelectorAll('img')]
function lazyLoadImg(imgList) {
  return function () {
    imgList.forEach(img => {
      let top = img.getBoundingClientRect().top
      if(top < window.innerHeight) {
        // 添加元素src
        img.src = img.dataset.src // <img data-src="xxx">
        img.load = true // 标记元素是否已加载
      }
    });
    imgList = imgList.filter(function(item) {
      return !item.hasLoad
    })
  }
}