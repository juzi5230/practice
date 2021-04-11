async function async1() {
    console.log('async1 start') // 4
    await async2()
    console.log('async1 end') // 7
    // 版本2 bchrome 73 解析成Promise.resolve
    // new Promise((resolve)=>{
    //     console.log('2')
    //     resolve();
    // }).then(()=>{
    //     console.log('1 end')
    // })
    // or 
    // Promise.resolve(console.log(2)).then(() => {
    //     console.log('1 end')
    // })
    
    
    // 版本3 safari chrome 70  解析成resolve
    //  resolve(resolvedPromise) works like 
    //  Promise.resolve().then(() => resolvedPromise.then(resolve, reject));
    // Promise.resolve(console.log(2)).then(() => {
    //     Promise.resolve().then(() => {
    //     })
    // }).then(()=>{
    //     console.log('1 end')
    // })
  }
  
  async function async2() {
    console.log('async2') // 6
  }
  
  console.log('script start') // 1
  
  setTimeout(function() {
    console.log('setTimeout') // 8
  }, 0)
  
  async1()
  
  new Promise(function(resolve) {
    console.log('promise1') /// 2
    resolve()
  }).then(function() {
    console.log('promise2') // 5
  })
  
  console.log('script end') /// 3
  
//   作者：九鸾
//   链接：https://juejin.cn/post/6906800680221360141
//   来源：掘金
//   著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。