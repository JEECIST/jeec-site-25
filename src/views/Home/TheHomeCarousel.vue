<script setup>
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { onMounted, onUnmounted, ref, nextTick, watch, useTemplateRef } from 'vue';

const props = defineProps({
  isEven: {
    type: Boolean,
    required: true,
    default: false
  },
  items: {
    type: Array,
    default: () => [
      {
        name: 'Default',
        id: 0,
        image: '',
        company_logo: '',
        link: '',
      }
    ],
    required: true,
  },
  observerId: {
    type: String,
    required: true,
    default: 'carousel',
  },
  speakerCarousel: {
    type: Boolean,
    default: false
  },
  prizeCarousel: {
    type: Boolean,
    default: false
  },
});

const companyBreakpoints = {
  0: {
    itemsToShow: 1.4,
  },
  450: {
    itemsToShow: 1.7,
  },
  600: {
    itemsToShow: 2.2,
  },
  700: {
    itemsToShow: 2.6,
  },
  850: {
    itemsToShow: 3.2,
  },
};

const speakerBreakpoints = {
  0: {
    itemsToShow: 1.4,
    gap: 20,
  },
  360: {
    itemsToShow: 1.8,
    gap: 20,
  },
  650: {
    itemsToShow: 2.4,
    gap: 20,
  },
  850: {
    itemsToShow: 3,
  },
};

const prizeBreakpoints = {
  0: {
    itemsToShow: 2.2,
  },
  500: {
    itemsToShow: 2.5,
  },
  600: {
    itemsToShow: 3,
  },
  700: {
    itemsToShow: 3.5,
  },
  800: {
    itemsToShow: 4,
  },
};

const enabled_ = ref(false);
const dir_ = props.isEven ? 'rtl' : 'ltr';
const breakpoints_ = props.speakerCarousel ? speakerBreakpoints : (props.prizeCarousel ? prizeBreakpoints : companyBreakpoints);
const gap_ = props.speakerCarousel ? 30 : 10;

const config = {
  wrapAround: true,
  snapAlign: 'center',
  autoplay: 3000,
  breakpointMode: 'carousel',
  gap: gap_,
  dir: dir_,
  breakpoints: breakpoints_,
};

const homeCarousel = useTemplateRef('homeCarousel');

const render = ref(true);
const reRender = async () => {
  await nextTick();
  render.value = false;
  await nextTick();
  render.value = true;
};

watch(() => props.items, async () => {
  await reRender();
}, { deep: true });

onMounted(async () => {
  await reRender();
  await nextTick();
  homeCarousel.value.updateSlideSize();
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.isIntersecting ? enabled_.value = true : enabled_.value = false;
  });
});

onMounted(() => {
  const section = document.getElementById(props.observerId);
  observer.observe(section);
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<template>
  <div class="container" :id="props.observerId">
    <Carousel v-if="render" v-bind="config" :enabled="enabled_" ref="homeCarousel"
      :class="{ speaker: props.speakerCarousel, prize: props.prizeCarousel }">
      <template v-for="(item, index) in props.items" :key="'item-' + index">
        <Slide v-if="props.speakerCarousel && item.image && item.image != ''">
          <div class="card">
            <div class="image-wrapper">
              <img :src="item.image" :alt="item.name" />
              <div class="caption">
                <img :src="item.company_logo" class="cap-company-logo" />
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
        </Slide>

        <Slide v-else-if="props.prizeCarousel && item.image && item.image != ''">
          <div class="carousel-image">
            <img :src="item.image" :alt="`Prize ${item.name}`">
          </div>
        </Slide>
        <Slide v-else>
          <a class="carousel-image" :href="item?.link" target="_blank">
            <img :src="item.image" :alt="`${item.name} logo`">
          </a>
        </Slide>

        <!-- <p v-else>{{ item.name }}</p> -->
      </template>
      <template v-if="props.prizeCarousel" #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  container-type: inline-size;
  container-name: carousel;
  display: flex;
}

.carousel {
  flex-grow: 1;
  height: 200px;
  min-width: 100%;
  position: static;
}

.carousel.speaker {
  height: 21rem;
}

.carousel.speaker .carousel__slide {
  height: 100%;
}

.card {
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  border: 2px solid var(--acc-color);
  background-color: var(--j26-team-background);
  transition: transform 0.2s ease-in-out;
  max-width: 350px;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-wrapper>img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  z-index: 1;
}

.caption {
  background: color-mix(in srgb, var(--acc-color), transparent 60%);
  border-radius: 15px;
  position: absolute;
  width: calc(100% - 2ch);
  bottom: 0;
  left: 1ch;
  padding: 1ch;
  margin: 1ch 0;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1ch;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 3;
  pointer-events: none;
}

.caption p {
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
  text-align: left;
  font-weight: bolder;
}

.caption img {
  align-self: flex-start;
  object-fit: contain;
  min-width: 60px;
  max-width: 100px;
  max-height: 40px;
  min-height: 35px;
  padding: 5px;
  width: auto;
  height: auto;
  border-radius: 5px;
  background: white;
}

.carousel.prize {
  --vc-nav-background: color-mix(in srgb, var(--acc-color) 85%, var(--c-bg));
  --vc-nav-color: var(--c-bg);
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 2.5rem;
  --vc-nav-height: 2.5rem;
}

.carousel.prize :is(.carousel__prev, .carousel__next) {
  z-index: 5;
  margin: 0 0.3ch;
}

@media screen and (max-width: 950px) {
  .carousel.prize :is(.carousel__prev, .carousel__next) {
    inset-block-start: calc(50% - 1rem);
  }
}

.carousel__viewport {
  height: 100%;
}

.carousel__slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: var(--c-ft);
  border-radius: 15px;
  color: var(--c-bg);
  scale: 0.9;
  transition: scale 0.2s ease-in;
}

.carousel__slide--active:not(#i) {
  scale: 1;
  transition: scale 0.3s ease-out;
}

.carousel.prize .carousel__slide {
  background: none;
}

.carousel-image {
  width: 100%;
  height: calc(100% - 10px);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel.prize .carousel-image {
  width: unset;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  background: var(--c-ft);
  border: solid 2px var(--acc-color);
  box-shadow: 0 0 10px var(--acc-color);
}

.carousel-image img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

@container carousel (max-width: 500px) {
  .carousel {
    height: 170px;
  }

  .carousel.speaker {
    height: 270px;
  }
}

@container carousel (max-width: 400px) {
  .carousel {
    height: 150px;
  }

  .carousel.speaker {
    height: 250px;
  }
}
</style>
