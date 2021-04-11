function fnc1(arr) {
//   return [...new Set(arr)]
  return Array.from(new Set(arr))
}