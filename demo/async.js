async function test() {
  console.log('.....')
  await console.log('1111')
  await em()
}
async function em () {
    await console.log('2222')
}
test()