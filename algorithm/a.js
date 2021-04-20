function instanceOf(instance, initClass) { 
  let res = false
  while(initClass) {
    if(instance.__proto__ === initClass) {
      res = true
      break
    }
    initClass = initClass.__proto__
  }
  return res
}