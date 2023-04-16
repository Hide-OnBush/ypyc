import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import("../views/Simulator.vue"),
      meta: {
        keepAlive: true, 
        isBack: false
          }
    },
    {
      path: '/map',
      name: 'map',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Map.vue'),
      meta: {
        keepAlive: true, 
        isBack: false
          }
    }
  ]
})

export default router
