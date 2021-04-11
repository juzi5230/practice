// 输出给定起止日期之间的年月给定起⽌日期，
// 返回中间所有的月份;  参数是字符串格式，
// 格式固定用-分割；比如输入 2018-09 2019-01 ；
// 返回数组【2018-10 2018-11 2018-12】

function getAllMonth(start, end) {
  let startArr = start.split('-'),
  startY = startArr[0],
  startM = startArr[1],
  endArr = end.split('-'),
  endY = endArr[0],
  endM = endArr[1]
  res = []
  if(new Date(start) > new Date(end)) {
    console.log('输入错误')
    return
  }
  if(startY === endY) {
    for(let i = startM + 1; i++; i < endM) {
        res.push(startY + '-' + i.padStart(2, 0))
    }
  }
  if(startY < endY) {
    for(let i = startY; i <= endY; i++) {
      if( i === startY) {
        let j = startM + 1
        console.log('//////')
        while(j < 13) {
          console.log('.......')
          res.push(i + '-' + j.padStart(2, 0))
        }
      } else if(i < endY){
        let j = 1
        while(j < 13) {
          res.push(i + '-' + j.padStart(2, 0))
        }
      } else {
        let j = 1
        while(j < endM) {
          res.push(i + '-' + j.padStart(2, 0))
        }
      }
    }
  }
  return res
}
console.log(getAllMonth('2018-09', '2019-01'))