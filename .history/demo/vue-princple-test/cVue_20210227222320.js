// @ts-nocheck
const compileUtil = {
  getValue(expr, vm) {
    return expr.split('.').reduce((data, currentVal) => {
      console.log('.....')
      console.log(currentVal)
      return data[currentVal]
    }, vm.$data)
  },
  text (node, expr, vm) { //expr: msg
    let value;
    if(expr.indexOf('{{') > -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g,(...args) => {
        console.log(args)
      })
    } else {
      value = this.getValue(expr, vm)
    }
    // const value =  this.getValue(expr, vm)
    this.updater.textUpdater(node, value)
  },
  html(node, expr, vm) {
    const value = this.getValue(expr, vm)
    this.updater.htmlUpdater(node, value)
  },
  model(node, expr, vm) {
    const value = this.getValue(expr, vm)
    this.updater.modelUpdater(node, value)
  },
  on(node, expr, vm, eventName) {

  },
  updater: {
    modelUpdater (node, value) {
      node.value = value
    },
    htmlUpdater (node, value) {
      node.innerHTML = value
    },
    textUpdater (node, value) {
      node.textContent = value
    }
  }
}
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
    const attribute = node.attributes || []
    let list = Array.from(attribute)
    list.length && list.forEach(attr => {
      const {name, value} = attr
      if(this.isDirective(name)) {
        const [, directive] = name.split('-') // text, htm, model, on:click
        const [dirName, eventName] = directive.split(':')
        compileUtil[dirName](node, value, this.vm, eventName)
        node.removeAttribute('v-' + directive)
      }
    })
  }
  compileText(node) {
    const content = node.textContent
    if(/\{\{{.+?)\}\}/.test(content)) {
      compileUtil['text'](node, content, this.vm)
    }
  }
  isDirective (name) {
    return name.startsWith('v-')
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