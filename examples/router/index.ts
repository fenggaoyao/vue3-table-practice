import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import ModuleButton from '../views/button/Button.vue'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/*',
      redirect: {
        name: 'ModuleButton'
      }
    },
    {
        path: '/',
        redirect: {
          name: 'ModuleButton'
        }
    },
    {
      path: '/table/module/button',
      name: 'ModuleButton',
      component: ModuleButton
    }
]


const router = createRouter({
    history: createWebHistory("."),
    routes
  })
  
  export default router