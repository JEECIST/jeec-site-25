import { createRouter, createWebHistory } from 'vue-router'
import { useStateStore } from '@/stores/state'
import HomeView from '@/views/Home/TheHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'JEEC - May 5th to 9th', accColor: '--c-acc-blue', deactivated: false },
      component: HomeView,
    },
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/partners',
      name: 'partners',
      meta: { title: 'Partners - JEEC', accColor: '--c-acc-orange', deactivated: true },
      component: () => import('@/views/PartnersView.vue'),
    },
    {
      path: '/prizes',
      name: 'prizes',
      meta: { title: 'Prizes - JEEC', accColor: '--c-acc-lilac', deactivated: true },
      component: () => import('@/views/PrizesView.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      meta: { title: 'Schedule - JEEC', accColor: '--c-acc-strong-pink', deactivated: true },
      component: () => import('@/views/ScheduleView.vue'),
    },
    {
      path: '/speakers',
      name: 'speakers',
      meta: { title: 'Speakers - JEEC', accColor: '--c-acc-yellow', deactivated: true },
      component: () => import('@/views/SpeakersView.vue'),
    },
    {
      path: '/sponsors',
      name: 'sponsors',
      meta: { title: 'Sponsors - JEEC', accColor: '--c-acc-lighter-dark-blue', deactivated: true },
      component: () => import('@/views/SponsorsView.vue'),
    },
    {
      path: '/team',
      name: 'team',
      meta: { title: 'Team - JEEC', accColor: '--c-acc-blue', deactivated: true },
      component: () => import('@/views/TeamView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (to.name === from.name && to.hash === from.hash) return false
      else if (savedPosition) setTimeout(() => resolve({ top: savedPosition.top }), 300)
      else if (to.hash) resolve({ el: to.hash, top: 0, behavior: 'smooth' })
      else setTimeout(() => resolve({ left: 0, top: 0 }), 300)
    })
  },
})

router.beforeEach((to) => {
  useStateStore().navOpen = false

  document.title = to.meta.title
  if (to.meta.deactivated) return { path: '/' }
})

export default router
