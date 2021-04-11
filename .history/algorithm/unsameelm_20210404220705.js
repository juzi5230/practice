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
  for(let i = 0; i < arr.length -1; i++) {
    let arrT = arr.slice(i)
    if(arrT.indexOf(arr[i]) > -1) {
    //   arr.splice(i, 1) // 导致数组塌陷
    //   i--
    } else {
      arrT.push(arr[i])
    }
  }
}