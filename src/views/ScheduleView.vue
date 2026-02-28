<template>
  <div class="desktop" v-if="!isMobile">
    <div class="view">
      <section>
        <h1>Schedule</h1>
      </section>
      <TabsSelection :tabs="days" :activeTab="activeDay" @tab="setActiveDay"></TabsSelection>
      <transition name="fade" mode="out-in">
        <section class="eletrolink" :key="activeDay" v-if="!loading">
          <div class="box">
            <h3>Eletrolink <img :src="eletrolinkIcon" alt="Eletrolink Icon" class="eletrolink-icon" /></h3>
            <div class="eletrolink-description" v-if="showEletrolinkInfo">
              {{ eletrolink_description }}
            </div>
            <p>Today's companies:</p>
            <template v-if="filteredEletrocomps.length">
              <transition name="eletrolink-toggle">
                <div v-if="!showEletrolinkInfo" class="row">
                  <div v-for="(eletrocomp, index) in filteredEletrocomps" :key="index" class="eletrocomp">
                    <img :src="eletrocomp.logo_companies" alt="Eletrocomp Logo" />
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
                      <img :src="eletrocomp.logo_companies" alt="Eletrocomp Logo" />
                    </div>
                    <div class="eletrocomp-text">
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
              {{ showEletrolinkInfo ? '-info' : '+info' }}
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
                  <button :class="['info', className(activity.type, '-info')]"
                    @click="toggleActivityInfo(index)">{{
                      isExpanded(index) ? '−info' : '+info' }}</button>
                </div>
                <div class="logos">
                  <div v-if="activity?.speakers?.length > 0" class="logo-container company-logo-container"
                    :class="className(activity.type, '-logo')">
                    <transition name="logo-fade" mode="out-in">
                      <img v-if="activity?.speakers?.[currentLogoIndex?.[activity.id] ?? 0]?.logo_company"
                        :key="'company-' + (currentLogoIndex?.[activity.id] ?? 0)"
                        :src="activity.speakers[currentLogoIndex[activity.id] ?? 0].logo_company" class="logo-image" />
                    </transition>
                  </div>

                  <div class="logo-container speaker-logo-container" :class="className(activity.type, '-logo')">
                    <transition name="logo-fade" mode="out-in">
                      <template v-if="activity?.speakers?.length > 0">
                        <img v-if="activity.speakers[currentLogoIndex?.[activity.id] ?? 0]?.logo_speaker"
                          :key="'speaker-' + (currentLogoIndex?.[activity.id] ?? 0)"
                          :src="activity.speakers[currentLogoIndex[activity.id] ?? 0].logo_speaker"
                          class="logo-image" />
                      </template>
                      <template v-else-if="activity?.logo_companies?.length > 0">
                        <img v-if="activity.logo_companies[currentLogoIndex?.[activity.id] ?? 0]"
                          :key="'company-' + (currentLogoIndex?.[activity.id] ?? 0)"
                          :src="activity.logo_companies[currentLogoIndex[activity.id] ?? 0]" class="logo-image" />
                      </template>
                      <template v-else>
                        <div class="logo-default"></div>
                      </template>
                    </transition>
                  </div>
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
      <TabsSelection style="width: 100%;" :tabs="days" :activeTab="activeDay" @tab="setActiveDay"></TabsSelection>
      <transition name="fade" mode="out-in">
        <section class="eletrolink" :key="activeDay" v-if="!loading">
          <div class="box">
            <h3>Eletrolink <img :src="eletrolinkIcon" alt="Eletrolink Icon" class="eletrolink-icon" /></h3>
            <div class="eletrolink-description" v-if="showEletrolinkInfo">
              {{ eletrolink_description }}
            </div>
            <p>Today's companies:</p>
            <template v-if="filteredEletrocomps.length">
              <transition name="eletrolink-toggle">
                <div v-if="!showEletrolinkInfo" class="row">
                  <div v-for="(eletrocomp, index) in filteredEletrocomps.slice(0, 2)" :key="index" class="eletrocomp">
                    <img :src="eletrocomp.logo_companies" alt="Eletrocomp Logo" />
                  </div>
                  <div v-if="filteredEletrocomps.length > 2" class="eletrocomp more-indicator">
                    +{{ filteredEletrocomps.length - 2 }} more
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
                      <img :src="eletrocomp.logo_companies" alt="Eletrocomp Logo" />
                    </div>
                    <div class="eletrocomp-text">
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
              {{ showEletrolinkInfo ? '-info' : '+info' }}
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
                  <!-- Container para company logo (só aparece se existir speaker) -->
                  <div v-if="activity?.speakers.length > 0" class="logo-container company-logo-container"
                    :class="className(activity.type, '-logo')">
                    <transition name="logo-fade" mode="out-in">
                      <img v-if="activity?.speakers?.[currentLogoIndex?.[activity.id] ?? 0]?.logo_company"
                        :key="'company-' + (currentLogoIndex?.[activity.id] ?? 0)"
                        :src="activity.speakers[currentLogoIndex[activity.id] ?? 0].logo_company" class="logo-image" />
                    </transition>
                  </div>
                  <!-- Container principal para speaker logo ou fallbacks -->
                  <div class="logo-container speaker-logo-container" :class="className(activity.type, '-logo')">
                    <transition name="logo-fade" mode="out-in">
                      <!-- 1. Prioridade: logos_speakers -->
                      <template v-if="activity?.speakers?.length > 0">
                        <img v-if="activity.speakers[currentLogoIndex?.[activity.id] ?? 0]?.logo_speaker"
                          :key="'speaker-' + (currentLogoIndex?.[activity.id] ?? 0)"
                          :src="activity.speakers[currentLogoIndex[activity.id] ?? 0].logo_speaker"
                          class="logo-image" />
                      </template>
                      <template v-else-if="activity?.logo_companies?.length > 0">
                        <img v-if="activity.logo_companies[currentLogoIndex?.[activity.id] ?? 0]"
                          :key="'company-' + (currentLogoIndex?.[activity.id] ?? 0)"
                          :src="activity.logo_companies[currentLogoIndex[activity.id] ?? 0]" class="logo-image" />
                      </template>
                      <template v-else>
                        <div class="logo-default"></div>
                      </template>
                    </transition>
                  </div>
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
import TabsSelection from '@/components/TabsSelection.vue'
import axios from 'axios';

const isMobile = ref(false);
const tabWidth = ref(250);
const tabsStyle = ref({ transform: 'translateX(0)' });
const base_path = ref(null);

const activeDay = ref(0);
const expandedEvent = ref(null);
const showEletrolinkInfo = ref(false);
const loading = ref(false);
const currentLogoIndex = ref({});
let globalInterval = null;

const db_activities = ref([
  {
    id: null,
    title: null,
    description: null,
    dayOfWeek: null,
    date: null,
    time: null,
    end_time: null,
    type: null,
    location: null,
    logo_companies: null,
    speakers: null,
  }
]);

const days = ["MONDAY", "TUESDAY", "WEDNESDAY"];
const event_days = ["2026-03-02", "2026-03-03", "2026-03-04"];
const eletrolink_description = "A new, exciting booth where students can engage in 1-on-1 conversations with companies and potentially find their next job or internship.";

const filteredActivities = computed(() => {
  const selectedDay = days[activeDay.value];
  return db_activities.value.filter(activity =>
    activity.dayOfWeek === selectedDay &&
    activity.type.toLowerCase() !== "eletrolink" &&
    activity.type.toLowerCase() !== "job fair"
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
    base_path.value = import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL.replace('/website', '');
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
      speakers: activity.speakers?.map(speaker => ({
        ...speaker,
        logo_speaker: speaker.logo_speaker || null,
        logo_company: speaker.logo_company || null
      })) || [],
      logo_companies: activity.companies || []
    }));
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  } finally {
    loading.value = false;
  }
}

function rotateAllLogos() {
  const activities = filteredActivities.value;
  activities.forEach(activity => {

    const hasMultipleCompanyLogos = activity.logo_companies && activity.logo_companies.length > 1;
    const hasMultipleSpeakers = activity.speakers && activity.speakers.length > 1;

    if (hasMultipleCompanyLogos || hasMultipleSpeakers) {
      if (currentLogoIndex.value[activity.id] === undefined) {
        currentLogoIndex.value[activity.id] = 0;
      } else {
        const maxLength = hasMultipleCompanyLogos ? activity.logo_companies.length : activity.speakers.length;

        currentLogoIndex.value[activity.id] =
          (currentLogoIndex.value[activity.id] + 1) % maxLength;
      }
    }
  });
}

watch(filteredActivities, (newActivities) => {
  // Limpar intervalo existente
  if (globalInterval) {
    clearInterval(globalInterval);
    globalInterval = null;
  }

  // Resetar índices
  currentLogoIndex.value = {};

  // Verificar se há atividades com múltiplos logos
  const hasMultipleLogos = newActivities.some(
    activity => activity.logo_companies && activity.logo_companies.length > 1 ||
      (activity.speakers && activity.speakers.length > 1)
  );

  // Iniciar intervalo global se necessário
  if (hasMultipleLogos) {
    globalInterval = setInterval(rotateAllLogos, 3000);

    // Inicializar todos os índices
    newActivities.forEach(activity => {
      if ((activity.logo_companies && activity.logo_companies.length > 1) ||
        (activity.speakers && activity.speakers.length > 1)) {
        currentLogoIndex.value[activity.id] = 0;
      }
    });
  }
}, { deep: true });

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);

  setTimeout(() => {
    scrollToTab(activeDay.value);
  }, 100);

  globalInterval = setInterval(rotateAllLogos, 3000);

  setDefaultDay();
  fetchData();

});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);

  if (globalInterval) {
    clearInterval(globalInterval);
  }
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
  --acc-color: var(--j26-pink);
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
  --tab-color: var(--j26-light-blue);
}

.tab:nth-child(2) {
  --tab-color: var(--j26-violet);
}

.tab:nth-child(3) {
  --tab-color: var(--j26-pink);
}

.tab:nth-child(4) {
  --tab-color: var(--j26-orange);
}

.tab:nth-child(5) {
  --tab-color: var(--j26-green);
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
  border-top: 2px solid var(--j26-light-blue);
}

.tab:nth-child(2) {
  border-top: 2px solid var(--j26-violet);
}

.tab:nth-child(3) {
  border-top: 2px solid var(--j26-pink);
}

.tab:nth-child(4) {
  border-top: 2px solid var(--j26-orange);
}

.tab:nth-child(5) {
  border-top: 2px solid var(--j26-green);
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
  background: color-mix(in srgb, var(--j26-blue) 10%, transparent);
  border: 2px solid var(--j26-blue);
}

.activity-inside-talks {
  background: color-mix(in srgb, var(--j26-violet) 10%, transparent);
  border: 2px solid var(--j26-violet);
}

.activity-15-15 {
  background: color-mix(in srgb, var(--j26-light-pink) 10%, transparent);
  border: 2px solid var(--j26-light-pink);
}

.activity-discussion-panel {
  background: color-mix(in srgb, var(--j26-blue) 10%, transparent);
  border: 2px solid var(--j26-blue);
}

.activity-keynote-speaker {
  background: color-mix(in srgb, var(--j26-blue) 10%, transparent);
  border: 2px solid var(--j26-blue);
}

.activity-workshop {
  background: color-mix(in srgb, var(--j26-green) 10%, transparent);
  border: 2px solid var(--j26-green);
}

.activity-opening-ceremony {
  background: color-mix(in srgb, var(--j26-light-blue) 20%, transparent);
  border: 2px solid var(--j26-light-blue);
}

.activity-ceremony {
  background: color-mix(in srgb, var(--j26-light-blue) 20%, transparent);
  border: 2px solid var(--j26-light-blue);
}

.activity-alumni-talks {
  background: color-mix(in srgb, var(--j26-violet) 20%, transparent);
  border: 2px solid var(--j26-violet);
}

.activity-fast-meetings {
  background: color-mix(in srgb, var(--j26-pink) 10%, transparent);
  border: 2px solid var(--j26-pink);
}

.activity-sunset {
  background: color-mix(in srgb, var(--j26-orange) 10%, transparent);
  border: 2px solid var(--j26-orange);
}

.activity-leec {
  background: color-mix(in srgb, var(--j26-violet) 10%, transparent);
  border: 2px solid var(--j26-violet);
}

.activity-tech-visit {
  background: color-mix(in srgb, var(--j26-orange) 10%, transparent);
  border: 2px solid var(--j26-orange);
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
  color: var(--j26-blue);
}

.activity-inside-talks-type {
  color: var(--j26-violet);
}

.activity-15-15-type {
  color: var(--j26-light-pink);
}

.activity-discussion-panel-type {
  color: var(--j26-blue);
}

.activity-keynote-speaker-type {
  color: var(--j26-blue);
}

.activity-workshop-type {
  color: var(--j26-green);
}

.activity-opening-ceremony-type {
  color: var(--j26-light-blue);
}

.activity-ceremony-type {
  color: var(--j26-light-blue);
}

.activity-alumni-talks-type {
  color: var(--j26-violet);
}

.activity-fast-meetings-type {
  color: var(--j26-pink);
}

.activity-sunset-type {
  color: var(--j26-orange);
}

.activity-leec-type {
  color: var(--j26-violet);
}

.activity-tech-visit-type {
  color: var(--j26-orange);
}

.title {
  font-size: 1.3em;
  color: white;
  letter-spacing: 0.1em;
}

.info {
  background: none;
  color: var(--j26-blue);
  border: none;
  border-radius: 5px;
  align-self: flex-start;
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline;
  font-weight: 300;
}

.activity-inside-talks-info {
  color: var(--j26-violet);
}

.activity-15-15-info {
  color: var(--j26-light-pink);
}

.activity-panel-info {
  color: var(--j26-blue);
}

.activity-keynote-speaker-info {
  color: var(--j26-blue);
}

.activity-workshop-info {
  color: var(--j26-green);
}

.activity-opening-ceremony-info {
  color: var(--j26-light-blue);
}

.activity-ceremony-info {
  color: var(--j26-light-blue);
}

.activity-alumni-talks-info {
  color: var(--j26-violet);
}

.activity-fast-meetings-info {
  color: var(--j26-pink);
}

.activity-sunset-info {
  color: var(--j26-orange);
}

.activity-leec-info {
  color: var(--j26-violet);
}

.activity-tech-visit-info {
  color: var(--j26-orange);
}

.icon {
  font-size: 1em;
}

.logos {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  position: relative;
}

.logo-container {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 2px solid var(--j26-blue);
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
  background-color: whitesmoke;
  object-fit: contain;
  display: block;
}

.logo-default {
  width: 100%;
  height: 100%;
  background-color: var(--j26-blue);
}

.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 0.5s ease;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}

.activity-inside-talks-logo {
  border: 2px solid var(--j26-violet);
}

.activity-15-15-logo {
  border: 2px solid var(--j26-light-pink);
}

.activity-panel-logo {
  border: 2px solid var(--j26-blue);
}

.activity-keynote-speaker-logo {
  border: 2px solid var(--j26-blue);
}

.activity-workshop-logo {
  border: 2px solid var(--j26-green);
}

.activity-opening-ceremony-logo {
  border: 2px solid var(--j26-light-blue);
}

.activity-ceremony-logo {
  border: 2px solid var(--j26-light-blue);
}

.activity-alumni-talks-logo {
  border: 2px solid var(--j26-violet);
}

.activity-fast-meetings-logo {
  border: 2px solid var(--j26-pink);
}

.activity-sunset-logo {
  border: 2px solid var(--j26-orange);
}

.activity-leec-logo {
  border: 2px solid var(--j26-violet);
}

.activity-tech-visit-logo {
  border: 2px solid var(--j26-orange);
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

/* =========================================
   ELETROLINK SECTION (Desktop & General)
========================================= */
.eletrolink {
  width: auto;
  padding: 10px;
  display: flex;
  justify-content: center;
}

.box {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 700px;
  min-width: 300px;
  padding: 15px;
  background: solid;
  background-color: color-mix(in srgb, var(--j26-pink) 10%, transparent);
  border-radius: 10px;
  border: 2px solid var(--j26-pink);
  gap: 5px;
}

.eletrolink h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-schedule);
  color: var(--j26-pink);
  font-size: clamp(1.2rem, 1.5vw + 0.5rem, 1.6rem);
  letter-spacing: 0.05em;
  font-weight: bold;
}

.eletrolink-icon {
  width: clamp(1.3rem, 1.5vw + 0.4rem, 1.4rem);
  height: clamp(1.3rem, 1.5vw + 0.4rem, 1.4rem);
  object-fit: contain;
}

.eletrolink p {
  color: white;
  letter-spacing: 0.1em;
  font-size: clamp(0.75rem, 0.6vw + 0.35rem, 0.95rem);
}

.points-info {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
}

.points-icon {
  width: clamp(1.5rem, 1.5vw + 0.4rem, 1.4rem);
  height: clamp(1.5rem, 1.5vw + 0.4rem, 1.4rem);
  object-fit: contain;
  align-content: center;
}

.eletrolink button {
  color: var(--j26-pink);
  text-align: left;
}

.eletrolink-description {
  font-size: clamp(0.65rem, 0.5vw + 0.3rem, 0.8rem);
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: var(--font-schedule);
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

.eletrolink-signup-btn {
  margin-left: auto;
  font-family: 'Lexend Exa';
  background-color: var(--j26-pink);
  color: white;
  font-size: clamp(0.6rem, 0.6vw + 0.35rem, 0.95rem);
  font-weight: 500;
  padding: 3px 6px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  white-space: nowrap;
}

.eletrolink-signup-btn:hover {
  transform: scale(1.05);
  opacity: 0.85;
}

.eletrocomp-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  width: 50%;
}

.eletrocomp-title p {
  font-size: clamp(0.8rem, 0.8vw + 0.4rem, 1.2rem);
}

.eletrocomp-location p {
  font-size: clamp(0.65rem, 0.6vw + 0.35rem, 0.95rem);
  font-weight: 300;
}

.eletrocomp-time p {
  font-size: clamp(0.55rem, 0.5vw + 0.3rem, 0.8rem);
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
  flex-shrink: 0;
  height: 60px;
}

.eletrocomp img {
  height: 100%;
  max-width: 100%;
}

.no-companies {
  color: white;
  font-size: clamp(0.8rem, 0.6vw + 0.4rem, 1rem);
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  font-family: var(--font-schedule);
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
}

.eletrolink-toggle-enter-to,
.eletrolink-toggle-leave-from {
  opacity: 1;
  max-height: 500px;
  max-width: 600px;
  transform: scale(1, 1);
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

/* =========================================
   MOBILE SECTION
========================================= */
.mobile .tabs-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
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
  background: color-mix(in srgb, var(--j26-blue) 10%, transparent);
  border: 2px solid var(--j26-blue);
}

.mobile .activity-inside-talks {
  background: color-mix(in srgb, var(--j26-violet) 10%, transparent);
  border: 2px solid var(--j26-violet);
}

.mobile .activity-15-15 {
  background: color-mix(in srgb, var(--j26-light-pink) 10%, transparent);
  border: 2px solid var(--j26-light-pink);
}

.mobile .activity-discussion-panel {
  background: color-mix(in srgb, var(--j26-blue) 10%, transparent);
  border: 2px solid var(--j26-blue);
}

.mobile .activity-keynote-speaker {
  background: color-mix(in srgb, var(--j26-blue) 10%, transparent);
  border: 2px solid var(--j26-blue);
}

.mobile .activity-workshop {
  background: color-mix(in srgb, var(--j26-green) 10%, transparent);
  border: 2px solid var(--j26-green);
}

.mobile .activity-opening-ceremony {
  background: color-mix(in srgb, var(--j26-light-blue) 20%, transparent);
  border: 2px solid var(--j26-light-blue);
}

.mobile .activity-ceremony {
  background: color-mix(in srgb, var(--j26-light-blue) 20%, transparent);
  border: 2px solid var(--j26-light-blue);
}

.mobile .activity-alumni-talks {
  background: color-mix(in srgb, var(--j26-violet) 20%, transparent);
  border: 2px solid var(--j26-violet);
}

.mobile .activity-fast-meetings {
  background: color-mix(in srgb, var(--j26-pink) 10%, transparent);
  border: 2px solid var(--j26-pink);
}

.mobile .activity-sunset {
  background: color-mix(in srgb, var(--j26-orange) 10%, transparent);
  border: 2px solid var(--j26-orange);
}

.mobile .activity-leec {
  background: color-mix(in srgb, var(--j26-violet) 10%, transparent);
  border: 2px solid var(--j26-violet);
}

.mobile .activity-tech-visit {
  background: color-mix(in srgb, var(--j26-orange) 10%, transparent);
  border: 2px solid var(--j26-orange);
}

.mobile .logos-mobile {
  display: flex;
  flex-shrink: 0;
}

.mobile .speaker-logo-container {
  width: 100px;
  height: 100px;
}

.mobile .company-logo-container {
  width: 50px;
  height: 50px;
  left: 25px;
  bottom: -55px;
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
}

.mobile .type {
  font-size: 1rem;
}

.mobile .title {
  font-size: 0.9rem;
}

.mobile .info-mobile {
  background: none;
  color: var(--j26-blue);
  border: none;
  border-radius: 5px;
  align-self: flex-start;
  cursor: pointer;
  font-size: 10px;
  text-decoration: underline;
  font-weight: 300;
}

/* Updated Eletrolink Mobile Específicos */
.mobile .eletrocomp.more-indicator {
  color: var(--j26-dark-blue);
  background-color: white;
  font-size: clamp(0.7rem, 1.8vw + 0.3rem, 0.9rem);
  font-weight: bold;
}

.mobile .activity-inside-talks-info {
  color: var(--j26-violet);
}

.mobile .activity-15-15-info {
  color: var(--j26-light-pink);
}

.mobile .activity-panel-info {
  color: var(--j26-blue);
}

.mobile .activity-keynote-speaker-info {
  color: var(--j26-blue);
}

.mobile .activity-workshop-info {
  color: var(--j26-green);
}

.mobile .activity-opening-ceremony-info {
  color: var(--j26-light-blue);
}

.mobile .activity-ceremony-info {
  color: var(--j26-light-blue);
}

.mobile .activity-alumni-talks-info {
  color: var(--j26-violet);
}

.mobile .activity-fast-meetings-info {
  color: var(--j26-pink);
}

.mobile .activity-sunset-info {
  color: var(--j26-orange);
}

.mobile .activity-leec-info {
  color: var(--j26-violet);
}

.mobile .activity-tech-visit-info {
  color: var(--j26-orange);
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

.teste {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* =========================================
   LOADING SCREEN 
========================================= */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: white;
  text-align: center;
  margin-top: 5%;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid var(--j26-pink);
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
