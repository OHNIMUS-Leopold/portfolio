import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'

import SingleProjectView from '../views/projects/[[name]].vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',                name: 'home',             component: HomeView           },
    { path: '/contact',         name: 'contact',          component: ContactView        },
    { path: '/projects/:name',  name: 'single-project',   component: SingleProjectView  }
  ]
})

export default router
