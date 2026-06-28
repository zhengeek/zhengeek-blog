import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import CoreLobbyView from '../views/CoreLobbyView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import BlogView from '../views/BlogView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'
import LabView from '../views/LabView.vue'
import AdminLoginView from '../views/admin/AdminLoginView.vue'
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import AdminArticlesView from '../views/admin/AdminArticlesView.vue'
import AdminArticleEditorView from '../views/admin/AdminArticleEditorView.vue'
import { isAdminAuthenticated } from '../services/authApi'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CoreLobbyView
  },
  {
    path: '/nexus',
    name: 'nexus',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: BlogDetailView
  },
  {
    path: '/lab',
    name: 'lab',
    component: LabView
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLoginView
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboardView
  },
  {
    path: '/admin/articles',
    name: 'admin-articles',
    component: AdminArticlesView
  },
  {
    path: '/admin/articles/new',
    name: 'admin-article-new',
    component: AdminArticleEditorView
  },
  {
    path: '/admin/articles/:slug/edit',
    name: 'admin-article-edit',
    component: AdminArticleEditorView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 24,
        behavior: 'smooth'
      }
    }

    return {
      top: 0,
      behavior: 'auto'
    }
  }
})

router.beforeEach((to) => {
  if (to.path.startsWith('/admin') && to.path !== '/admin/login' && !isAdminAuthenticated()) {
    return {
      path: '/admin/login',
      query: { redirect: to.fullPath }
    }
  }

  return true
})

export default router
