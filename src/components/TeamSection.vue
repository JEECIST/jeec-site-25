<script setup>
import TheHighlightDivider from '@/components/TheHighlightDivider.vue'
import { useSlots, defineProps, onMounted, ref, watchEffect, computed } from 'vue'
import fallbackImg from '@/assets/home/hero_section_temp.png'
import axios from 'axios'

const slots = useSlots()

const props = defineProps({
  team: {
    team: Object,
    default: {
      name: 'Default',
      description: 'Connecting the best students, companies and engineers for over 20 years!',
      members: [],
    },
  },
})

const fetchData = () => {
  axios
    .get(import.meta.env.VITE_APP_JEEC_WEBSITE_BRAIN_URL + '/teams_new', {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })
    .then(() => {
      // Handle the response if needed
    })
}

const sortedMembers = computed(() => {
  return [...props.team.members]
    .map((member) => ({
      ...member,
    }))
    .sort((a, b) => {
      if (a.background === b.background) {
        return a.name.localeCompare(b.name)
      }
      return a.background ? -1 : 1
    })
})

const handleClick = (url) => {
  if (url) {
    window.open(url, '_blank')
  } else {
    window.location.reload()
  }
}

onMounted(() => {
  fetchData()
})

const dropShadowColor = ref('var(--c-ds)')

watchEffect(() => {
  switch (props.team.name) {
    case 'Coordination':
      dropShadowColor.value = 'var(--c-acc-blue)'
      break
    case 'Business':
      dropShadowColor.value = 'var(--c-acc-orange)'
      break
    case 'Speakers':
      dropShadowColor.value = 'var(--c-acc-yellow)'
      break
    case 'Logistics':
      dropShadowColor.value = 'var(--c-acc-dark-blue)'
      break
    case 'WebDev':
      dropShadowColor.value = 'var(--c-acc-lilac)'
      break
    case 'Marketing':
      dropShadowColor.value = 'var(--c-acc-strong-pink)'
      break
    default:
      dropShadowColor.value = 'var(--c-ds)'
  }
})
</script>

<template>
  <section class="team-section">
    <div class="sub-section">
      <TheHighlightDivider :top="true" :dropShadowColor="dropShadowColor" />
      <div class="content" :style="`--acc-color: ${dropShadowColor}`">
        <div class="top-content">
          <slot name="content" v-if="slots.content"></slot>
          <div class="offer" v-else>
            <h3>{{ team.name }}</h3>
            <div class="highlight" />
            <p>{{ team.description }}</p>
          </div>
          <div class="image-wrapper" v-if="slots.image">
            <slot name="image" />
          </div>
          <div class="image-wrapper" v-else>
            <img :src="team.image" />
          </div>
        </div>
        <div class="bottom-content">
          <slot name="bottom" v-if="slots.bottom"></slot>
          <div class="team_members-wrapper" v-else>
            <div class="team_members">
              <div class="member" v-for="member in sortedMembers" :key="member.name"
                :style="member.background ? { '--memberShadowColor': dropShadowColor } : {}">
                <div class="member-img-wrapper" @click="handleClick(member.linkedin)" :style="{
                  '--hoverBg': dropShadowColor,
                  border: member.background ? '3px solid var(--memberShadowColor)' : 'none',
                  boxShadow: member.background ? '0 0 5px var(--memberShadowColor)' : 'none',
                }">
                  <img :src="member.image" :alt="member.name" class="member-img"
                    @error="(e) => (e.target.src = fallbackImg)" />
                  <div class="overlay" />
                  <img v-if="member.linkedin" src="@/assets/team/linkedin.svg" alt="LinkedIn" class="linkedin-icon" />
                </div>
                <p>{{ member.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TheHighlightDivider :bottom="true" :dropShadowColor="dropShadowColor" />
    </div>
  </section>
</template>

<style scoped>
.team-section {
  padding: 5rem 0;
}

.sub-section {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 4rem;
}

.content {
  background-color: var(--c-bg-lighter);
  display: flex;
  flex-direction: column;
  padding: 3rem 10ch;
  z-index: 1;
  width: min(100%, 1700px);
  max-width: 100%;
  gap: 5rem;
}

.content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: inherit;
  z-index: -1;
}

.top-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  gap: 10ch;
  align-items: center;
}

.team-section:nth-child(odd) .top-content {
  flex-direction: row-reverse;
  text-align: right;
}

.team-section:nth-child(even) .top-content {
  flex-direction: row;
  text-align: left;
}

.bottom-content {
  width: 100%;
}

.offer {
  max-width: 40ch;
  flex: 1;
  padding-top: 2rem;
}

.offer h3 {
  padding-bottom: 1rem;
  font-weight: 800;
  font-size: 1.5rem;
}

.highlight {
  width: 100%;
  height: 2px;
  border-radius: 4px;
  background: linear-gradient(to right,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 38%, transparent) 50%,
      var(--acc-color) 100%);
  margin-top: 0.2rem;
  margin-bottom: 1.2rem;
}

.team-section:nth-child(even) .highlight {
  background: linear-gradient(to left,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 38%, transparent) 50%,
      var(--acc-color) 100%);
}

.image-wrapper {
  position: relative;
  flex: 1;
  max-width: 40ch;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.image-wrapper img {
  position: absolute;
  bottom: 0;
  display: block;
  aspect-ratio: 1.6;
  width: 100%;
  height: auto;
  border-radius: 5%;
  object-fit: cover;
}

.team_members-wrapper {
  display: flex;
  justify-content: center;
  padding-inline: 2rem;
  /* match the gap below */
}

.team_members {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* Always 4 per row */
  gap: 2rem;
  /* Adjust if needed */
  width: 100%;
  justify-items: center;
  padding: 0 2rem;
}

.member {
  justify-self: center;
  /* center the individual item in its cell */
  max-width: 150px;
  text-align: center;
}

.member p {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--c-ft-light);
  margin-top: 0.7rem;
}

.member-img-wrapper {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.member-img-wrapper:hover {
  background-color: var(--hoverBg);
}

.member-img {
  border-radius: 50%;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

@media screen and (max-width: 800px) {
  .team_members {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

.linkedin-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 35%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  filter: brightness(0) invert(1);
}

.member-img-wrapper:hover .linkedin-icon {
  opacity: 1;
}

.overlay {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--hoverBg);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.member-img-wrapper:hover .overlay {
  opacity: 0.5;
}

@media screen and (max-width: 1050px) {
  .content {
    padding: 0 5ch;
  }
}

@media screen and (max-width: 600px) {
  .content {
    padding: 2rem 2ch;
  }
}
</style>
