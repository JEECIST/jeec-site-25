<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const accColor = computed(() => route.meta.accColor)

import i18n from '@/i18n'

import { useSpeakersStore } from '@/stores/speakers'
import { storeToRefs } from 'pinia'
const speakersStore = useSpeakersStore()
const { speakers } = storeToRefs(speakersStore)
onMounted(async () => {
  await speakersStore.fetchData()
  console.log('Speakers data in component:', speakers.value)
})
</script>

<template>
  <div class="view">
    <section class="description">
      <h1 :style="`--acc-color: var(${accColor});`">{{ $t('speakers.title') }}</h1>
      <p>{{ $t('speakers.description') }}</p>
    </section>
    <section class="speaker_section" v-if="speakers.keynote.length > 0">
      <h2>{{ $t('speakers.keynote') }}</h2>
      <div class="speaker_day" v-for="day in speakers.keynote" :key="day[0].activity_date">
        <h3>{{ day[0].activity_date }}</h3>
        <div class="speakers">
          <div v-for="speaker in day" :key="speaker.name" class="speaker">
            <img
              v-if="speaker.image_base64 != null"
              :src="speaker.image_base64"
              :alt="speaker.name"
            />
            <p v-else>{{ speaker.name }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="speaker_section" v-if="speakers.discussions.length > 0">
      <h2>{{ $t('speakers.discussions') }}</h2>
    </section>
    <section class="speaker_section" v-if="speakers.alumni.length > 0">
      <h2>{{ $t('speakers.alumni') }}</h2>
    </section>
  </div>
</template>

<style scoped>
.view {
  padding-top: var(--header-height);
  --acc-color: var(--j26-purple);
  display: block;
  padding-right: 0;
  padding-left: 0;
  text-align: start;
}

h1 {
  text-align: center;
  text-shadow: 0px 0px 15px var(--acc-color);
  margin: 2rem auto;
  position: relative;
  width: min-content;
}

h2 {
  text-align: start;
  padding: 0 2ch;
  margin: 0;
}

.description {
  text-align: center;
  width: 100%;
  max-width: 70ch;
  margin: 0 auto;
  padding-bottom: 3rem;
}

.description p {
  font-weight: 550;
  font-size: 1.2rem;
}

.speaker_section {
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: minmax(2px, 0.25rem) 1fr;
  grid-template-areas:
    'header header'
    'schedule content';
  align-items: start;
  gap: 2rem;
}

.speaker_section > h2 {
  grid-area: header;
}

.speaker_section > .schedule_line {
  grid-area: schedule;
  width: 100%;
}

.speaker_section > .speakers {
  grid-area: content;
}
</style>
