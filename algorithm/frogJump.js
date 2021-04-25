// 参考地址 https://juejin.cn/post/6951922898638471181
// @ts-nocheck
// 青蛙跳： 每次只能跳1-2个台阶， 共有n个台阶，会有几种情况
// 使用递归
function frog1 (n) {
  if(n === 1) return 1
  if(n === 2) return 2
  return flag1(n -1) + flag1(n - 2)
}

// 记录已经计算的数据，减少递归次数
function frog2(n) {
  var resultArr = new Array(n).join(',').split(',')
  resultArr[0] = 1
  resultArr[1] = 2
  function getResult(n) {
    if(n === 1) return resultArr[0]
    if(n === 2) return resultArr[1]
    if(!resultArr[n - 2]) resultArr[n - 2] = getResult(n - 1)
    if(!resultArr[n - 3]) resultArr[n - 3] = getResult(n - 2)
    return resultArr[n - 2] + resultArr[n - 3]
  }
  return getResult(n)
}