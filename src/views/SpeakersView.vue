<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useSpeakersStore } from '@/stores/speakers';
import { storeToRefs } from 'pinia';
const speakersStore = useSpeakersStore();
const { speakers } = storeToRefs(speakersStore);

const speaker = ref([]);
const day = ref('');
const cardInfoShow = ref(false);

function selectCard(speaker_, day_) {
  if (speaker.value.name === speaker_.name && day.value === day_ && cardInfoShow.value) {
    cardInfoShow.value = false;
  } else {
    speaker.value = speaker_;
    day.value = day_;
    cardInfoShow.value = true;
  }
}
function cardInfoShowDay(day_) {
  return day.value === day_ && cardInfoShow.value;
}
const weekdays = ref([
  { label: 'May 5th | Monday', key: 'monday', id: 'monday-carousel' },
  { label: 'May 6th | Tuesday', key: 'tuesday', id: 'tuesday-carousel' },
  { label: 'May 7th | Wednesday', key: 'wednesday', id: 'wednesday-carousel' },
  { label: 'May 8th | Thursday', key: 'thursday', id: 'thursday-carousel' },
  { label: 'May 9th | Friday', key: 'friday', id: 'friday-carousel' },
]);

const showLeftArrow = ref({});
const showRightArrow = ref({});
function updateArrowVisibility(id) {
  const container = document.getElementById(id);
  if (!container) return;
  showLeftArrow.value[id] = container.scrollLeft > 0;
  showRightArrow.value[id] = container.scrollLeft + container.offsetWidth < container.scrollWidth;
}

function scrollLeft(id) {
  const container = document.getElementById(id);
  if (!container) return;
  container.scrollBy({ left: -300, behavior: 'smooth' });
}

function scrollRight(id) {
  const container = document.getElementById(id);
  if (!container) return;
  container.scrollBy({ left: 300, behavior: 'smooth' });
}

const isMobile = ref(window.innerWidth <= 1000);

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 1000;
  nextTick(() => {
    weekdays.value.forEach(day_ => {
      updateArrowVisibility(day_.id);
    });
  });
}

onMounted(async () => {
  await speakersStore.fetchData().then(async () => {
    await nextTick();
    weekdays.value.forEach(day => updateArrowVisibility(day.id));
  });
});

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);

  weekdays.value.forEach(day_ => {
    updateArrowVisibility(day_.id);

    const container = document.getElementById(day_.id);
    if (container) {
      container.addEventListener('scroll', () => updateArrowVisibility(day_.id));
    }
  });
});

onUnmounted(() => { window.removeEventListener('resize', updateIsMobile); });
</script>

<template>
  <div class="view">
    <section class="description">
      <h1>Speakers</h1>
      <p>
        We're bringing in speakers from around the world! Meet them throughout the week
        as they share insights and join engaging panel discussions.
      </p>
    </section>
    <div class="line"></div>
    <section class="weekday" v-for="(day, index) in weekdays" :key="index">
      <h2>{{ day.label }}</h2>
      <div class="strategic-div">
        <button v-if="showLeftArrow[day.id]" @click="scrollLeft(day.id)" class="carousel-btn left"> &lt; </button>
        <div class="carousel-wrapper">
          <div class="cards-container" :id="day.id">
            <div class="card" v-for="(speaker, i) in speakers[day.key]" :key="i">
              <div class="image-wrapper">
                <img :src="speaker.image" :alt="speaker.name" />
                <div class="hover-wrapper">
                  <button class="plus-sign" @click="selectCard(speaker, day.key)">
                    <p>+</p>
                  </button>
                </div>
                <div class="caption">
                  <img :src="speaker.company_logo" class="cap-company-logo" />
                  <p>{{ speaker.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button v-if="showRightArrow[day.id]" @click="scrollRight(day.id)" class="carousel-btn right"> &gt; </button>
      </div>
      <div class="info-card" v-show="cardInfoShowDay(day.key)">
        <div class="speaker-details">
          <div class="speaker-top">
            <div class="company-info">
              <img :src="speaker.company_logo" class="company-logo" />
              <div class="position">{{ speaker.position }}</div>
            </div>
            <div class="info-card-line"></div>
            <h2 class="speaker-name">{{ speaker.name }}</h2>
            <p class="speaker-bio">{{ speaker.bio }}</p>
          </div>
          <div class="activity-info">
            <h3 class="speaker-type">{{ speaker.speaker_type }}</h3>
            <p class="activity-location">{{ speaker.activity_location }}</p>
            <p class="activity-details">{{ speaker.activity_name }}<br>{{ speaker.activity_date }} | {{
              speaker.activity_time_range }}</p>
          </div>
        </div>
        <div class="speaker-image" v-if="!isMobile">
          <img :src="speaker.image" :alt="speaker.name" />
        </div>
      </div>
      <div class="line"></div>
    </section>
  </div>
</template>

<style scoped>
.view {
  padding-top: var(--header-height);
  --acc-color: var(--c-acc-yellow);
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

.line {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, transparent, var(--acc-color), transparent);
}

.strategic-div {
  position: relative;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 1.5rem;
  border: none;
  background-color: rgba(255, 190, 11, 0.4);
  text-shadow: 0px 0px 10px #00000080;
  color: white;
  font-size: 2rem;
  font-weight: bolder;
  text-align: center;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease;
}

.carousel-btn.left {
  left: 0.5ch;
}

.carousel-btn.right {
  right: 0.5ch;
}

.carousel-btn.left:hover {
  box-shadow: 0 0 15px 5px rgba(255, 190, 11, 0.2);
}

.carousel-btn.right:hover {
  box-shadow: 0 0 15px 5px rgba(255, 190, 11, 0.2);
}

.cards-container {
  width: 100%;
  display: flex;
  overflow: auto;
  scroll-behavior: smooth;
  gap: 2.5ch;
  padding: 2rem 4ch;
  scrollbar-width: none;
}

.cards-container::-webkit-scrollbar {
  display: none;
}

.card {
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  height: 21rem;
  width: 23ch;
  border-radius: 15px;
  border: 2px solid var(--acc-color);
  background-color: var(--c-bg-lighter);
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
  backdrop-filter: blur(50px);
}

.card:hover .plus-sign {
  opacity: 1;
  background-color: rgba(255, 190, 11, 0.1);
}

.card:hover .caption {
  background: none;
  backdrop-filter: none;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-wrapper>img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  z-index: 1;
}

.caption {
  background: rgba(255, 190, 11, 0.1);
  border-radius: 15px;
  position: absolute;
  width: calc(100% - 2ch);
  bottom: 0;
  left: 1ch;
  padding: 1ch;
  margin: 1ch 0;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1ch;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 3;
  pointer-events: none;
}

.caption p {
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
  text-align: left;
  font-weight: bolder;
}

.caption img {
  align-self: flex-start;
  object-fit: contain;
  min-width: 60px;
  max-width: 100px;
  max-height: 40px;
  min-height: 35px;
  padding: 5px;
  width: auto;
  height: auto;
  border-radius: 5px;
  background: white;
}

.hover-wrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.plus-sign {
  color: var(--acc-color);
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  background-color: transparent;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.plus-sign p {
  font-size: 15rem;
  width: 100%;
  height: 100%;
}

.info-card {
  border: var(--acc-color) 2px solid;
  border-radius: 15px;
  width: calc(100% - 8ch);
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: min-content;
  justify-content: space-between;
  animation: fadeIn 0.5s ease-in-out;
  margin: 0 auto;
  margin-bottom: 3rem;
}

.speaker-image {
  width: 350px;
  height: 100%;
  border-radius: 0 15px 15px 0;
  border-left: solid 2px var(--acc-color);
  overflow: hidden;
}

.speaker-image img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.speaker-details {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 1rem 2ch;
  max-height: 600px;
  overflow: auto;
}

.speaker-top {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 1ch;
}

.company-logo {
  object-fit: contain;
  display: block;
  background: var(--c-ft);
  padding: 0;
  border-radius: 10px;
  border: solid 2px var(--acc-color);
  min-width: 3rem;
  max-width: 10rem;
  max-height: 6rem;
  height: min-content;
  align-self: flex-end;
  padding: 5px;
}

.position {
  color: var(--acc-color);
  font-size: 1.3rem;
  font-weight: 400;
  padding-top: 0.5rem;
  padding-bottom: calc(0.5rem + 2px);
}

.info-card-line {
  display: flex;
  justify-content: center;
  position: relative;
  top: -2px;
  height: 2.5px;
  width: 100%;
  margin-left: 2%;
  background: linear-gradient(to right, var(--acc-color), var(--acc-color), transparent);
}

.speaker-name {
  font-size: 2rem;
  font-weight: bold;
  color: #ffbe0b;
  padding: 0;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.speaker-bio {
  color: white;
  font-size: 0.9rem;
  margin-bottom: 3%;
  width: 90%;
  max-height: 70%;
  overflow: scroll;
}

.activity-info {
  border: 2px solid var(--acc-color);
  border-radius: 0 15px 15px 15px;
  background: color-mix(in srgb, var(--acc-color) 15%, var(--c-bg));
  width: 100%;
  padding: 0.5rem 1ch;
}

.speaker-type {
  text-align: left;
  font-size: 1.5rem;
  color: var(--acc-color);
  box-sizing: border-box;
  overflow-wrap: break-word;
  width: 100%;
}

.activity-location {
  font-size: 1.2rem;
}

.activity-details {
  font-size: 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
