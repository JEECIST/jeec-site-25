<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <TheHeader></TheHeader>
  <main>
    <div id="header-trigger"></div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<style>
body {
  position: relative;
}

header {
  position: fixed;
  z-index: 2;
}

main {
  position: relative;
  z-index: 1;
}

#header-trigger {
  position: absolute;
  top: 0;
  pointer-events: none;
  height: calc(50px + 10rem);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

/* TO REMOVE */
.temp {
  opacity: 0.3;
  height: 500px;
  background-color: blue;
}

.temp:nth-child(even) {
  background-color: red;
}

</style>
