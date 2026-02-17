<script setup>
import { useStateStore } from '@/stores/state'
const stateStore = useStateStore()

import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const accColor = computed(() => route.meta.accColor)
</script>

<template>
  <button
    class="nav-toggle"
    :class="{ open: stateStore.navOpen }"
    @click="stateStore.navOpen = !stateStore.navOpen"
    :key="accColor"
    :style="`--acc-color: var(${accColor});`"
  >
    <div class="line a"></div>
    <div class="line b"></div>
    <div class="line c"></div>
  </button>
</template>

<style scoped>
.nav-toggle {
  height: 100%;
  aspect-ratio: 1/1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  display: none;
}

.line {
  will-change: height translate;
  height: 2px;
  width: 30px;
  background-color: var(--acc-color);
  border-radius: 10px;
  position: absolute;
  left: 50%;
  translate: -50% 0;
  transition: all 0.5s ease-in;
  transform-origin: center;
}

.nav-toggle.open .line {
  transition: all 0.5s ease-out;
  height: 2.5px;
}

.line.a {
  top: 30%;
  transform: rotate(0);
}

.line.b {
  top: 50%;
  transform: rotate(0);
  translate: -50% -50%;
}

.line.c {
  bottom: 30%;
  transform: rotate(0);
}

.nav-toggle.open .line.a {
  top: 50%;
  translate: -50% -50%;
  transform: rotate(405deg);
}

.nav-toggle.open .line.b {
  transform: rotate(225deg);
  translate: -50% -50%;
}

.nav-toggle.open .line.c {
  bottom: 50%;
  translate: -50% 50%;
  transform: rotate(315deg);
}

@media screen and (max-width: 1100px) {
  .nav-toggle {
    display: block;
  }
}
</style>
