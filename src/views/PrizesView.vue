<script setup>

import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { ref, onMounted, computed } from 'vue';
import axios from "axios";


const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const isLoading = ref(true);
const hasError = ref(false);
const errorMessage = ref('');

const prizesArray = ref({
  Daily: [],
  Squad: [],
  Individual: [],
  CV: [],
  Shop: [],
});

const segmentedPrizes = ref({
  CV: [],
  Daily: [],
  Individual: [],
  Shop: [],
  Squad: []
});

// Carousel configuration
const config = {
  adjustableHeight: true,
  snapAlign: 'center',
  autoplay: 4000,
  wrapAround: true,
  pauseAutoplayOnHover: true,

  // 'breakpointMode' determines how the carousel breakpoints are calculated
  // Acceptable values: 'viewport' (default) | 'carousel'
  // 'viewport' - breakpoints are based on the viewport width
  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: 'carousel',

  // Breakpoints are mobile-first
  breakpoints: {
    0: {
      itemsToShow: 1.5,
    },
    300: {
      itemsToShow: 2,
    },
    550: {
      itemsToShow: 2.5,
    },
    700: {
      itemsToShow: 3,
    },
    1000: {
      itemsToShow: 5,
    },
  },
};

// Async function to fetch prizes
const fetchPrizes = async () => {
  try {
    isLoading.value = true;
    hasError.value = false;

    const response = await axios.get(
      import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/site-get-prizes',
      {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    );

    prizesArray.value = response.data;

    // Segment the prizes by type
    segmentedPrizes.value = {
      CV: response.data.CV || [],
      Daily: response.data.Daily || [],
      Individual: response.data.Individual || [],
      Shop: response.data.Shop || [],
      Squad: response.data.Squad || []
    };

    console.log("Prizes Data:", prizesArray.value);
    console.log("Segmented Prizes:", segmentedPrizes.value);
  } catch (error) {
    console.error("Error fetching prizes:", error);
    hasError.value = true;
    errorMessage.value = "Failed to load prizes. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};
// selectedRow.value.logo = selectedRow.value.logo ? `data:image/*;base64,${selectedRow.value.logo}` : null
// Helper computed properties to get prizes names safely
const dailyPrizes = computed(() => {
  return weekdays.map((day, index) => {
    const prize = segmentedPrizes.value.Daily[index];
    return {
      name: prize?.name || "Prize coming soon",
      image: prize?.image_url ? `data:image/*;base64,${prize.image_url}` : null
    };
  });
});

const shopPrizes = computed(() => {
  return segmentedPrizes.value.Shop.map(prize => ({
    name: prize?.name || "Prize coming soon",
    image: prize?.image_url ? `data:image/*;base64,${prize.image_url}` : null
  }));
});

const individualPrizes = computed(() => {
  return segmentedPrizes.value.Individual.map(prize => ({
    name: prize?.name || "Prize coming soon",
    image: prize?.image_url ? `data:image/*;base64,${prize.image_url}` : null
  }));
});

const squadPrizes = computed(() => {
  return segmentedPrizes.value.Squad.map(prize => ({
    name: prize?.name || "Prize coming soon",
    image: prize?.image_url ? `data:image/*;base64,${prize.image_url}` : null
  }));
});

const cvPrize = computed(() => {
  const prize = segmentedPrizes.value.CV?.[0];
  return {
    name: prize.name || "Prize coming soon",
    image: prize.image_url ? `data:image/*;base64,${prize.image_url}` : null
  };
});

// Call the fetch function when component mounts
onMounted(() => {
  fetchPrizes();
});

</script>

<template>
  <div class="view">
    <section>
      <h1>Prizes</h1>
      <p>Log in to our app and get a chance to win these prizes!</p>
      <a href="#" class="webapp-btn">Webapp Login</a>
    </section>

    <div class="div-rule"></div>

    <section v-if="isLoading" class="loading-container">
      <p>Loading prizes...</p>
    </section>

    <section v-else-if="hasError" class="error-container">
      <p>{{ errorMessage }}</p>
      <button @click="fetchPrizes" class="retry-btn">Retry</button>
    </section>

    <template v-else>
      <section v-if="segmentedPrizes.Shop.length > 0">
        <h2>Our Prize Shop</h2>
        <div class="carousel-container shop">
          <Carousel v-bind="config">
            <Slide v-for="(prize, index) in shopPrizes" :key="'shop-' + index">
              <div class="carousel__item">
                <img v-if="prize.image" :src="prize.image" alt="Prize image" class="prize-image">
              </div>
              <p>{{ prize.name || 'Prize coming soon' }}</p>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
      </section>

      <div class="div-rule"></div>

      <section v-if="segmentedPrizes.Daily.length > 0">
        <h2>Individual daily draw</h2>
        <div class="carousel-container">
          <Carousel v-bind="config">
            <Slide v-for="(day, index) in weekdays" :key="'daily-' + index">
              <h3>{{ day }}</h3>
              <div class="carousel__item">
                <img v-if="dailyPrizes[index]?.image" :src="dailyPrizes[index].image" alt="Prize image"
                  class="prize-image">
              </div>
              <p>{{ dailyPrizes[index]?.name }}</p>
            </Slide>
          </Carousel>
        </div>
      </section>

      <div class="div-rule"></div>

      <section v-if="segmentedPrizes.Individual.length > 0">
        <h2>Individual weekly draw</h2>
        <div class="carousel-container">
          <Carousel v-bind="config">
            <Slide v-for="(prize, index) in individualPrizes" :key="'individual-' + index">
              <div class="carousel__item">
                <img v-if="prize.image" :src="prize.image" alt="Prize image" class="prize-image">
              </div>
              <p>{{ prize.name }}</p>
            </Slide>
          </Carousel>
        </div>
      </section>

      <div class="div-rule"></div>

      <section v-if="segmentedPrizes.Squad.length > 0">
        <h2>Squad weekly draw</h2>
        <div class="carousel-container">
          <Carousel v-bind="config">
            <Slide v-for="(prize, index) in squadPrizes" :key="'squad-' + index">
              <div class="carousel__item">
                <img v-if="prize.image" :src="prize.image" alt="Prize image" class="prize-image">
              </div>
              <p>{{ prize.name }}</p>
            </Slide>
          </Carousel>
        </div>
      </section>

      <template v-if="false">
        <div class="div-rule"></div>
        <section class="activity-prizes">
          <h2>Activity Prizes</h2>
          <div class="carousel-container">
            <Carousel v-bind="config">
              <Slide v-for="slide in 10" :key="slide">
                <div class="carousel__item">{{ slide }}</div>
              </Slide>

              <template #addons>
                <Navigation />
              </template>
            </Carousel>
          </div>
          <p>Nome do prémio</p>
        </section>
      </template>

      <template v-if="segmentedPrizes.CV.length > 0">
        <div class="div-rule"></div>
        <section class="cv">
          <div class="content">
            <div class="text-section">
              <h2 class="title">Upload Your CV</h2>
              <p class="description">
                Upload your CV to our web app and enter our draw for a chance to win this prize!
              </p>
            </div>
            <div class="prize-section">
              <div class="circle">
                <img v-if="cvPrize.image" :src="cvPrize.image" alt="CV Prize" class="prize-image">
              </div>
              <p class="label">{{ cvPrize.name }}</p>
            </div>
          </div>
        </section>
      </template>

    </template>
  </div>
</template>

<style scoped>
.view {
  --acc-color: var(--c-acc-violet);
  padding-top: var(--header-height);
  padding-bottom: 5rem;
}

.view>section {
  max-width: 1700px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0 2ch;
}

.view>section:first-of-type {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
  text-shadow: 0px 0px 15px var(--acc-color);
  margin: 2rem auto;
  position: relative;
  width: min-content;
}

.view>section:first-of-type p {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0 2ch;
  padding-top: 1rem;
  padding-bottom: 2rem;
}

.webapp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  font-size: 1.2rem;
  border: var(--acc-color) 2px solid;
  border-radius: 13px;
  padding: .6rem 2ch;
  background-color: color-mix(in srgb, var(--acc-color) 10%, transparent);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.webapp-btn:hover {
  background-color: color-mix(in srgb, var(--acc-color) 30%, transparent);
  transition: background-color 0.2s ease-out;
}

.div-rule {
  height: 2px;
  background-color: var(--c-acc-violet);
  background: linear-gradient(to right, var(--c-bg), var(--c-acc-violet), var(--c-bg));
  margin: 3rem 0;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
  gap: 2rem;
}

.loading-container p,
.error-container p {
  font-size: 1.2rem;
}

.retry-btn {
  padding: 0.5rem 1ch;
  background-color: var(--c-acc-violet);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.retry-btn:hover {
  background-color: color-mix(in srgb, var(--c-acc-violet) 80%, black);
  transition: background-color 0.1s ease-out;
}

.view>section h2 {
  /* text-shadow: 0px 0px 15px black; */
  padding: 0 2ch;
  padding-bottom: 2rem;
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 calc(1ch + 3.5rem);
  position: relative;
}

.carousel {
  width: 100%;
  --vc-nav-background: color-mix(in srgb, var(--acc-color) 85%, var(--c-bg));
  --vc-nav-color: var(--c-bg);
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 2.5rem;
  --vc-nav-height: 2.5rem;
  position: static;
}

.carousel__slide {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scale: 0.9;
  transition: scale 0.2s ease-in;
}

.carousel__slide--active {
  scale: 1;
  transition: scale 0.3s ease-out;
}

.carousel h3 {
  text-shadow: 0px 0px 15px var(--acc-color);
}

.carousel p {
  text-shadow: 0px 0px 15px var(--acc-color);
}

.carousel__item {
  height: 13rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--c-ft);
  box-shadow: 0px 0px 10px var(--acc-color);
  border: 2px solid var(--acc-color);
}

.prize-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
  object-fit: contain;
}

@media screen and (max-width: 950px) {
  .view>section {
    padding: 0 1ch;
  }

  .carousel-container {
    padding: 0 calc(1ch + 2.5rem);

  }
}

@media screen and (max-width: 600px) {
  .view>section {
    padding: 0;
  }

  .carousel-container {
    padding: 0;
  }
}

/*
.circle {
  height: 125px;
  width: 125px;
  background-color: gray;
  border-radius: 100%;
  border: 2px solid purple;
  box-shadow: 0px 0px 7px var(--acc-color);
  overflow: hidden;
}

.label {
  text-shadow: 0px 0px 25px var(--acc-color);
  margin-top: 20px;
  font-size: 1rem;
  color: white;
  font-weight: bold;
}

.cv {
  background-color: var(--c-bg);
  height: 550px;
  display: flex;
  justify-content: center;
}

.cv .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  max-width: 95%;
}

.cv .text-section {
  padding-top: 5%;
  max-width: 100%;
  text-align: center;
}

.cv .title {
  text-shadow: 0px 0px 15px black;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10%;
}

.cv .description {
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 500;
}

.cv .prize-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  width: 50%;
}

.cv .circle {
  width: 205px;
  height: 205px;
  background-color: gray;
  border-radius: 50%;
  border: 2px solid purple;
}

.cv .label {
  text-shadow: 0px 0px 25px var(--acc-color);
  margin-top: 20px;
  font-size: 1rem;
  color: white;
  font-weight: bold;
} */
</style>
