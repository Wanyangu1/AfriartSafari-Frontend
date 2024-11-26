import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import SignupPage from '@/pages/Registration/SignupPage.vue'
import LoginPage from '@/pages/Registration/LoginPage.vue'
import ListService from '@/pages/serviceprovider/ListService.vue'
import CreateService from '@/pages/serviceprovider/CreateService.vue'
import ServiceDetails from '@/pages/serviceprovider/ServiceDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },
    {
      path: '/services',
      name: 'services',
      component: ListService,
    },
    {
      path: '/create-services',
      name: 'create-services',
      component: CreateService,
    },
    {
      path: '/services/:id',
      name: 'service-details',
      component: ServiceDetails,
      props: true,
    },
  ],
})

export default router
