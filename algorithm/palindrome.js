/*
* 回文字符串的判断, 使用split reverse join 方法 1+++++++++++
*/
// function palindrome(str) {
//     if(Object.prototype.toString.call(str) === '[object String]') {
//       console.log(str.split('').reverse().join(''))
//       return str.split('').reverse().join('') === str
//     } else {
//         return false
//     }
// }

/*
* 使用循环 方法2 ++++++++
*/
 
function palindrome(str) {
    let i = 0;
    let j = str.length - 1
    while(i < j) {
        if(str[i] !== str[j]) {
            return false
        }
        i++
        j--
    }
    return true
}


console.log(palindrome('ssssssdd'))
console.log(palindrome('asssssa'))