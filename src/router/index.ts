import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import ProjectsView from '../views/ProjectsView.vue'

import SingleProjectView from '../views/projects/[[id]].vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',              name: 'home',           component: HomeView           },
    { path: '/projects',      name: 'projects',       component: ProjectsView       },
    { path: '/contact',       name: 'contact',        component: ContactView        },
    { path: '/projects/:id',  name: 'single-project', component: SingleProjectView  }
  ]
})

export default router
