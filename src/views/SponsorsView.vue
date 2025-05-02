<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';

import '../assets/Partners&Sponsors.css';

import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
const accColor = computed(() => route.meta.accColor);

const sponsors = ref([
  {
    tier: 'platinum',
    title: {
      highlight: 'Platinum',
      normal: 'Sponsors'
    },
    companies: [],
  },
  {
    tier: 'gold',
    title: {
      highlight: 'Gold',
      normal: 'Sponsors'
    },
    companies: [],
  },
  {
    tier: 'silver',
    title: {
      highlight: 'Silver',
      normal: 'Sponsors'
    },
    companies: [],
  },
  {
    tier: 'bronze',
    title: {
      highlight: 'Bronze',
      normal: 'Sponsors'
    },
    companies: [],
  },
]);

const allSponsors = ref([])
const fetchData = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/sponsors', {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then((response) => {
    allSponsors.value = response.data;

    // Process tiers and decode base64 images
    response.data.tiers.forEach((tier) => {
      const sponsorImages = tier.sponsors

        .map((sponsor) => sponsor.image ? `data:image/*;base64,${sponsor.image}` : null) // Decode base64 to data URL
        .filter((image) => image !== null); // Remove null values

      switch (tier.tier_name) {
        case 'platinum':
          sponsors.value[0].companies = sponsorImages;
          break;
        case 'gold':
          sponsors.value[1].companies = sponsorImages;
          break;
        case 'silver':
          sponsors.value[2].companies = sponsorImages;
          break;
        case 'bronze':
          sponsors.value[3].companies = sponsorImages;
          break;
      }
    });
  }).catch((error) => {
    console.log(error);
  });
};

onMounted(fetchData)
</script>

<template>
  <div class="view">
    <div class="background"></div>

    <section class="intro">
      <h1 :style="`--acc-color: var(${accColor});`">Sponsors</h1>
      <p>Our sponsors help us improve JEEC and without them the whole experience wouldn’t be as good as it is. Don’t
        forget to look for merchandising and gifts!</p>
    </section>

    <template v-for="tier in sponsors" :key="tier.tier">
      <template v-if="tier.companies.length > 0">
        <div class="highlight-divider" :style="`--acc-color: var(${accColor});`"></div>
        <section class="tier" :class="tier.tier">
          <h2><span class="highlight-title">{{ tier.title.highlight }}</span>{{ " " + tier.title.normal }}</h2>
          <div class="container">
            <div v-for="(company, index) in tier.companies" :key="index" class="item">
              <img :src="company" :alt="company.name" />
            </div>
          </div>
        </section>
      </template>
    </template>
  </div>
</template>
