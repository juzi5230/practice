// // function quickSort(arr, start, end) {
// //   let i = start
// //   let j = end
// //   let temp = arr[start]
// //   if(i < j) {
// //     while(i <= j) {
// //       while(temp >= arr[j]) {
// //         arr[i] = arr[j]
// //         i++
// //       }
// //       while(temp >= arr[i]) {
// //         i++
// //       }
// //     }
// //     arr[i] = temp
// //     quickSort(arr, start, i-1)
// //     quickSort(arr, i+1, end)
// //   }
// // }
// var quickSort = function(arr) {
//     　　if (arr.length <= 1) { return arr; }
//     　　var pivotIndex = Math.floor(arr.length / 2);
//     　　var pivot = arr.splice(pivotIndex, 1)[0];
//     　　var left = [];
//     　　var right = [];
//     　　for (var i = 0; i < arr.length; i++){
//     　　　　if (arr[i] < pivot) {
//     　　　　　　left.push(arr[i]);
//     　　　　} else {
//     　　　　　　right.push(arr[i]);
//     　　　　}
//     　　}
//     　　return quickSort(left).concat([pivot], quickSort(right));
//     };
// let s = [5,8, 9, 3, 2, 6, 90, 12]
// quickSort(s, 0, s.length)
// console.log('...')
// console.log(s)

// var Sort=function(arr){ 
//     for(var i=0;i<arr.length-1;i++){ 
//         for(var j=i+1;j<arr.length;j++){ 
//             if(arr[i]>arr[j]){/*如果前面的数据比后面的大就交换位置*/
//                 var list=arr[i]; 
//                 arr[i]=arr[j]; 
//                 arr[j]=list; 
//             }  
//         } 
//     }
//     console.log(arr)
//     return arr; 
// } 
// Sort([10,10,1,2,4,6,7,89,7,4])

function quickSort(arr, start, end) {
    var i = start
    var j = end
    var temp = arr[start]
    var mid = 0
    // console.log(start, end, '....................................')
    if(start >= end) {
        return
    }
    while(i < j) {
        if(temp >= arr[j]) {
            arr[i] = arr[j]
            i++
            mid = j
        }
        if(temp < arr[i]) {
            arr[j] = arr[i]
            j--
            mid = i
        }
        if(temp < arr[j]) {
            j--
        }
    }
    arr[mid] = temp
    if(mid > 0) {
      quickSort(arr, start, mid-1)
    }
    quickSort(arr, mid + 1, end)
}
let s = [5,8, 9, 3, 2, 6, 90, 12]
quickSort(s, 0, s.length-1)
console.log(s)

//// 有问题。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。