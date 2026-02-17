<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const accColor = computed(() => route.meta.accColor)

import i18n from '@/i18n'
import { setLocale } from '@/i18n'
function switchLocale() {
  const currHash = router.currentRoute.value?.hash
  const locale = i18n.global.locale.value === 'en' ? 'pt' : 'en'

  setLocale(locale)
  router.replace({ params: { lang: locale }, hash: currHash })
}
</script>

<template>
  <button
    :key="accColor"
    :style="`--acc-color: var(${accColor});`"
    @click="switchLocale"
    class="locale-switcher"
  >
    {{ $i18n.locale }}
  </button>
</template>

<style scoped>
.locale-switcher {
  border: color-mix(in srgb, var(--acc-color) 8%, transparent) 2px solid;
  background: color-mix(in srgb, var(--acc-color) 10%, transparent);
  border-radius: 4px;
  padding: 0.15rem 0.5ch;
  padding-bottom: 0.2rem;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  color: color-mix(in srgb, var(--c-ft) 90%, transparent);
}
</style>
