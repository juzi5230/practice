import VueRouter from 'vue-router'
import Vue from 'vue'
import { RouteConfig } from 'vue-router/types/router'

Vue.use(VueRouter)

const Animater = () => import('@/components/Animater.vue')
const ImageShow = () => import('@/components/ImageShow.vue')
// const Animater = () => import(/* webpackChunkName: "12" */'@/components/Animater.vue')
// const ImageShow = () => import(/* webpackChunkName: "12" */'@/components/ImageShow.vue')
const route:RouteConfig[] =
  [
    { path: '/', component: Animater },
    { path: '/ImageShow/:id', name: 'ImageShow/:id', component: ImageShow }
  ]

export default new VueRouter({ routes: route })
