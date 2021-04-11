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

  // 输入一个正数n,输出所有和为n的连续的正整数序列

function creatArr(i, j) {
    let res = []
    for(let t = i; t < j + 1; t++) {
      res.push(t)
    }
    return res
 }
 function fn(count) {
    let resArr = []
    for(let i = 1; i <= Math.ceil(count / 2); i++) {
      let res = 0
      for(let j = i + 1; j <= Math.ceil(count / 2); j++ ) {
        res = (i + j) / 2 * (j - i + 1)
        if(res === count) {
           resArr.push(creatArr(i, j))
           break
        } else if(res > count) { break}
      }
    }
    console.log(resArr)
    return resArr
  }