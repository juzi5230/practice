class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer (data) {
    if(data && typeof data === 'object') {
      console.log(Object.keys(data))
    }
  }
}