<script setup>
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { onMounted, onUnmounted, ref, nextTick, watch } from 'vue';

const props = defineProps({
  isEven: {
    type: Boolean,
    required: true,
    default: false
  },
  items: {
    type: Array,
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
    itemsToShow: 1.8,
    gap: 20,
  },
  400: {
    itemsToShow: 2.2,
  },
  550: {
    itemsToShow: 2.6,
  },
  650: {
    itemsToShow: 3,
  },
  750: {
    itemsToShow: 3.4,
  },
  850: {
    itemsToShow: 3.8,
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

const render = ref(true);
watch(() => props.items, async () => {
  await nextTick();
  render.value = false;
  await nextTick();
  render.value = true;
}, { deep: true });
</script>

<template>
  <div class="container" :id="props.observerId">
    <Carousel v-if="render" v-bind="config" :enabled="enabled_"
      :class="{ speaker: props.speakerCarousel, prize: props.prizeCarousel }">
      <Slide v-for="(item, index) in props.items" :key="'item-' + index">
        <template v-if="item.image && item.image != ''">
          <div v-if="props.speakerCarousel" class="carousel-image">
            <img :src="item.image" :alt="`Speaker ${item.name}`">
          </div>
          <div v-else-if="props.prizeCarousel" class="carousel-image">
            <img :src="item.image" :alt="`Prize ${item.name}`">
          </div>
          <a v-else class="carousel-image" :href="item?.link" target="_blank">
            <img :src="item.image" :alt="`${item.name} logo`">
          </a>
        </template>
        <p v-else>{{ item.name }}</p>
      </Slide>
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
}

.carousel {
  height: 200px;
  position: static;
}

.carousel.speaker {
  height: 300px;
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
