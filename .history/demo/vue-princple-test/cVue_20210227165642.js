class Compile{
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 1、获取文档碎片对象 放入内存中会减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el)
    // console.log(fragment)
  }
  node2Fragment (el) {
    // 创建文档碎片
    const f = document.createDocumentFragment()
    let firstChild
    while(firstChild = el.firstChild) {
      console.log(firstChild)
      f.appendChild(firstChild)
      console.log('.....', f)
      console.log(el)
    }
    return f
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
}
class CVue {
  constructor (options) {
    this.$el = options.el
    this.$data = options.data
    this.$option = options
    if(this.$el) {
      // 1、实现一个数据观察者
      // 2、实现一个指令解析器
      new Compile(this.$el, this)
    }
  }
}