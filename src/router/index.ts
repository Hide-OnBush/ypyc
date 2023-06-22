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
        isBack: false,
        data:'Hello',
        }
          
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapContainer.vue'),
      meta: {
        keepAlive: true, 
        isBack: false
          }
    }
  ]
})

export default router
