<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// import fifteenFifteen from '@/assets/home/offers/15_15.webp';
// import insideTalks from '@/assets/home/offers/InsideTalks.webp';
// import workshops from '@/assets/home/offers/Workshops.webp';
// import panels from '@/assets/home/offers/Panels.webp';
// import jobFair from '@/assets/home/offers/JobFair.webp';
// import alumniTalks from '@/assets/home/offers/AlumniTalks.webp';
// import keynoteSpeakers from '@/assets/home/offers/KeynoteSpeakers.webp';
// import eletroLink from '@/assets/home/offers/Eletrolink.webp';

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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

const offers = [
  {
    name: t('home.offer.offers.offer1.name'),
    description: t('home.offer.offers.offer1.description'),
    // image: insideTalks
  },
  {
    name: t('home.offer.offers.offer2.name'),
    description: t('home.offer.offers.offer2.description'),
    // image: fifteenFifteen
  },
  {
    name: t('home.offer.offers.offer3.name'),
    description: t('home.offer.offers.offer3.description'),
    // image: workshops
  },
  {
    name: t('home.offer.offers.offer4.name'),
    description: t('home.offer.offers.offer4.description'),
    // image: eletroLink
  },
  {
    name: t('home.offer.offers.offer5.name'),
    description: t('home.offer.offers.offer5.description'),
    // image: panels,
  },
  {
    name: t('home.offer.offers.offer6.name'),
    description: t('home.offer.offers.offer6.description'),
    // image: jobFair
  },
  {
    name: t('home.offer.offers.offer7.name'),
    description: t('home.offer.offers.offer7.description'),
    // image: keynoteSpeakers
  },
  {
    name: t('home.offer.offers.offer8.name'),
    description: t('home.offer.offers.offer8.description'),
    // image: alumniTalks
  },
]

const selected = ref(0)
let timer

const startAutoCycle = () => {
  timer = setInterval(() => {
    selected.value = (selected.value + 1) % offers.length
  }, 5000)
}

const stopAutoCycle = () => clearInterval(timer)

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.isIntersecting ? startAutoCycle() : stopAutoCycle()
  })
})

onMounted(() => {
  const section = document.getElementById('offers')
  observer.observe(section)
})

onUnmounted(() => {
  observer.disconnect()
  stopAutoCycle()
})

function offerCallback(index) {
  const scrollEl = document.getElementById('offer-description')
  if (scrollEl.getBoundingClientRect().bottom > window.innerHeight)
    scrollEl.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })

  selected.value = index
  stopAutoCycle()
  setTimeout(() => {
    stopAutoCycle()
    startAutoCycle()
  }, 15000)
}
</script>

<template>
  <div
    id="offers"
    class="content"
    :class="{ even: props.isEven }"
    :style="`--acc-color: var(${props.accColor});`"
  >
    <div class="heading">
      <h2>What we have to offer</h2>
      <div class="highlight"></div>
    </div>
    <div class="offers">
      <button
        class="offer highlight-border"
        v-for="(offer, index) in offers"
        :key="offer.name"
        @click="offerCallback(index)"
        :class="{ active: selected == index }"
      >
        <div class="offer-background"></div>
        <div class="title-wrapper">
          <p>{{ offer.name }}</p>
        </div>
      </button>
    </div>
    <div id="offer-description" class="anchor">
      <Transition name="fade">
        <div :key="selected" class="expanded-offer">
          <h3>{{ offers[selected].name }}</h3>
          <p>{{ offers[selected].description }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.content:not(#i) {
  flex-direction: column;
  overflow: hidden;
  padding-top: calc(2.5vw + 3rem);
  padding-bottom: calc(2.5vw + 2rem);
  text-align: center;
}

.content.even:not(#i) {
  padding-top: 3rem;
  padding-bottom: 2rem;
}

.heading {
  position: relative;
  padding-bottom: 4rem;
}

.heading h2 {
  text-transform: uppercase;
}

.heading .highlight {
  position: absolute;
  height: 2px;
  width: 100%;
  transform: scaleX(120%);
  background: linear-gradient(
    to right,
    transparent 0%,
    color-mix(in srgb, var(--acc-color) 50%, transparent) 20%,
    var(--acc-color) 50%,
    color-mix(in srgb, var(--acc-color) 50%, transparent) 80%,
    transparent 100%
  );
}

.offers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2ch;
  max-width: 1000px;
  padding-bottom: 3rem;
}

button.offer {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  position: relative;
  height: 8rem;
  min-width: 18ch;
  max-width: 26ch;
  --border-padding: 0.5ch;
  padding: var(--border-padding);
  cursor: pointer;
  scale: 1;
  transition: scale 0.1s ease-in;
  flex: 1;
  flex-basis: 20%;
}

button.offer.active,
button.offer:hover {
  scale: 1.05;
  transition: scale 0.2s ease-out;
}

button.offer::before {
  transition: filter 0.1s ease-in;
}

button.offer.active::before {
  transition: filter 0.2s ease-out;
  filter: drop-shadow(0 0 1ch var(--acc-color));
}

.offer-background {
  position: absolute;
  border-radius: 1ch;
  top: var(--border-padding);
  left: var(--border-padding);
  width: calc(100% - var(--border-padding) * 2);
  height: calc(100% - var(--border-padding) * 2);
  background-size: cover;
  background-position: center;
  padding: 1ch;
  z-index: -1;
}

.title-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5ch;
}

.title-wrapper::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 2ch);
  height: calc(100% - 3rem);
  background: color-mix(in srgb, var(--acc-color) 20%, transparent);
  border-radius: 50%;
  z-index: -1;
  filter: blur(20px);
}

.title-wrapper p {
  font-size: 1.3rem;
  font-weight: 900;
  text-shadow: 0 0 1ch color-mix(in srgb, var(--acc-color) 20%, black);
}

.anchor {
  position: relative;
  height: 10rem;
  width: 100%;
  max-width: 700px;
  padding-bottom: 5rem;
}

.expanded-offer {
  position: absolute;
  min-height: 100%;
  width: 100%;
  background: radial-gradient(
    closest-side,
    color-mix(in srgb, var(--acc-color) 40%, transparent) 0%,
    transparent 150%
  );
  border: 2px solid var(--acc-color);
  border-radius: 1ch;
  padding: 1rem 2ch;
  text-align: start;
}

.expanded-offer h3 {
  text-transform: uppercase;
  font-weight: 500;
  padding-bottom: 1rem;
  font-size: 1.3em;
}

@media screen and (max-width: 950px) {
  .content.even:not(#i) {
    padding-bottom: 5rem;
  }

  button.offer {
    flex-basis: 35%;
  }
}

@media screen and (max-width: 450px) {
  .content:not(#i) {
    padding-bottom: calc(2.5vw + 4rem);
  }

  .content.even:not(#i) {
    padding-bottom: 6rem;
  }

  button.offer {
    min-width: 0;
    flex-basis: 40%;
    flex-grow: 1;
  }

  .title-wrapper p {
    font-size: 1rem;
  }
}
</style>
