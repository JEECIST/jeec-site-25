<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useHomeScheduleStore } from '@/stores/homeSchedule';
import { storeToRefs } from 'pinia';

const homeScheduleStore = useHomeScheduleStore()
const { nextActivities } = storeToRefs(homeScheduleStore);
onMounted(async () => {
  await homeScheduleStore.fetchData();
});

const props = defineProps({
  isEven: {
    type: Boolean,
    default: false
  },
  accColor: {
    type: String,
    default: '--c-acc-blue'
  }
});

const setColor = (type) => {
  switch (type) {
    case 'Inside Talks':
      return '--c-acc-strong-pink';
    case 'Board Discussions':
      return '--c-acc-blue';
    case '15/15':
      return '--c-acc-violet';
    case 'Discussion Panel':
      return '--c-acc-yellow';
    case 'Keynote Speaker':
      return '--c-acc-yellow';
    case 'Workshop':
      return '--c-acc-orange';
    case 'Opening Ceremony':
      return '--c-acc-blue';
    case 'Alumni Talks':
      return '--c-acc-purple-blue';
    default:
      return '--c-acc-blue';
  }
}

const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

const currentLogoIndex = ref({});
let globalInterval = null;


function rotateAllLogos() {
  const activities = nextActivities.value;
  activities.forEach(activity => {

    const hasMultipleCompanyLogos = activity.companies && activity.companies.length > 1;
    const hasMultipleSpeakers = activity.speakers && activity.speakers.length > 1;

    if (hasMultipleCompanyLogos || hasMultipleSpeakers) {
      if (currentLogoIndex.value[activity.id] === undefined) {
        currentLogoIndex.value[activity.id] = 0;
      } else {
        const maxLength = hasMultipleCompanyLogos ? activity.companies.length : activity.speakers.length;

        currentLogoIndex.value[activity.id] =
          (currentLogoIndex.value[activity.id] + 1) % maxLength;
      }
    }
  });
}

watch(nextActivities, (newActivities) => {
  if (globalInterval) {
    clearInterval(globalInterval);
    globalInterval = null;
  }

  currentLogoIndex.value = {};

  const hasMultipleLogos = newActivities.some(
    activity => activity.companies && activity.companies.length > 1 ||
      (activity.speakers && activity.speakers.length > 1)
  );

  if (hasMultipleLogos) {
    globalInterval = setInterval(rotateAllLogos, 3000);
    newActivities.forEach(activity => {
      if ((activity.companies && activity.companies.length > 1) ||
        (activity.speakers && activity.speakers.length > 1)) {
        currentLogoIndex.value[activity.id] = 0;
      }
    });
  }
}, { deep: true });

onMounted(() => {
  globalInterval = setInterval(rotateAllLogos, 3000);
});

onUnmounted(() => {
  if (globalInterval) {
    clearInterval(globalInterval);
  }
});
</script>

<template>
  <div class="content" :class="{ even: props.isEven }" :style="`--acc-color: var(${props.accColor});`">
    <div class="next-activities">
      <template v-for="activity in nextActivities.slice(0, 2)" :key="activity.id">
        <div class="activity-content" :style="`--acc-color: var(${setColor(activity.activity_type)});`">
          <div class="activity-description">
            <h3 class="title">
              <span class="type">{{
                activity.activity_type }}</span>
              <span class="name">{{ activity.name }}</span>
            </h3>
            <p v-if="activity.location" class="location">{{ activity.location }}</p>
            <p class="time">{{ activity.time + ' - ' + activity.end_time }}</p>
          </div>
          <div class="logos">
            <div v-if="activity?.speakers?.length > 0" class="logo-container company-logo-container">
              <transition name="logo-fade" mode="out-in">
                <img v-if="activity?.speakers?.[currentLogoIndex?.[activity.id] ?? 0]?.logo_company"
                  :key="'company-' + (currentLogoIndex?.[activity.id] ?? 0)"
                  :src="activity.speakers[currentLogoIndex[activity.id] ?? 0].logo_company" class="logo-image" />
              </transition>
            </div>

            <div class="logo-container speaker-logo-container">
              <transition name="logo-fade" mode="out-in">
                <template v-if="activity?.speakers?.length > 0">
                  <img v-if="activity.speakers[currentLogoIndex?.[activity.id] ?? 0]?.logo_speaker"
                    :key="'speaker-' + (currentLogoIndex?.[activity.id] ?? 0)"
                    :src="activity.speakers[currentLogoIndex[activity.id] ?? 0].logo_speaker" class="logo-image" />
                </template>
                <template v-else-if="activity?.companies?.length > 0">
                  <img v-if="activity.companies[currentLogoIndex?.[activity.id] ?? 0]"
                    :key="'company-' + (currentLogoIndex?.[activity.id] ?? 0)"
                    :src="activity.companies[currentLogoIndex[activity.id] ?? 0].logo_company" class="logo-image" />
                </template>
                <template v-else>
                  <div class="logo-default"></div>
                </template>
              </transition>
            </div>
          </div>
        </div>
      </template>
      <div class="activity-fade"></div>
    </div>
    <div class="description">
      <h2>Next Activities</h2>
      <div class="highlight"></div>
      <p>
        The JEEC (Electrical and Computer Engineering Week) is an event organized by students, for students, from
        various courses at Instituto Superior Técnico, with a primary focus on Electrical and Computer Engineering. Our
        main objective is to fill the gap between the academic and business worlds, offering a range of activities to
        the entire community free of charge.
      </p>
      <router-link class="page-link" to="partners">Learn more</router-link>
    </div>
  </div>
</template>

<style scoped>
.content:not(#i) {
  justify-content: space-around;
  flex-direction: row-reverse;
  gap: 5ch;
  text-align: start;
  width: min(100%, 1300px);
}

.content.even:not(#i) {
  flex-direction: row;
  text-align: end;
}

.description {
  max-width: 40ch;
  padding-top: 3rem;
  padding-bottom: 1rem;
  flex-basis: 40%;
  align-self: flex-start;
}

.description h2 {
  text-transform: uppercase;
}

.description .highlight {
  width: 100%;
  height: 2px;
  border-radius: 4px;
  background: linear-gradient(to right,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 38%, transparent) 50%,
      var(--acc-color) 100%);
}

.activity-content:not(.even) .description .highlight {
  transform: scaleX(-100%);
}

.description p {
  padding-top: 2rem;
}

.description a.page-link {
  display: inline-block;
  padding-top: 1rem;
  color: var(--acc-color);
  text-decoration: underline;
}

@media screen and (max-width: 950px) {
  .content:not(#i#i) {
    flex-direction: column;
    text-align: center;
    gap: 0;
  }

  .positioner {
    align-self: center;
    max-width: 60ch;
    width: 100%;
  }

  .description {
    max-width: 50ch;
    align-self: unset;
  }

  .description .highlight {
    background: linear-gradient(to right,
        transparent 0%,
        color-mix(in srgb, var(--acc-color) 50%, transparent) 20%,
        var(--acc-color) 50%,
        color-mix(in srgb, var(--acc-color) 50%, transparent) 80%,
        transparent 100%);
  }
}
</style>

<style scoped>
.next-activities {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: start;
  padding: 2rem 0;
  margin-bottom: -2rem;
  z-index: -1;
}

.activity-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 650px;
  padding: 5px;
  text-align: start;
  background: color-mix(in srgb, var(--acc-color) 10%, transparent);
  border: 2px solid var(--acc-color);
  border-radius: 0px 5rem 5rem 10px;
  gap: 1ch;
}

.content.even .activity-fade {
  --bg-color: var(--c-bg-lighter);
}

.activity-fade {
  --bg-color: var(--c-bg);
  position: absolute;
  z-index: 2;
  bottom: -1px;
  left: 50%;
  translate: -50% 0;
  width: 200%;
  height: 3rem;
  background: var(--bg-color);
  pointer-events: none;
  box-shadow: 0 -2rem 50px 20px var(--bg-color);
  transform-origin: center;
}

.activity-description {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: .5rem 0;
  padding-left: 1ch;
}

.title {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
}

.title .type {
  display: flex;
  gap: 10px;
  font-weight: bold;
  font-size: 1.4rem;
  color: var(--acc-color);
  text-transform: uppercase;
  padding-bottom: .3rem;
}

.logos {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  position: relative;
}

.logo-container {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  border: 2px solid var(--acc-color);
  position: relative;
  overflow: hidden;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo-container {
  width: 65px;
  height: 65px;
  position: relative;
  left: 35px;
  bottom: -70px;
  z-index: 1;
  object-fit: contain;
}

.company-logo-container img {
  object-fit: contain;
}

.logo-image {
  width: 100%;
  height: 100%;
  background-color: var(--c-ft);
  object-fit: contain;
  display: block;
}

.logo-default {
  width: 100%;
  height: 100%;
  background-color: var(--c-ft);
}

.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 0.5s ease;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}
</style>
