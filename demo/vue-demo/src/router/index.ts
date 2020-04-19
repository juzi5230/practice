import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const Foo = () => import('@/components/Foo.vue')
const router = {
  routes: [
    { path: '/', component: Foo }
  ]
}
export default new VueRouter(router)
