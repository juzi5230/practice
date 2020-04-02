var arr = [1,40,6,7 ,8, 6 ,12, 90, 123]
function a (arr) {
  let temp = arr[0];
  for(let i = 1; i< arr.length; i++) {
      for(let j = 0; j< i; j++) {
          if(arr[j]>arr[i]) {
            let temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
          }
      }
  }
  console.log(arr)
}
// function insert(arr) {
//   for(let i = 1; i< arr.length; i++) {
//       let value = arr[i];
//       let j = i-1;
//       for(j>= 0; j--) {
//         if(arr[j])
//       }
//   }
// }
a(arr);
console.log(9999)