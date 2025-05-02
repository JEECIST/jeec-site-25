<script setup>
import CompanyCarousel from './TheHomeCarousel.vue';
import { useSponsorsStore } from '@/stores/sponsors';
import { onMounted, ref } from 'vue';

const sponsors = [
  {
    name: "Sponsor 1",
    image: "data:image/*;base64,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"
  },
  {
    name: "Sponsor 2",
    image: "data:image/*;base64,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"
  },
  {
    name: "Sponsor 3",
    image: "data:image/*;base64,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"
  },
  {
    name: "Sponsor 4",
    image: "data:image/*;base64,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"
  },
];
const sponsorStore = useSponsorsStore()
const data = ref([])

const props = defineProps({
  isEven: {
    type: Boolean,
    default: false
  },
  accColor: {
    type: String,
    default: '--c-acc-blue'
  }
});

async function fetchData() {
  await sponsorStore.fetchData()

  if (sponsorStore.tiers && Array.isArray(sponsorStore.tiers)) {
    data.value = sponsorStore.tiers
      .filter(tier => tier.tier_name.toLowerCase() === 'gold')
      .flatMap(tier =>
        tier.sponsors.map(sponsor => ({
          name: tier.tier_name,
          image: `data:;base64,${sponsor.image}`
        }))
      );
  }
}

onMounted(fetchData)

console.log(props.accColor)
</script>

<template>
  <div class="content" :class="{ even: props.isEven }" :style="`--acc-color: var(${props.accColor});`">
    <div class="carousel-container">
      <div class="carousel-fade fade-left"></div>
      <CompanyCarousel :isEven="props.isEven" :items="data"
        :observerId="`sponsors-carousel-${props.isEven ? 'even' : 'odd'}`"></CompanyCarousel>
      <div class="carousel-fade fade-right"></div>
    </div>
    <div class="description">
      <h2>Our Sponsors</h2>
      <div class="highlight"></div>
      <p>
        We couldn't do JEEC alone! Our valuable sponsors help us power the event — making it possible to host inspiring
        talks, hands-on activities, and real opportunities for students to connect with the future of industry and
        technology.
      </p>
      <router-link class="page-link" to="sponsors">Learn more</router-link>
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
}

.content.even:not(#i) {
  flex-direction: row;
  text-align: end;
  padding-left: 0;
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
  background: linear-gradient(to right,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 38%, transparent) 50%,
      var(--acc-color) 100%);
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
  --bg-color: var(--c-bg-lighter);
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
    background: linear-gradient(to right,
        transparent 0%,
        color-mix(in srgb, var(--acc-color) 50%, transparent) 20%,
        var(--acc-color) 50%,
        color-mix(in srgb, var(--acc-color) 50%, transparent) 80%,
        transparent 100%);
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
