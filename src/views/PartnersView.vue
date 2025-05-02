<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';

import '../assets/Partners&Sponsors.css';

import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
const accColor = computed(() => route.meta.accColor);

const partners = ref([
  {
    tier: 'gold',
    title: {
      highlight: 'Gold',
      normal: 'Partners'
    },
    companies: [],
  },
  {
    tier: 'silver',
    title: {
      highlight: 'Silver',
      normal: 'Partners'
    },
    companies: [],
  },
  {
    tier: 'bronze',
    title: {
      highlight: 'Bronze',
      normal: 'Partners'
    },
    companies: [],
  },
  {
    tier: 'nucleo',
    title: {
      highlight: '',
      normal: 'Núcleos e Centros de Investigação'
    },
    companies: [],
  }
]);

const fetchPartners = async () => {
  axios
    .get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/companies', {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    })
    .then((response) => {
      partners.value[0].companies = response.data.gold;
      partners.value[1].companies = response.data.silver;
      partners.value[2].companies = response.data.bronze;
      partners.value[3].companies = response.data.nucleo;

      console.log("partnersTiers:", partners.value[1].companies.find);
    })
    .catch((error) => {
      console.log(error);
    })
};

onMounted(fetchPartners)
</script>

<template>
  <div class="view">
    <div class="background"></div>

    <section class="intro">
      <h1 :style="`--acc-color: var(${accColor});`">Partners</h1>
      <p>Get to know our amazing partners present during the week, be it with a stand at the job fair or with a
        soft-skills workshop!</p>
    </section>

    <template v-for="tier in partners" :key="tier.tier">
      <template v-if="tier.companies.length > 0">
        <div class="highlight-divider" :style="`--acc-color: var(${accColor});`"></div>
        <section class="tier" :class="tier.tier">
          <h2><span class="highlight-title">{{ tier.title.highlight }}</span>{{ " " + tier.title.normal }}</h2>
          <div class="container">
            <div v-for="(company, index) in tier.companies" :key="index" class="item">
              <img :src="company.image_base64" :alt="company.name" />
            </div>
          </div>
        </section>
      </template>
    </template>
  </div>
</template>
