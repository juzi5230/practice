// 模板字符串

function render (template, data) {
  let reg = /\{\{(\w+)\}\}/
  while(reg.test(template)) {
    const name = reg.exec(template)[1]
    let t = template.replace(reg, data[name])
    template = t
  }
  return template
}
let template = '你好， 现在是{{year}}年, {{month}}月，岁月静好'
const data = {
  year: '2021',
  month: '04'
}
console.log(render(template, data))