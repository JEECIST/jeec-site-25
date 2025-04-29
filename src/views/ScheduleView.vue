<template>
  <div class="desktop" v-if="!isMobile">
    <div class="view">
      <section>
        <h1>Schedule</h1>
      </section>
      <section class="tabs">
        <div v-for="(day, index) in days" :key="index" class="tab" :class="{ active: activeDay === index }"
          @click="setActiveDay(index)">
          {{ day }}
        </div>
      </section>
      <transition name="fade" mode="out-in">
        <section class="eletrolink" :key="activeDay" v-if="!loading">
          <div class="box">
            <h3>Eletrolink</h3>
            <div class="eletrolink-description" v-if=showEletrolinkInfo> {{ eletrolink_description }} </div>
            <p>Today's companies:</p>
            <template v-if="filteredEletrocomps.length">
              <transition name="eletrolink-toggle">
                <div v-if="!showEletrolinkInfo" class="row">
                  <div v-for="(eletrocomp, index) in filteredEletrocomps" :key="index" class="eletrocomp">
                    <img :src="eletrocomp.logo" alt="Eletrocomp Logo" />
                  </div>
                </div>
              </transition>
            </template>

            <!-- Sem transição para o "NO COMPANIES" -->
            <template v-else>
              <transition name="no-companies-fade">
                <div v-if="!showEletrolinkInfo" class="no-companies">NO COMPANIES</div>
              </transition>
            </template>

            <!-- Visão detalhada -->
            <template v-if="filteredEletrocomps.length">
              <transition name="eletrolink-toggle">
                <div v-if="showEletrolinkInfo" class="eletrolink-content-grid">
                  <div v-for="(eletrocomp, index) in filteredEletrocomps" :key="index" class="eletrolink-grid-row">
                    <div class="eletrocomp">
                      <img :src="eletrocomp.logo" alt="Eletrocomp Logo" />
                    </div>
                    <div>
                      <div class="eletrocomp-title">
                        <p>{{ eletrocomp.title }}</p>
                      </div>
                      <div class="eletrocomp-location">
                        <p>ELETROLINK ROOM</p>
                      </div>
                      <div class="eletrocomp-time">
                        <p>{{ eletrocomp.date }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </template>

            <!-- Sem transição para o "NO COMPANIES" -->
            <template v-else>
              <transition name="no-companies-fade">
                <div v-if="showEletrolinkInfo" class="no-companies">NO COMPANIES</div>
              </transition>
            </template>
            <button class="info" @click="toggleEletrolinkInfo">
              {{ showEletrolinkInfo ? '−info' : '+info' }}
            </button>
          </div>
        </section>
      </transition>
      <transition name="fade" mode="out-in">
        <section class="timeline" :key="activeDay" v-if="!loading">
          <div v-if="filteredActivities.length != 0" class="fixed-line"></div>
          <div v-for="(activity, index) in filteredActivities" :key="index">
            <div v-if="hasGap(index)" class="gap"></div>
            <div class="activity">
              <div class="time">
                <div class="start">
                  <div class="start-time">{{ activity.time.replace(':', 'h') }}</div>
                  <div class="circle-start"></div>
                </div>
                <div class="end">
                  <div class="end-time">{{ activity.end_time.replace(':', 'h') }}</div>
                  <div class="circle-end"></div>
                </div>
              </div>
              <div v-if="filteredActivities.length != 0" class="line"></div>
              <div class="content" :class="className(activity.type)">
                <div class="column">
                  <div class="type">
                    <span :class="className(activity.type, '-type')">{{
                      activity.type }}</span>
                    <!-- <span class="icon">{{ activity.icon }}</span> -->
                  </div>
                  <div class="title">{{ activity.title }}</div>
                  <transition name="expand-fade">
                    <div v-if="isExpanded(index)" class="expanded-info">
                      <p class="act_description">{{ activity.description }}</p>
                      <h3>{{ activity.location }}</h3>
                      <p>{{ activity.date }}</p>
                    </div>
                  </transition>
                  <button :class="['info', className(activity.type, '-info')]" @click="toggleActivityInfo(index)">{{
                    isExpanded(index) ? '−info' : '+info' }}</button>
                </div>
                <div class="logos">
                  <img v-for="(logo, i) in activity.logos" :key="i" :src="logo"
                    :class="['logo', className(activity.type, '-logo')]" />
                </div>
              </div>
            </div>

          </div>
          <div v-if="!loading && filteredActivities.length == 0" class="no-events">NO EVENTS</div>
        </section>
      </transition>
    </div>
  </div>

  <div class="mobile" v-else>
    <div class="view">
      <section>
        <h1>Schedule</h1>
      </section>
      <section class="tabs-container">
        <div class="tabs-wrapper">
          <div class="tabs" :style="tabsStyle">
            <div v-for="(day, index) in days" :key="index" class="tab" :class="{ active: activeDay === index }"
              @click="setActiveDay(index)">
              {{ day }}
            </div>
          </div>
        </div>
        <button class="nav-button prev" @click="scrollPrev" :disabled="activeDay === 0">
          &lt;
        </button>
        <button class="nav-button next" @click="scrollNext" :disabled="activeDay === days.length - 1">
          &gt;
        </button>
      </section>
      <transition name="fade" mode="out-in">
        <section class="eletrolink" :key="activeDay" v-if="!loading">
          <div class="box">
            <h3>Eletrolink</h3>
            <div class="eletrolink-description" v-if=showEletrolinkInfo> {{ eletrolink_description }} </div>
            <p>Today's companies:</p>
            <template v-if="filteredEletrocomps.length">
              <transition name="eletrolink-toggle">
                <div v-if="!showEletrolinkInfo" class="row">
                  <div v-for="(eletrocomp, index) in filteredEletrocomps" :key="index" class="eletrocomp">
                    <img :src="eletrocomp.logo" alt="Eletrocomp Logo" />
                  </div>
                </div>
              </transition>
            </template>

            <!-- Sem transição para o "NO COMPANIES" -->
            <template v-else>
              <transition name="no-companies-fade">
                <div v-if="!showEletrolinkInfo" class="no-companies">NO COMPANIES</div>
              </transition>
            </template>

            <!-- Visão detalhada -->
            <template v-if="filteredEletrocomps.length">
              <transition name="eletrolink-toggle">
                <div v-if="showEletrolinkInfo" class="eletrolink-content-grid">
                  <div v-for="(eletrocomp, index) in filteredEletrocomps" :key="index" class="eletrolink-grid-row">
                    <div class="eletrocomp">
                      <img :src="eletrocomp.logo" alt="Eletrocomp Logo" />
                    </div>
                    <div>
                      <div class="eletrocomp-title">
                        <p>{{ eletrocomp.title }}</p>
                      </div>
                      <div class="eletrocomp-location">
                        <p>ELETROLINK ROOM</p>
                      </div>
                      <div class="eletrocomp-time">
                        <p>{{ eletrocomp.date }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </template>

            <!-- Sem transição para o "NO COMPANIES" -->
            <template v-else>
              <transition name="no-companies-fade">
                <div v-if="showEletrolinkInfo" class="no-companies">NO COMPANIES</div>
              </transition>
            </template>
            <button class="info" @click="toggleEletrolinkInfo">
              {{ showEletrolinkInfo ? '−info' : '+info' }}
            </button>
          </div>
        </section>
      </transition>
      <transition name="fade" mode="out-in">
        <section class="timeline-mobile" :key="activeDay" v-if="!loading">
          <div v-if="filteredActivities.length != 0" class="fixed-line"></div>
          <div v-for="(activity, index) in filteredActivities" :key="index" class="activity-mobile">
            <div class="teste">
              <div v-if="filteredActivities.length != 0" class="line-mobile"></div>
              <div class="circle-end-mobile"></div>
            </div>
            <div class="act-column">
              <div class="start-mobile">
                <div class="circle-start-mobile"></div>
                <div class="start-time-mobile">{{ activity.time }}</div>
              </div>
              <div class="content-mobile" :class="className(activity.type)">
                <div class="column-mobile">
                  <div class="type">
                    <span :class="className(activity.type, '-type')">{{
                      activity.type }}</span>
                  </div>
                  <div class="title">{{ activity.title }}</div>
                  <transition name="expand-fade">
                    <div v-if="isExpanded(index)" class="expanded-info">
                      <p class="act_description">{{ activity.description }}</p>
                      <h3>{{ activity.location }}</h3>
                      <p>{{ activity.date }}</p>
                    </div>
                  </transition>
                  <button :class="['info-mobile', className(activity.type, '-info')]"
                    @click="toggleActivityInfo(index)">{{
                      isExpanded(index) ? '−info' : '+info' }}</button>
                </div>
                <div class="logos-mobile">
                  <img v-for="(logo, i) in activity.logos" :key="i" :src="logo"
                    :class="['logo', className(activity.type, '-logo')]" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="filteredActivities.length == 0" class="no-events">NO EVENTS</div>
        </section>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';

const isMobile = ref(false);
const tabWidth = ref(250);
const tabsStyle = ref({ transform: 'translateX(0)' });

const activeDay = ref(0);
const expandedEvent = ref(null);
const showEletrolinkInfo = ref(false);
const loading = ref(true);

const db_activities = ref([{
  id: null,
  external_id: null,
  title: null,
  description: null,
  day: null,
  dayOfWeek: null,
  date: null,
  time: null,
  end_time: null,
  type: null,
  location: null,
  logos: null,
}]);

const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
const event_days = ["2025-05-05", "2025-05-06", "2025-05-07", "2025-05-08", "2025-05-09"];
const eletrolink_description = "Eletrolink Description, up to coordination :) Eletrolink Description, up to coordination :) Eletrolink Description, up to coordination :) Eletrolink Description, up to coordination :)";

const filteredActivities = computed(() => {
  const selectedDay = days[activeDay.value];
  return db_activities.value.filter(activity => 
    activity.dayOfWeek === selectedDay && 
    activity.type.toLowerCase() !== "eletrolink"
  );
});

const filteredEletrocomps = computed(() => {
  const selectedDay = days[activeDay.value];
  return db_activities.value.filter(eletrocomp =>
    eletrocomp.dayOfWeek === selectedDay && eletrocomp.type.toLowerCase() === "eletrolink"
  );
});

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 800;
  scrollToTab(activeDay.value);
}

// Scroll para a tab ativa
function scrollToTab(index) {
  if (!isMobile.value) return;

  const containerWidth = window.innerWidth;
  const tabCenterPosition = (index * tabWidth.value) + (tabWidth.value / 2);
  const containerCenter = containerWidth / 2;
  const offset = containerCenter - tabCenterPosition + index * 42;

  tabsStyle.value = {
    transform: `translateX(${offset}px)`,
    transition: 'transform 0.3s ease-in-out'
  };
}

function scrollPrev() {
  if (activeDay.value > 0) {
    setActiveDay(activeDay.value - 1);
  }
}

function scrollNext() {
  if (activeDay.value < days.length - 1) {
    setActiveDay(activeDay.value + 1);
  }
}

// Mudar o dia ativo
function setActiveDay(index) {
  activeDay.value = index;
  expandedEvent.value = null;
  showEletrolinkInfo.value = false;
  db_activities.value = []; // Limpa atividades
  scrollToTab(index);
}

// Dia atual como padrão
function setDefaultDay() {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const index = event_days.findIndex(day => day === todayString);
  activeDay.value = index !== -1 ? index : 0;
}

// Expandir evento
function toggleActivityInfo(index) {
  expandedEvent.value = expandedEvent.value === index ? null : index;
}

function isExpanded(index) {
  return expandedEvent.value === index;
}

// Mostrar/esconder info eletrolink
function toggleEletrolinkInfo() {
  showEletrolinkInfo.value = !showEletrolinkInfo.value;
}

function cleanTitle(title) {
  return title.replace(/\s+/g, '-')
              .replace(/\//g, '-')
              .replace(/[^a-zA-Z0-9-]/g, '')
              .toLowerCase();
}

function className(title, suffix = '') {
  return `activity-${cleanTitle(title)}${suffix}`;
}

function parseTime(timeString) {
  const [hours, minutes] = timeString.replace('h', ':').split(':').map(Number);
  return hours * 60 + minutes;
}

function hasGap(index) {
  if (index === 0) return false;

  const previousEndTime = filteredActivities.value[index - 1].end_time;
  const currentStartTime = filteredActivities.value[index].time;

  if (!previousEndTime || !currentStartTime) return false;

  const previousEndMinutes = parseTime(previousEndTime);
  const currentStartMinutes = parseTime(currentStartTime);

  return (currentStartMinutes - previousEndMinutes) > 90;
}

function formatActivityDate(day, startTime, endTime) {
  const date = new Date(day);
  const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
  const dayNum = date.getDate();
  return `${month} ${dayNum} | ${startTime.slice(-12, -7).replace(':', 'h')} - ${endTime.slice(-12, -7).replace(':', 'h')}`;
}

let currentRequest = null;

async function fetchData() {
  loading.value = true;

  try {
    if (currentRequest) {
      currentRequest.cancel();
    }
    currentRequest = axios.CancelToken.source();

    const [response] = await Promise.all([
      axios.get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/get_activity_by_day', {
        params: {
          day: event_days[activeDay.value],
          event_id: '',
        },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
        },
        cancelToken: currentRequest.token
      }),
      new Promise(resolve => setTimeout(resolve, 200))
    ]);

    const data = response.data;
    db_activities.value = data.other_activities.map(activity => ({
      id: activity.id,
      external_id: activity.external_id,
      title: activity.name,
      description: activity.description,
      day: activity.day,
      dayOfWeek: new Date(activity.day).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
      date: formatActivityDate(activity.day, activity.time, activity.end_time),
      time: activity.time.slice(-12, -7).replace(':', 'h'),
      end_time: activity.end_time.slice(-12, -7).replace(':', 'h'),
      type: activity.activity_type.name,
      location: activity.activity_type.location,
      logos: ["src/images.png"],
    }));

  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  } finally {
    loading.value = false;
  }
}

watch(activeDay, () => {
  fetchData();
});

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);

  setTimeout(() => {
    scrollToTab(activeDay.value);
  }, 100);

  setDefaultDay();
  fetchData();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});
</script>


<style scoped>
/*
  USEM AS VARIÁVEIS, NOMEADAMENTE A --acc-color
  quase nunca deve ser preciso por o código da cor à mão
  todas as cores que vamos precisar estão definidas no global.css

  assim temos consistência no site inteiro e caso marketing
  se lembre de mudar a palete outra vez, é só alterar na variável
*/
.view {
  padding-top: var(--header-height);
  --acc-color: var(--c-acc-strong-pink)
}

h1 {
  text-align: center;
  text-shadow: 0px 0px 15px var(--acc-color);
  margin: 2rem auto;
  position: relative;
  width: min-content;
}

.tabs {
  position: relative;
  display: flex;
  justify-content: center;
  overflow: auto;
  gap: 10px;
  padding: 20px;
  width: 100%;
  top: -10px;
}

.tab {
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
  letter-spacing: 0.1em;
  overflow: auto;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  position: relative;
  cursor: pointer;
  width: 200px;
  transition: all 0.3s ease-in-out;
}

.tab:nth-child(1) {
  --tab-color: var(--c-acc-lighter-dark-blue);
}

.tab:nth-child(2) {
  --tab-color: var(--c-acc-violet);
}

.tab:nth-child(3) {
  --tab-color: var(--c-acc-strong-pink);
}

.tab:nth-child(4) {
  --tab-color: var(--c-acc-orange);
}

.tab:nth-child(5) {
  --tab-color: var(--c-acc-yellow);
}

.tab::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-50%);
  transition: opacity 0.1s ease-in-out;
  opacity: 0.3;
  background: radial-gradient(ellipse at top center, var(--tab-color) 10%, rgba(255, 255, 255, 0) 75%);
  z-index: -3;
}

.tab.active {
  opacity: 1;
  transform: scale(1.06);
}

.tab:hover::before {
  opacity: 0.5;
}

.tab.active::before {
  opacity: 0.5;
}

.tab:first-child {
  border-radius: 20px 0 0 0;
}

.tab:last-child {
  border-radius: 0 20px 0 0;
}

.tab:not(:first-child):not(:last-child) {
  border-radius: 0;
}

/* Cores dos dias da semana */
.tab:nth-child(1) {
  border-top: 2px solid var(--c-acc-lighter-dark-blue);
}

.tab:nth-child(2) {
  border-top: 2px solid var(--c-acc-violet);
}

.tab:nth-child(3) {
  border-top: 2px solid var(--c-acc-strong-pink);
}

.tab:nth-child(4) {
  border-top: 2px solid var(--c-acc-orange);
}

.tab:nth-child(5) {
  border-top: 2px solid var(--c-acc-yellow);
}

.timeline {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  max-width: 1100px;
  margin: auto;
  gap: 40px;
  min-height: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
}

.fixed-line {
  position: absolute;
  left: 23%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: white;
  border-radius: 2px;
  height: auto;
}

.line {
  position: relative;
  top: 0;
  bottom: 0;
  width: 2px;
  background: white;
  border-radius: 2px;
  height: auto;
}

.activity {
  display: flex;
  align-content: space-around;
  justify-items: center;
  position: relative;
  width: 100%;
  padding: 0 5% 0 5%;
}

.time {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 20%;
}

.start {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}

.start-time {
  position: relative;
  text-align: right;
  top: -10px;
  color: white;
  font-weight: bold;
}

.end {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}

.end-time {
  text-align: right;
  position: relative;
  bottom: -10px;
  color: white;
  font-weight: bold;
}

.circle-start,
.circle-end {
  position: relative;
  width: 21px;
  height: 21px;
  right: -11.5px;
  background: white;
  border-radius: 50%;
  border: 2px solid white;
}

.circle-start {
  position: relative;
  top: -10px;
}

.circle-end {
  position: relative;
  bottom: -10px;
}

.content {
  border-radius: 0px 70px 70px 10px;
  display: flex;
  justify-content: space-between;
  width: 65%;
  align-items: flex-start;
  position: relative;
  border: 2px solid;
  margin-left: 30px;
  padding: 5px;
  background: rgba(25, 156, 255, 0.1);
  border: 2px solid var(--c-acc-blue);
}

.activity-inside-talks {
  /*pink*/
  background: rgba(255, 0, 110, 0.1);
  border: 2px solid var(--c-acc-strong-pink);
}

.activity-15-15 {
  /*violet*/
  background: rgba(114, 9, 183, 0.1);
  border: 2px solid var(--c-acc-violet);
}

.activity-discussion-panel {
  /*blue*/
  background: rgba(21, 0, 177, 0.1);
  border: 2px solid var(--c-acc-blue);
}

.activity-main-speaker {
  /*yellow*/
  background: rgba(255, 190, 11, 0.1);
  border: 2px solid var(--c-acc-yellow);
}

.activity-workshop {
  /*orange*/
  background: rgba(251, 86, 7, 0.1);
  border: 2px solid var(--c-acc-orange);
}

.activity-opening-ceremony {
  /*dark-blue*/
  background: rgba(46, 85, 255, 0.2);
  border: 2px solid var(--c-acc-lighter-dark-blue);
}

.activity-ceremony {
  /*lighter-dark-blue*/
  background: rgba(46, 85, 255, 0.2);
  border: 2px solid var(--c-acc-lighter-dark-blue);
}

.activity-alumni-talks {
  /*purple-blue*/
  background: rgba(96, 94, 208, 0.2);
  border: 2px solid var(--c-acc-purple-blue);
}

.activity-fast-meetings {
  /*pink*/
  background: rgba(255, 0, 110, 0.1);
  border: 2px solid var(--c-acc-strong-pink);
}

.activity-sunset {
  /*yellow*/
  background: rgba(255, 190, 11, 0.1);
  border: 2px solid var(--c-acc-yellow);
}

.activity-leec {
  /*violet*/
  background: rgba(114, 9, 183, 0.1);
  border: 2px solid var(--c-acc-violet);
}

.activity-tech-visit {
  /*orange*/
  background: rgba(251, 86, 7, 0.1);
  border: 2px solid var(--c-acc-orange);
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: space-between;
  padding: 10px 15px 5px 15px;
}

.type {
  display: flex;
  gap: 10px;
  font-weight: bold;
  font-size: 1.4rem;
  color: var(--c-acc-blue);
}

.activity-inside-talks-type {
  /*pink*/
  color: var(--c-acc-strong-pink);
}

.activity-15-15-type {
  /*violet*/
  color: var(--c-acc-violet);
}

.activity-discussion-panel-type {
  /*blue*/
  color: var(--c-acc-blue);
}

.activity-main-speaker-type {
  /*yellow*/
  color: var(--c-acc-yellow);
}

.activity-workshop-type {
  color: var(--c-acc-orange);
  /* Amarelo */
}

.activity-opening-ceremony-type {
  color: var(--c-acc-lighter-dark-blue);
  /* Verde */
}

.activity-ceremony-type {
  /*lighter-dark-blue*/
  color: var(--c-acc-lighter-dark-blue);
}

.activity-alumni-talks-type {
  /*purple-blue*/
  color: var(--c-acc-purple-blue);
}

.activity-fast-meetings-type {
  /*pink*/
  color: var(--c-acc-strong-pink);
}

.activity-sunset-type {
  /*yellow*/
  color: var(--c-acc-yellow);
}

.activity-leec-type {
  /*violet*/
  color: var(--c-acc-violet);
}

.activity-tech-visit-type {
  /*orange*/
  color: var(--c-acc-orange);
}

.title {
  font-size: 1.3em;
  color: white;
  letter-spacing: 0.1em;
}

.info {
  background: none;
  color: var(--c-acc-blue);
  border: none;
  border-radius: 5px;
  align-self: flex-start;
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline;
  font-weight: 300;
}

.activity-inside-talks-info {
  color: var(--c-acc-strong-pink);
}

.activity-15-15-info {
  color: var(--c-acc-violet);
}

.activity-panel-info {
  color: var(--c-acc-blue);
}

.activity-main-speaker-info {
  color: var(--c-acc-yellow);
}

.activity-workshop-info {
  color: var(--c-acc-orange);
}

.activity-opening-ceremony-info {
  color: var(--c-acc-lighter-dark-blue);
}

.activity-ceremony-info {
  color: var(--c-acc-lighter-dark-blue);
}

.activity-alumni-talks-info {
  color: var(--c-acc-purple-blue);
}

.activity-fast-meetings-info {
  color: var(--c-acc-strong-pink);
}

.activity-sunset-info {
  color: var(--c-acc-yellow);
}

.activity-leec-info {
  color: var(--c-acc-violet);
}

.activity-tech-visit-info {
  color: var(--c-acc-orange);
}

.icon {
  font-size: 1em;
}

.logos {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  width: 130px;
  height: 130px;
  border-radius: 50%;
}

.logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--c-acc-blue);
}

.activity-inside-talks-logo {
  border: 2px solid var(--c-acc-strong-pink);
}

.activity-15-15-logo {
  border: 2px solid var(--c-acc-violet);
}

.activity-panel-logo {
  border: 2px solid var(--c-acc-blue);
}

.activity-main-speaker-logo {
  border: 2px solid var(--c-acc-yellow);
}

.activity-workshop-logo {
  border: 2px solid var(--c-acc-orange);
}

.activity-opening-ceremony-logo {
  border: 2px solid var(--c-acc-lighter-dark-blue);
}

.activity-ceremony-logo {
  border: 2px solid var(--c-acc-lighter-dark-blue);
}

.activity-alumni-talks-logo {
  border: 2px solid var(--c-acc-purple-blue);
}

.activity-fast-meetings-logo {
  border: 2px solid var(--c-acc-strong-pink);
}

.activity-sunset-logo {
  border: 2px solid var(--c-acc-yellow);
}

.activity-leec-logo {
  border: 2px solid var(--c-acc-violet);
}

.activity-tech-visit-logo {
  border: 2px solid var(--c-acc-orange);
}

.expanded-info p {
  font-weight: 300;
  letter-spacing: 0.05rem;
  font-size: 0.8rem;
}

.expanded-info h3 {
  font-weight: 400;
  letter-spacing: 0.1rem;
  font-size: 1rem;
}

.act_description {
  margin-top: 10px;
  margin-bottom: 10px;
}

.no-events {
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}


.eletrolink {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  padding: 20px;
}

.box {
  display: flex;
  flex-direction: column;
  padding: 12px 20px 10px;
  height: 100%;
  max-width: min(95%, 600px);
  min-width: 300px;
  background: solid;
  background-color: rgba(255, 190, 11, 0.1);
  border-radius: 10px;
  border: 2px solid rgba(255, 190, 11, 1);
  gap: 5px;
}

.eletrolink h3 {
  color: var(--c-acc-yellow);
  /* Laranja */
  font-size: 1.4em;
  letter-spacing: 0.05em;
  font-weight: bold;
}

.eletrolink p {
  color: white;
  letter-spacing: 0.1em;
}

.eletrolink button {
  color: var(--c-acc-yellow);
}

.eletrolink-description {
  font-size: 0.8em;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 10px;
}

.eletrolink-content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
}

.eletrolink-grid-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
}

.eletrocomp-title p {
  font-size: 1.3em;
}

.eletrocomp-location p {
  font-size: 1em;
  font-weight: 300;
}

.eletrocomp-time p {
  font-size: 0.8em;
  font-weight: 300;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  width: 100%;
  height: 100%;
}

.eletrocomp {
  overflow: hidden;
  flex: 1;
  padding: 10px;
  background: solid;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 130px;
  flex-shrink: 0;
  height: 60px;
}

.eletrocomp img {
  width: 80%;
  height: auto;
  object-fit: contain;
}

.no-companies {
  color: white;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

.eletrolink-toggle-enter-active,
.eletrolink-toggle-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}

.eletrolink-toggle-enter-from,
.eletrolink-toggle-leave-to {
  opacity: 0;
  max-height: 0;
  max-width: 0;
  transform: scale(0.90, 0.90);
  /* Afeta X e Y */
}

.eletrolink-toggle-enter-to,
.eletrolink-toggle-leave-from {
  opacity: 1;
  max-height: 500px;
  max-width: 600px;
  transform: scale(1, 1);
  /* Escala normal */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.expand-fade-enter-active,
.expand-fade-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.expand-fade-enter-from,
.expand-fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0.95);
}

.expand-fade-enter-to,
.expand-fade-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: scaleY(1);
}

.no-companies-fade-enter-active,
.no-companies-fade-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.no-companies-fade-enter-from,
.no-companies-fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0.95);
}

.no-companies-fade-enter-to,
.no-companies-fade-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: scaleY(1);
}


/* Estilos para o carrossel mobile */
.mobile .tabs-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
  /* Espaço para os botões de navegação */
}

.mobile .tabs-wrapper {
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}

.mobile .tabs {
  display: flex;
  width: max-content;
  gap: 10px;
  will-change: transform;
}

.mobile .tab {
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
  letter-spacing: 0.1em;
  overflow: auto;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  position: relative;
  cursor: pointer;
  width: 200px;
  transition: all 0.3s ease-in-out;
  opacity: 0.7;
  transform: scale(0.9);
}

.mobile .tab.active {
  opacity: 1;
  transform: scale(1);
}

.mobile .nav-button {
  display: none;
  /* Remove completamente do layout */
}

.mobile .nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.mobile .nav-button.prev {
  left: 10px;
}

.mobile .nav-button.next {
  right: 10px;
}

/* Estilos específicos para mobile */
.mobile .timeline-mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  gap: 25px;
  min-height: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 0 6vw;
  /* Padding relativo à largura da tela */

}

.mobile .line-mobile {
  position: relative;
  width: 2px;
  background: white;
  border-radius: 2px;
  height: auto;
}

.mobile .fixed-line {
  position: absolute;
  left: 6vw;
  top: 0;
  bottom: 0;
  width: 2px;
  background: white;
  border-radius: 2px;
  height: auto;
}

.mobile .act-column {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  width: 100%;
}

.mobile .activity-mobile {
  display: flex;
  width: 100%;
  position: relative;
  padding-right: 10px;
}

.mobile .circle-start-mobile {
  position: relative;
  left: -19px;
  top: -8px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  border: 2px solid white;
}

.mobile .circle-end-mobile {
  position: relative;
  width: 12px;
  height: 12px;
  left: -5px;
  background: white;
  border-radius: 50%;
  border: 2px solid white;
}

.mobile .start-time-mobile {
  position: relative;
  text-align: right;
  top: -10px;
  right: 10px;
  color: white;
  font-weight: bold;
}

.mobile .start-mobile {
  display: flex;
  gap: 5px;
}

.mobile .content-mobile {
  border-radius: 0px 50px 50px 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
  position: relative;
  border: 2px solid;
  margin-left: 10px;
  top: -5px;
  padding: 5px;
  background: rgba(25, 156, 255, 0.1);
  border: 2px solid var(--c-acc-blue);
}

.mobile .activity-inside-talks {
  /*pink*/
  background: rgba(255, 0, 110, 0.1);
  border: 2px solid var(--c-acc-strong-pink);
}

.mobile .activity-15-15 {
  /*violet*/
  background: rgba(114, 9, 183, 0.1);
  border: 2px solid var(--c-acc-violet);
}

.mobile .activity-discussion-panel {
  /*blue*/
  background: rgba(21, 0, 177, 0.1);
  border: 2px solid var(--c-acc-blue);
}

.mobile .activity-main-speaker {
  /*yellow*/
  background: rgba(255, 190, 11, 0.1);
  border: 2px solid var(--c-acc-yellow);
}

.mobile .activity-workshop {
  /*orange*/
  background: rgba(251, 86, 7, 0.1);
  border: 2px solid var(--c-acc-orange);
}

.mobile .activity-opening-ceremony {
  /*dark-blue*/
  background: rgba(46, 85, 255, 0.2);
  border: 2px solid var(--c-acc-lighter-dark-blue);
}

.mobile .activity-ceremony {
  /*lighter-dark-blue*/
  background: rgba(46, 85, 255, 0.2);
  border: 2px solid var(--c-acc-lighter-dark-blue);
}

.mobile .activity-alumni-talks {
  /*purple-blue*/
  background: rgba(96, 94, 208, 0.2);
  border: 2px solid var(--c-acc-purple-blue);
}

.mobile .activity-fast-meetings {
  /*pink*/
  background: rgba(255, 0, 110, 0.1);
  border: 2px solid var(--c-acc-strong-pink);
}

.mobile .activity-sunset {
  /*yellow*/
  background: rgba(255, 190, 11, 0.1);
  border: 2px solid var(--c-acc-yellow);
}

.mobile .activity-leec {
  /*violet*/
  background: rgba(114, 9, 183, 0.1);
  border: 2px solid var(--c-acc-violet);
}

.mobile .activity-tech-visit {
  /*orange*/
  background: rgba(251, 86, 7, 0.1);
  border: 2px solid var(--c-acc-orange);
}

.mobile .logos-mobile {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.mobile .column-mobile {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  align-items: flex-start;
  padding: 5px 5px 5px 10px;
  width: calc(100% - 70px);
  /* Ajuste para o logo */
}

.mobile .type {
  font-size: 1rem;
}

.mobile .title {
  font-size: 0.9rem;
}

.mobile .info-mobile {
  background: none;
  color: var(--c-acc-blue);
  border: none;
  border-radius: 5px;
  align-self: flex-start;
  cursor: pointer;
  font-size: 10px;
  text-decoration: underline;
  font-weight: 300;
}

.mobile .activity-inside-talks-info {
  color: var(--c-acc-strong-pink);
}

.mobile .activity-15-15-info {
  color: var(--c-acc-violet);
}

.mobile .activity-panel-info {
  color: var(--c-acc-blue);
}

.mobile .activity-main-speaker-info {
  color: var(--c-acc-yellow);
}

.mobile .activity-workshop-info {
  color: var(--c-acc-orange);
}

.mobile .activity-opening-ceremony-info {
  color: var(--c-acc-lighter-dark-blue);
}

.mobile .activity-ceremony-info {
  color: var(--c-acc-lighter-dark-blue);
}

.mobile .activity-alumni-talks-info {
  color: var(--c-acc-purple-blue);
}

.mobile .activity-fast-meetings-info {
  color: var(--c-acc-strong-pink);
}

.mobile .activity-sunset-info {
  color: var(--c-acc-yellow);
}

.mobile .activity-leec-info {
  color: var(--c-acc-violet);
}

.mobile .activity-tech-visit-info {
  color: var(--c-acc-orange);
}

.mobile .expanded-info p {
  font-size: 0.7rem;
}

.mobile .expanded-info h3 {
  font-size: 0.7rem;
}

.mobile .act_description {
  margin: 5px 0;
}

.mobile .no-events {
  font-size: 4.5vw;
  margin-top: 5vw;
}

.gap {
  height: 50px;
}

.teste{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
