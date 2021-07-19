/*
 * @Author: your name
 * @Date: 2021-02-26 12:37:19
 * @LastEditTime: 2021-07-12 15:25:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /practice/demo/vue-demo/src/main.ts
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Select, Icon, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Select)
Vue.use(Icon)
Vue.prototype.$message = Message
Vue.prototype.$message = (function(Option) {
  let dialog:any
  return function(Option:any) {
    console.log('**************', dialog)
    if (dialog) {
      dialog.close()
    }
    dialog = Message(Option)
    return dialog
  }
})(Option)
console.log('Message', Message)
console.log('Vue.prototype.$message', Vue.prototype.$message)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
