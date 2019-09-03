function merge (arr1, arr2) {
    let newArr = []
    let i = 0;
    let j= 0;
    if(arr1.length === 0) {
        return arr2;
    } 
    if(arr2.length === 0) {
        return arr1;
    }
    while(i < arr1.length && j < arr2.length) {
        if(arr1[i] < arr2[j]) {
            newArr.push(arr1[i]);
            i++;
        } else {
            newArr.push(arr2[j]);
            j++;
        }
    }
    if(i < arr1.length) {
        for(;i<arr1.length; i++ )  {
            newArr.push(arr1[i])
        }
    } else {
        for(; j<arr2.length;j++) {
            newArr.push(arr2[j])
        }
    }
    // console.log(newArr)
    return newArr;
}
// console.log(merge([2,4,5,10], [1,4,8,9]));

function mergeSingle(arr, start, middle, end) {
  let i = start;
  let j = middle;
  while(i < middle && j <= end) {
      if(arr[i] > arr[j]) {
          let temp = arr[i]
          arr[i] = arr[j]
          arr[j] = temp
          mergeSingle(arr, middle, Math.ceil(middle + end)/2,end)
          i++
          j = middle
      } else {
          i++;
      }
  }
}
let arr = [1, 2, 7, 12, 3,  4,6, 9]
mergeSingle(arr, 0, 4, 7)
console.log(',,,,,,,,', arr)

function mergeSort (arr, start, end) {
//   if(arr.length )
  if(start >= end) {
    return [arr[start]]
  }
  if(start === undefined) {
      start = 0
  }
  if(end === undefined) {
      end = arr.length -1
  }
  let middle = Math.ceil((start + end) / 2)
  let arrPre = mergeSort(arr, start, middle-1)
  let arrAft = mergeSort(arr, middle, end)
  return merge(arrPre, arrAft)
}
// mergeSort([1,6,9,3,5,2,10])
console.log(mergeSort([1,6,9,3,5,2,10,21,23, 7]))