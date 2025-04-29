<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const accColor = computed(() => route.meta.accColor);
const router = useRouter();
const routes = computed(() => router.getRoutes());


import { useStateStore } from '@/stores/state';
const stateStore = useStateStore();
</script>

<template>
  <div class="global-nav" :class="{ open: stateStore.navOpen }">
    <ul>
      <nav>
        <template v-for="route in routes">
          <li v-if="route.meta.deactivated === false" :key="route.name">
            <router-link :to="route.name">{{ route.name }}</router-link>
          </li>
        </template>
      </nav>
      <!-- <li>
        <Transition name="swoosh">
          <a :key="accColor" class="webapp-button" :style="`--acc-color: var(${accColor});`" href="https://app.jeec.ist"
            target="_blank">WebApp Login</a>
        </Transition>
      </li> -->
    </ul>
  </div>
</template>

<style scoped>
.global-nav {
  height: 100%;
}

.global-nav ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  list-style-type: none;
  gap: 2ch;
}

.global-nav nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2ch;
  position: relative;
}

.global-nav nav a {
  text-transform: capitalize;
  font-weight: 700;
  font-size: 1.05rem;
}

.global-nav li:has(>.webapp-button) {
  position: relative;
  display: flex;
  width: 15ch;
  height: 100%;
}

.global-nav .webapp-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;

  border: var(--acc-color) 2px solid;
  border-radius: 13px;
  padding: .3rem 1ch;
  background-color: color-mix(in srgb, var(--acc-color) 10%, transparent);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);

  position: absolute;
  top: 50%;
  translate: 0 -50%;
  transition: backdrop-filter 0.2s ease-in, opacity 0.2s ease-in;
  will-change: backdrop-filter opacity;
}

.global-nav .webapp-button:hover {
  background-color: color-mix(in srgb, var(--acc-color) 30%, transparent);
  transition: background-color 0.2s ease-out;
}

@media screen and (max-width: 1100px) {
  .global-nav {
    position: absolute;
    z-index: -1;
    left: 100%;
    max-width: 300px;
    width: 100%;
    top: 0;
    translate: 0 0;
    height: 100dvh;
    background-color: var(--c-bg);
    padding-top: var(--header-height);
    transition: translate 0.5s ease-in;
  }

  .global-nav.open {
    translate: -100% 0;
    transition: translate 0.5s ease-out;
  }

  .global-nav ul {
    display: block;
  }

  .global-nav nav {
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
    padding-top: 1rem;
  }

  .global-nav nav li {
    padding: 1rem 0;
    width: 100%;
  }

  .global-nav nav a {
    padding-left: 2ch;
  }

  .global-nav li:has(>.webapp-button) {
    height: 3rem;
    width: 100%;
    padding: 0 2ch;
  }

  .global-nav .webapp-button {
    width: calc(100% - 4ch);
  }
}

@media screen and (max-width: 600px) {
  .global-nav {
    max-width: 100%;
    font-size: 16px;
  }

  .global-nav nav {
    text-align: center;
    padding-top: 3rem;
  }

  .global-nav nav a {
    padding-left: 0;
    font-size: 1em;
  }

  .global-nav .webapp-button {
    width: calc(100% - 4ch);
    max-width: 300px;
    left: 50%;
    translate: -50% 0;
    font-size: 1em;
  }
}

.swoosh-leave-to,
.swoosh-enter-from {
  opacity: 0%;
  backdrop-filter: blur(0px);
}

.swoosh-leave-from,
.swoosh-enter-to {
  opacity: 100%;
  backdrop-filter: blur(4px);
}

.swoosh-leave-active {
  transition: all 0.2s ease-in;
  transition-delay: 0.2s;
}

.swoosh-enter-active {
  transition: all 0.2s ease-out;
}
</style>
