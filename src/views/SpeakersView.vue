<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const accColor = computed(() => route.meta.accColor)

import { useSpeakersStore } from '@/stores/speakers'
import { storeToRefs } from 'pinia'
const speakersStore = useSpeakersStore()
const { speakers } = storeToRefs(speakersStore)
onMounted(async () => {
  await speakersStore.fetchData()
})

import SpeakerCard from '@/components/SpeakerCard.vue'

const openSpeakerByGroup = ref({})

const speakerKey = (speaker, index) =>
  speaker?.id ||
  `${speaker?.name || 'speaker'}-${speaker?.activity_date || ''}-${speaker?.activity_time_range || ''}-${index}`

const handleSpeakerToggle = (groupId, speakerId, nextOpenState) => {
  openSpeakerByGroup.value[groupId] = nextOpenState ? speakerId : null
}

const formatShortMonthDate = (value) => {
  if (!value || typeof value !== 'string') return value

  const monthMap = {
    january: 'Jan',
    february: 'Feb',
    march: 'Mar',
    april: 'Apr',
    may: 'May',
    june: 'Jun',
    july: 'Jul',
    august: 'Aug',
    september: 'Sep',
    october: 'Oct',
    november: 'Nov',
    december: 'Dec',
  }

  return value.replace(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/i,
    (month) => monthMap[month.toLowerCase()] || month,
  )
}
</script>

<template>
  <div class="view" :style="`--acc-color: var(${accColor});`">
    <section class="description">
      <h1>{{ $t('speakers.title') }}</h1>
      <p>{{ $t('speakers.description') }}</p>
    </section>

    <section class="speaker_section" v-if="speakers?.keynote?.length">
      <h2>{{ $t('speakers.keynote') }}</h2>

      <div
        class="speaker_day"
        v-for="(day, dayIndex) in speakers.keynote"
        :key="day?.[0]?.activity_date || dayIndex"
      >
        <h3>{{ formatShortMonthDate(day?.[0]?.activity_date) }}</h3>
        <div class="speakers">
          <SpeakerCard
            v-for="(speaker, speakerIndex) in day"
            :key="speakerKey(speaker, speakerIndex)"
            :speaker-prop="speaker"
            :acc-color="accColor"
            :is-open="
              openSpeakerByGroup[`keynote-${dayIndex}`] === speakerKey(speaker, speakerIndex)
            "
            @toggled="
              (nextOpenState) =>
                handleSpeakerToggle(
                  `keynote-${dayIndex}`,
                  speakerKey(speaker, speakerIndex),
                  nextOpenState,
                )
            "
          />
        </div>
      </div>
    </section>

    <section class="speaker_section" v-if="speakers?.discussions?.length">
      <h2>{{ $t('speakers.discussions') }}</h2>
      <div class="speakers">
        <SpeakerCard
          v-for="(speaker, speakerIndex) in speakers.discussions"
          :key="speakerKey(speaker, speakerIndex)"
          :speaker-prop="speaker"
          :acc-color="accColor"
          :is-open="openSpeakerByGroup.discussions === speakerKey(speaker, speakerIndex)"
          @toggled="
            (nextOpenState) =>
              handleSpeakerToggle('discussions', speakerKey(speaker, speakerIndex), nextOpenState)
          "
        />
      </div>
    </section>

    <!-- <section class="speaker_section" v-if="speakers?.alumni?.length">
      <h2>{{ $t('speakers.alumni') }}</h2>
      <div class="speakers">
        <SpeakerCard
          v-for="(speaker, speakerIndex) in speakers.alumni"
          :key="speakerKey(speaker, speakerIndex)"
          :speaker-prop="speaker"
          :acc-color="accColor"
          :is-open="openSpeakerByGroup.alumni === speakerKey(speaker, speakerIndex)"
          @toggled="
            (nextOpenState) =>
              handleSpeakerToggle('alumni', speakerKey(speaker, speakerIndex), nextOpenState)
          "
        />
      </div>
    </section> -->
  </div>
</template>

<style scoped>
.view {
  padding-top: var(--header-height);
  padding-bottom: 5rem;
  --acc-color: var(--j26-purple);
  display: block;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
  text-shadow: 0px 0px 15px var(--acc-color, transparent);
  font-weight: 900;
}

.description {
  text-align: center;
  width: 100%;
  max-width: 70ch;
  margin: 0 auto;
  padding: 0 2ch;
  padding-bottom: 3rem;
}

.description p {
  font-weight: 550;
  font-size: 1.2rem;
}

.speaker_section {
  padding: 0 2ch;
  gap: 2rem;
  margin-bottom: 4rem;
  container-name: speakers-layout;
  container-type: inline-size;
}

.speaker_section > h2 {
  text-align: start;
  padding: 0;
  padding-bottom: 2rem;
}

.speaker_day {
  padding-top: 1.2rem;
  padding-left: 2rem;
  display: flex;
  position: relative;
}

.speaker_day::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--acc-color);
  box-shadow: 0px 0px 5px var(--acc-color);
}

.speaker_day h3 {
  align-self: center;
  display: block;
  max-width: 4ch;
  color: var(--acc-color);
  position: relative;
  font-weight: 700;
  text-shadow: 0px 0px 2px var(--acc-color);
  text-align: left;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.speaker_day h3::before {
  content: '';
  position: absolute;
  left: calc(-1.25rem + 1px);
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--acc-color);
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  box-shadow: 0px 0px 5px var(--acc-color);
}

.speakers {
  display: flex;
  flex: 1;
  min-width: 0;
  width: 100%;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1.25rem;
  container-name: speakers;
  container-type: inline-size;
}

@container speakers-layout (max-width: 550px) {
  .speakers {
    gap: 1rem;
    flex-direction: column;
  }
}
</style>
