function ss(str) {
    if(str.length === 0) { return 0}
    let result = []
    result[0] = str[0];
    let count = 1;
    let i = 1
    while(i < str.length) {
      if(result.indexOf(str[i]) === -1) {
        result.push(str[i])
      } else {
         count = count > result.length ? count : result.length
         // result.split(0, result.indexOf(str[i]) + 1)
         result = result.slice(result.indexOf(str[i]) + 1, result.length -1)
      }
      i++
    }
    return count
  }
  console.log(ss('111'))
  console.log(ss('123454321'))
  console.log(ss('1222322546211111'))