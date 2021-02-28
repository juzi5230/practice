class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer (data) {
    if(data && typeof data === 'object') {
      console.log(Object.keys(data))
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key,data[key])
      })
    }
  }
  defineReactive (obj, key, value) {
    // 递归遍历
    this.observer(value);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 订阅数据变化，往dep中添加观察者
        return value
      },
      set: (newVal) => {
        if (newVal !== value) {
          value = newVal
        }
      }
    })
  }
}