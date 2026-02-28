import { createRouter, createWebHistory } from 'vue-router'
import { useStateStore } from '@/stores/state'

import i18n from '@/i18n'
import { setLocale, resolveLocaleFallback } from '@/i18n'

import HomeView from '@/views/Home/TheHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:lang',
      name: 'home',
      meta: { title: 'JEEC', accColor: '--c-acc-blue', deactivated: false },
      component: HomeView,
    },
    {
      path: '/home',
      redirect: { name: 'home' },
    },
    {
      path: '/:lang/partners',
      name: 'partners',
      meta: { title: 'Partners - JEEC', accColor: '--j26-light-blue', deactivated: false },
      component: async () => await import('@/views/PartnersView.vue'),
    },
    {
      path: '/:lang/prizes',
      name: 'prizes',
      meta: { title: 'Prizes - JEEC', accColor: '--j26-light-blue', deactivated: false },
      component: async () => await import('@/views/PrizesView.vue'),
    },
    {
      path: '/:lang/schedule',
      name: 'schedule',
      meta: { title: 'Schedule - JEEC', accColor: '--j26-pink', deactivated: false },
      component: async () => await import('@/views/ScheduleView.vue'),
    },
    {
      path: '/:lang/speakers',
      name: 'speakers',
      meta: { title: 'Speakers - JEEC', accColor: '--j26-violet', deactivated: false },
      component: async () => await import('@/views/SpeakersView.vue'),
    },
    {
      path: '/:lang/sponsors',
      name: 'sponsors',
      meta: { title: 'Sponsors - JEEC', accColor: '--j26-pink', deactivated: false },
      component: async () => await import('@/views/SponsorsView.vue'),
    },
    {
      path: '/:lang/team',
      name: 'team',
      meta: { title: 'Team - JEEC', accColor: '--j26-light-blue', deactivated: false },
      component: async () => await import('@/views/TeamView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/' + i18n.global.locale.value,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (to.name === from.name && to.hash === from.hash) return false
      else if (savedPosition) setTimeout(() => resolve({ top: savedPosition.top }), 300)
      else if (to.hash) resolve({ el: to.hash, bottom: 0, behavior: 'smooth' })
      else setTimeout(() => resolve({ left: 0, top: 0 }), 300)
    })
  },
})

function handleLocales(to) {
  const supportedLocales = i18n.global.availableLocales

  if (to?.params.lang === i18n.global.locale.value) {
    return
  } else if (supportedLocales.includes(to?.params.lang)) {
    setLocale(to.params.lang)
    return { name: to.name, params: { lang: to.params.lang } }
  } else {
    setLocale(resolveLocaleFallback())
    return { path: `/${i18n.global.locale.value}${to.fullPath}` }
  }
}

router.beforeEach((to) => {
  useStateStore().navOpen = false
  document.title = to.meta.title

  if (to.meta.deactivated) return { path: '/' + i18n.global.locale.value }
  return handleLocales(to)
})

export default router
