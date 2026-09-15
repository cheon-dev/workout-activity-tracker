import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/add-workout',
    component: () => import('../views/AddWorkout.vue')
  },
  {
    path: '/edit-workout/:id',
    component: () => import('../views/EditWorkout.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
