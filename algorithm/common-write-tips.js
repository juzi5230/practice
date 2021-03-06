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

// 函数柯里化

function curry(fn) {
  let resultFn = (...args) => {
    if(args.length ===  fn.length) {// ES6指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真
      return fn(...args)
    } else {
      return (...arg) => {
        return resultFn(...arg, ...args) 
        /*此处学到了一个新的知识点， 箭头函数后面没有加大括号并且只有一行代码返回，是会默认return的；
        **而箭头函数后面加了大括号，则不会默认return
        * 但是如果返回一个对象的化，单行句子 () => {obj: 1}, 有问题， 需要做的处理是， () => （{obj: 1}）， 参考链接： https://www.liaoxuefeng.com/wiki/1022910821149312/1031549578462080
        */
      }
    }
  }
  return resultFn
}

// promise.all

Promise.all = function(promiseArr){
  let index = 0, result = []
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
       Promise.resolve(p).then(res => {
         result[i] = res
         index++
         if(index === promiseArr.length) {
           resolve(result)
         }
       }).catch(err => {
         reject(err)
       })
     })
  })
}

// instanceof
function instanceOf(leftValue, rightValue) {
  let right = rightValue.prototype
  let left = leftValue.__proto__
  while(true) {
    if(right === null) return false
    if(left === right) {
      return true
    }
    left = left.__proto__
  }
}

// jsonp
function jsonP(url, data, callback) {
  let res = ''
  for(let key in data) {
    if(data.hasOwnProperty(data[key])) {
      res += `${key}=${data[key]}&`
    }
  }
  let result = `${url}?${res}callback=${callback}`
  return new Promise((resolve, reject) => {
    let s = document.createElement('script')
    s.src = result
    document.body.appendChild(s)
    window[callback] = function(data) {
      if(data.code === '200') {
        resolve(data)
      } else {
        reject(data)
      }
      document.removeChild(s)
    }
  })
}