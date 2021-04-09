class EventEmitter {
  constructor() {
    this.caches = {}
  }
  on (name, fn) {
    if(this.caches[name]) {
      this.caches[name].push(fn)
    } else {
      this.caches[name] = [fn]
    }
  }
  emit (name, ...args) {
    if(!this.caches[name]) {
      return 
    } else { // !!!!!!!!!!!!
      this.caches[name].forEach(fn => {
        fn(...args)
      })
    }
  }
  off(name, fn) {
    // 可以使用findIndex 查找
    for(let i = 0; i < this.caches[name].length; i++) {
      if(this.caches[name][i] === fn) {
        this.caches.splice(i, 1)
        break
      }
    } 
  }
}
function fun1 () {
  console.log(1)
}
function fun2 () {
  console.log(2)
}
let bus = new EventEmitter()
bus.on('name', fun1)
bus.on('name', fun2)
bus.emit('name')