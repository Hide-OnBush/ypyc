import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import("../views/SimulatorComponent.vue"),
      meta: {
        keepAlive: true, 
        isBack: false
          }
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/GaoDeMap.vue'),
      meta: {
        keepAlive: true, 
        isBack: false
          }
    }
  ]
})

export default router
