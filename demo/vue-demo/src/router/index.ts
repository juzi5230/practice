import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const Animater = () => import('@/components/Animater.vue')
const ImageShow = () => import('@/components/ImageShow.vue')
const router = {
  routes: [
    { path: '/', component: Animater },
    { path: '/ImageShow/:id', name: 'ImageShow/:id', component: ImageShow }
  ]
}
export default new VueRouter(router)
