function fnc1(arr) {
//   return [...new Set(arr)]
  return Array.from(new Set(arr))
}
function fnc2(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index
    })
}
function fnc3 (arr) {
  let arrT = []
  for(let i = 0; i < arr.length; i++) {
    let arrT = arr.slice(i)
    if(arrT.indexOf(arr[i]) > -1) {
    //   arr.splice(i, 1) // 导致数组塌陷
    //   i--
    } else {
      arrT.push(arr[i])
    }
  }
}
function func4(arr) {
    for(let i = 0; i < arr.length; i++) {
      if(arr.indexOf(arr[i]) !== i) {
         arr[i] = null
      }
    }
    return arr.filter(item => {
      return item
    })
}
let s = [1, 2, ,3 ,2, 5, ,6, 8, 6, 8, 9]
console.log(s)
console.log(func4(s))