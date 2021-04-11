function fbnq(count) {
    function fn(count, pre = 1, next = 1) {
      if(count === 0) {
        return pre
      } else {
        return fn(count - 1, next, next + pre)
      }
    }
    return fn(count, 1, 1)
  }