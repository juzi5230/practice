let arr = [1, 2, 3, [3, 5, 6, [888]]]

console.log(arr.flat(Infinity)) // es6方法直接实现

console.log(arr.toString().split(',').map(item => parseFloat(item)))


let t = JSON.stringify(arr)
let res = t.replace(/(\[|\])/g, '').split(',').map(item => parseFloat(item))