class Compile{
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
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
      new Compile()
    }
  }
}