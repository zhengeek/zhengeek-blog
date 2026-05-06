import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import BlogView from '../views/BlogView.vue'
import HomeView from '../views/HomeView.vue'
import LabView from '../views/LabView.vue'
import ProjectsView from '../views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/projects', name: 'projects', component: ProjectsView },
    { path: '/blog', name: 'blog', component: BlogView },
    { path: '/lab', name: 'lab', component: LabView },
  ],
})

export default router