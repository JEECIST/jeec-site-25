<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStateStore } from '@/stores/state'
const stateStore = useStateStore()

import { useRoute } from 'vue-router'
const route = useRoute()
const accColor = computed(() => route.meta.accColor)

const isHome = computed(() => route.name === 'home')
const headerOpacity = ref('0%')
const triggerHeight = ref(0)

let ticking = false
let scrollTop = 0
let ratio = 0

function scrollCallback() {
  scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  ratio = Math.min(scrollTop / triggerHeight.value, 1)

  if (!ticking) {
    window.requestAnimationFrame(() => {
      headerOpacity.value = `${ratio * 100}%`
      ticking = false
    })
    ticking = true
  }
}

const obsCallback = (entries) => {
  if (entries[0].isIntersecting) {
    scrollCallback()
    document.addEventListener('scroll', scrollCallback)
  } else {
    document.removeEventListener('scroll', scrollCallback)
    headerOpacity.value = '100%'
  }
}

const headerObserver = new IntersectionObserver(obsCallback, {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0,
})

onMounted(() => {
  watch(
    () => route.name,
    (to) => {
      if (to === 'home') {
        const triggerEl = document.querySelector('#header-trigger')
        triggerHeight.value = triggerEl.offsetHeight
        headerObserver.observe(triggerEl)
      } else {
        headerObserver.disconnect()
        document.removeEventListener('scroll', scrollCallback)
      }
    },
  )
})

import TheNav from './TheNav.vue'
import TheNavButton from './TheNavButton.vue'
import TheLocaleSwitcher from './TheLocaleSwitcher.vue'
</script>

<template>
  <header id="header" :class="{ home: isHome }" :style="`--opacity: ${headerOpacity};`">
    <div class="header-container">
      <router-link to="home" class="logo">
        <img src="../assets/jeec_logo_temp.svg" alt="JEEC" />
        <img
          class="img-backdrop"
          :class="{ open: stateStore.navOpen }"
          src="../assets/jeec_logo_temp.svg"
          aria-hidden="true"
        />
      </router-link>
      <TheNav></TheNav>
      <div class="header-controls">
        <TheLocaleSwitcher></TheLocaleSwitcher>
        <TheNavButton></TheNavButton>
      </div>
    </div>
    <div class="header-backdrop" :class="{ open: stateStore.navOpen }"></div>
    <div
      class="nav-backdrop"
      :class="{ open: stateStore.navOpen }"
      @click="stateStore.navOpen = false"
    ></div>
    <Transition name="swoosh">
      <div :key="accColor" :style="`--acc-color: var(${accColor});`" class="header-division"></div>
    </Transition>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: var(--header-height);
  background-color: color-mix(in srgb, var(--j26-dark-blue) var(--opacity), transparent);
}

header:not(.home) {
  --opacity: 100% !important;
}

header .header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2ch;
  gap: 2ch;
}

header .logo {
  width: 85px;
  height: 29px;
  position: relative;
}

header .logo > img {
  width: 100%;
  height: 100%;
  opacity: var(--opacity);
}

header .logo > img.img-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

header .header-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2ch;
  height: 100%;
}

@media screen and (max-width: 1100px) {
  header .logo > img.img-backdrop.open {
    opacity: 1;
  }

  .header-backdrop {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: var(--c-bg);
  }

  .header-backdrop.open {
    opacity: 1;
  }

  .nav-backdrop {
    position: absolute;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    opacity: 0;
    background-color: color-mix(in srgb, var(--c-bg) 70%, transparent);
    pointer-events: none;
  }

  .nav-backdrop.open {
    opacity: 1;
    pointer-events: all;
  }

  .img-backdrop,
  .header-backdrop,
  .nav-backdrop {
    transition: opacity 0.5s ease-in;
  }

  .img-backdrop.open,
  .header-backdrop.open,
  .nav-backdrop.open {
    transition: opacity 0.5s ease-out;
  }
}

@media screen and (max-width: 600px) {
  .nav-backdrop {
    display: none;
  }
}

.header-division {
  height: 2px;
  width: 100%;
  position: absolute;
  top: 100%;
  right: 0;
  background: linear-gradient(
    to right,
    transparent 0%,
    color-mix(in srgb, var(--acc-color, --c-acc-blue) 38%, transparent) 50%,
    var(--acc-color, --c-acc-blue) 100%
  );
  z-index: 1;
}

/*
  Swoosh OPTION 1 - More simple

.swoosh-enter-active,
.swoosh-leave-active {
  transition: opacity 0.5s ease;
}

.swoosh-enter-from,
.swoosh-leave-to {
  opacity: 0;
}
*/

/*
  Swoosh OPTION 2 - Fancy color shifting
*/

.swoosh-leave-to,
.swoosh-enter-from {
  max-width: 0%;
}

.swoosh-leave-from,
.swoosh-enter-to {
  max-width: 100%;
}

.swoosh-leave-active {
  transition: all 0.3s ease-in;
  transition-delay: 0.3s;
}

.swoosh-enter-active {
  transition: all 0.3s ease-out;
}
</style>
