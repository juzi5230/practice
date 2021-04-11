function fnc1(arr) {
//   return [...new Set(arr)]
  return Array.from(new Set(arr))
}
function fnc2(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index
    })
}