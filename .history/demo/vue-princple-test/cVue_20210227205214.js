// @ts-nocheck
class Compile{
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 1、获取文档碎片对象 放入内存中会减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el)
    this.compile(fragment)
    this.el.appendChild(fragment)
  }
  compile(fragment) {
    const childNodes = fragment.childNodes
    childNodes.forEach(child => {
      if(this.isElementNode(child)) {
        // console.log('元素节点', child)
        this.compileElement(child)
      } else {
        // 文本节点 编译
        // console.log('文本节点', child)
        this.compileText(child)
      }
      if(child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    });
  }
  compileElement (node) {
    const attribute = node.attribute
    console.log(attribute)
    attribute.forEach(attr => {
        console.log(attr)
    })
  }
  compileText(node) {
    
  }
  node2Fragment (el) {
    // 创建文档碎片
    const f = document.createDocumentFragment()
    let firstChild
    console.log(el)
    console.log(el.firstChild)
    while(firstChild = el.firstChild) {
    //   console.log(firstChild)
      f.appendChild(firstChild)
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