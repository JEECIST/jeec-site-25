<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSponsorsStore } from '@/stores/sponsors'
import '../assets/Partners&Sponsors.css'

const route = useRoute()
const accColor = computed(() => route.meta.accColor)

const sponsorsStore = useSponsorsStore()
const { sponsors } = storeToRefs(sponsorsStore)
onMounted(async () => {
  await sponsorsStore.fetchData()
})
</script>

<template>
  <div class="view">
    <div class="background"></div>

    <section class="intro">
      <h1 :style="`--acc-color: var(${accColor});`">Sponsors</h1>
      <p>
        Our sponsors help us improve JEEC and without them the whole experience wouldn’t be as good
        as it is. Don’t forget to look for merchandising and gifts!
      </p>
    </section>

    <template v-for="tier in sponsors" :key="tier.tier">
      <template v-if="tier.companies.length > 0">
        <!-- <div class="highlight-divider" :style="`--acc-color: var(${accColor});`"></div> -->
        <section class="tier tier_spacer" :class="tier.tier">
          <h2>
            <span class="highlight-title">{{ tier.title.highlight }}</span
            >{{ ' ' + tier.title.normal }}
          </h2>
          <div class="container">
            <div v-for="(company, index) in tier.companies" :key="index" class="item">
              <img v-if="company.image != null" :src="company.image" :alt="company.name" />
              <p v-else>{{ company.name }}</p>
            </div>
          </div>
        </section>
      </template>
    </template>
  </div>
</template>
