let arr = [1, 2, 3, [3, 5, 6, [888]]]

console.log(arr.flat(Infinity)) // es6方法直接实现

console.log(arr.toString().split(',').map(item => parseFloat(item)))


let t = JSON.stringify(arr)
let res = t.replace(/(\[|\])/g, '').split(',').map(item => parseFloat(item))


function flattern(arr) {
    while(arr.some(item => Array.isArray(item))) { // 如果有存在数组，返回true
        arr = [].concat(...arr)
    }
    return arr
}

//利用reduce实现
function flatten(arr) {
    return arr.reduce(function (prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}