<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePartnersStore } from '@/stores/partners'
import '../assets/Partners&Sponsors.css'

const route = useRoute()
const accColor = computed(() => route.meta.accColor)

const partnersStore = usePartnersStore()
const { partners } = storeToRefs(partnersStore)
onMounted(async () => {
  await partnersStore.fetchData()
})
</script>

<template>
  <div class="view">
    <div class="background"></div>

    <section class="intro">
      <h1 :style="`--acc-color: var(${accColor});`">Partners</h1>
      <p>
        Get to know our amazing partners present during the week, be it with a stand at the job fair
        or with a soft-skills workshop!
      </p>
    </section>

    <template v-for="tier in partners" :key="tier.tier">
      <template v-if="tier.companies.length > 0">
        <!-- <div class="highlight-divider" :style="`--acc-color: var(${accColor});`"></div> -->
        <section class="tier tier_spacer" :class="tier.tier">
          <h2>
            <span class="highlight-title">{{ tier.title.highlight }}</span
            >{{ ' ' + tier.title.normal }}
          </h2>
          <div class="container">
            <div v-for="(company, index) in tier.companies" :key="index" class="item">
              <img
                v-if="company.image_base64 != null"
                :src="company.image_base64"
                :alt="company.name"
              />
              <p v-else>{{ company.name }}</p>
            </div>
          </div>
        </section>
      </template>
    </template>
  </div>
</template>
