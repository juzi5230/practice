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
        return value
      },
      set (newVal) {
        if (newVal !== value) {
          value = newVal
        }
      }
    })
  }
}