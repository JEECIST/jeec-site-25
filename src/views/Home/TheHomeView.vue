<script setup>
import TheHomeSection from './TheHomeSection.vue';
import HeroSection from './aHomeHeroSection.vue';
import bSection from './bHomeWhatSection.vue';
import cSection from './cHomeWhereSection.vue';
import dSection from './dHomeOfferSection.vue'
import eSection from './eHomeWhySection.vue'
import fSection from './fHomeScheduleSection.vue';
import gSection from './gHomePrizesSection.vue';
import hSection from './hHomePartnersSection.vue';
import iSection from './iHomeSponsorsSection.vue';
import jSection from './jHomeSpeakersSection.vue';
import kSection from './kHomeTeamSection.vue';

import { useRouter } from 'vue-router';
const router = useRouter();

const sections = [
  {
    component: bSection,
  },
  {
    component: cSection,
  },
  {
    component: dSection,
  },
  {
    component: eSection,
  },
  {
    component: fSection,
    color: router.getRoutes().find(route => route.name === 'schedule').meta.accColor,
    // deactivated: router.getRoutes().find(route => route.name === 'schedule').meta.deactivated,
    deactivated: true,
  },
  {
    component: gSection,
    color: router.getRoutes().find(route => route.name === 'prizes').meta.accColor,
    deactivated: router.getRoutes().find(route => route.name === 'prizes').meta.deactivated,
  },
  {
    component: hSection,
    color: router.getRoutes().find(route => route.name === 'partners').meta.accColor,
    deactivated: router.getRoutes().find(route => route.name === 'partners').meta.deactivated,
  },
  {
    component: iSection,
    color: router.getRoutes().find(route => route.name === 'sponsors').meta.accColor,
    deactivated: router.getRoutes().find(route => route.name === 'sponsors').meta.deactivated,
  },
  {
    component: jSection,
    color: router.getRoutes().find(route => route.name === 'speakers').meta.accColor,
    deactivated: router.getRoutes().find(route => route.name === 'speakers').meta.deactivated,
  },
  {
    component: kSection,
    color: router.getRoutes().find(route => route.name === 'team').meta.accColor,
    deactivated: router.getRoutes().find(route => route.name === 'team').meta.deactivated,
  },
];

const activeSections = sections.filter(section => !section.deactivated);
</script>

<template>
  <div>
    <HeroSection></HeroSection>
    <TheHomeSection v-for="(section, index) in activeSections" :key="section.component" :index="index"
      v-slot="slotProp">
      <component :is="section.component" :isEven="slotProp.isEven"
        :accColor="section?.color ?? router.currentRoute.value.meta.accColor"></component>
    </TheHomeSection>
  </div>
</template>
