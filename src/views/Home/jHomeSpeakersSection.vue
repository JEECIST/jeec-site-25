<script setup>
import { onMounted } from 'vue'
import CompanyCarousel from './TheHomeCarousel.vue'
import { useSpeakersStore } from '@/stores/speakers'
import { storeToRefs } from 'pinia'

const props = defineProps({
  isEven: {
    type: Boolean,
    default: false,
  },
  accColor: {
    type: String,
    default: '--c-acc-blue',
  },
})

const speakerStore = useSpeakersStore()
const { homeData } = storeToRefs(speakerStore)
onMounted(async () => {
  await speakerStore.fetchData()
})
</script>

<template>
  <div
    class="content"
    :class="{ even: props.isEven }"
    :style="`--acc-color: var(${props.accColor});`"
  >
    <div class="carousel-container">
      <div class="carousel-fade fade-left"></div>
      <CompanyCarousel
        :isEven="props.isEven"
        :items="homeData"
        :speakerCarousel="true"
        :observerId="`speakers-carousel-${props.isEven ? 'even' : 'odd'}`"
      ></CompanyCarousel>
      <div class="carousel-fade fade-right"></div>
    </div>
    <div class="description">
      <h2>{{ $t('home.speakers.title') }}</h2>
      <div class="highlight"></div>
      <p>{{ $t('home.speakers.description') }}</p>
      <router-link class="page-link" :to="{ name: 'speakers' }">{{
        $t('home.speakers.learnmore')
      }}</router-link>
    </div>
  </div>
</template>

<style src="vue3-carousel/dist/carousel.css"></style>

<style scoped>
.content:not(#i) {
  justify-content: space-around;
  flex-direction: row-reverse;
  gap: 5ch;
  text-align: start;
  padding-top: calc(2.5vw + 3rem);
  padding-bottom: calc(2.5vw + 3rem);
}

.content.even:not(#i) {
  flex-direction: row;
  text-align: end;
  padding-left: 0;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.content:not(.even:not(#i)) {
  padding-right: 0;
}

.description {
  max-width: 40ch;
  padding: 1rem 0;
  flex-basis: 40%;
  align-self: flex-start;
}

.description h2 {
  text-transform: uppercase;
}

.description a.page-link {
  display: inline-block;
  padding-top: 1rem;
  color: var(--acc-color);
  text-decoration: underline;
}

.description .highlight {
  width: 100%;
  height: 2px;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    transparent 0%,
    color-mix(in srgb, var(--acc-color) 38%, transparent) 50%,
    var(--acc-color) 100%
  );
}

.content:not(.even) .description .highlight {
  transform: scaleX(-100%);
}

.description p {
  padding-top: 2rem;
}

.carousel-container {
  flex-basis: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 1rem 0;
}

.content.even .carousel-container {
  padding-right: 3px;
}

.content:not(.even) .carousel-container {
  padding-left: 3px;
}

.content.even .carousel-fade {
  --bg-color: var(--j26-team-background);
}

.carousel-fade {
  --bg-color: var(--c-bg);
  position: absolute;
  z-index: 2;
  top: 50%;
  translate: 0 -50%;
  width: 50%;
  height: 200%;
  background: var(--bg-color);
  pointer-events: none;
  box-shadow: var(--bg-color) 70px 0 50px;
  transform-origin: center;
}

.carousel-fade::before {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-color);
  transform-origin: center;
}

.carousel-fade.fade-right {
  left: calc(100% - 2rem);
  transform: rotate(170deg);
}

.carousel-fade.fade-left {
  right: calc(100% - 2rem);
  transform: rotate(-10deg);
}

.content:not(.even) .carousel-fade.fade-right {
  opacity: 0;
}

.content.even .carousel-fade.fade-right {
  transform: rotate(190deg);
}

.content.even .carousel-fade.fade-left {
  transform: rotate(10deg);
  opacity: 0;
}

.carousel-fade.fade-right::before {
  left: 2px;
}

.carousel-fade.fade-left::before {
  right: -2px;
}

@media screen and (min-width: 1200px) {
  .content.even .carousel-container {
    padding-left: 3px;
  }

  .content:not(.even) .carousel-container {
    padding-right: 3px;
  }

  .content.even .carousel-fade.fade-left {
    opacity: 1;
  }

  .content:not(.even) .carousel-fade.fade-right {
    opacity: 1;
  }
}

@media screen and (max-width: 950px) {
  .content:not(#i#i) {
    flex-direction: column;
    text-align: center;
    gap: 0;
  }

  .content.even:not(#i) {
    padding-right: 0;
  }

  .content:not(.even:not(#i)) {
    padding-left: 0;
  }

  .positioner {
    align-self: center;
    max-width: 60ch;
    width: 100%;
  }

  .description {
    max-width: 50ch;
    align-self: unset;
    flex-basis: unset;
    padding-right: 3ch;
    padding-left: 3ch;
  }

  .description .highlight {
    background: linear-gradient(
      to right,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 50%, transparent) 20%,
      var(--acc-color) 50%,
      color-mix(in srgb, var(--acc-color) 50%, transparent) 80%,
      transparent 100%
    );
  }

  .carousel-container {
    flex-basis: unset;
    width: 100%;
    padding-bottom: 3rem;
  }

  .content.even .carousel-container {
    padding-left: 3px;
  }

  .content:not(.even) .carousel-container {
    padding-right: 3px;
  }

  .content.even .carousel-fade.fade-left {
    opacity: 1;
  }

  .content:not(.even) .carousel-fade.fade-right {
    opacity: 1;
  }
}

@media screen and (max-width: 750px) {
  .carousel-fade {
    box-shadow: var(--bg-color) 50px 0 40px;
  }

  .carousel-fade.fade-right {
    left: calc(100% - 0.5rem);
    transform: rotate(175deg);
  }

  .carousel-fade.fade-left {
    right: calc(100% - 0.5rem);
    transform: rotate(-5deg);
  }
}
</style>
