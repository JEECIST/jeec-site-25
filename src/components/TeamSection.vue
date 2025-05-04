<script setup>
import TheHighlightDivider from '@/components/TheHighlightDivider.vue'
import { useSlots, defineProps, computed } from 'vue'
import fallbackImg from '@/assets/home/hero_section_temp.png'
import defaultImg from '@/assets/default_jeec_image.webp'

const slots = useSlots()

const props = defineProps({
  team: {
    type: Object,
    default: () => ({
      name: 'Default',
      id: 0,
      image: fallbackImg,
      description: 'Connecting the best students, companies and engineers for over 20 years!',
      members: [],
    })
  },
  isEven: {
    type: Boolean,
    default: false
  }
})

const dropShadowColor = computed(() => {
  switch (props.team.name) {
    case 'Coordination':
      return 'var(--c-acc-blue)'
    case 'Business':
      return 'var(--c-acc-orange)'
    case 'Speakers':
      return 'var(--c-acc-yellow)'
    case 'Logistics':
      return 'var(--c-acc-lighter-dark-blue)'
    case 'WebDev':
      return 'var(--c-acc-lilac)'
    case 'Marketing':
      return 'var(--c-acc-strong-pink)'
    default:
      return 'var(--c-ds)'
  }
})
</script>

<template>
  <section class="team-section" :class="{ even: props.isEven }" :id="team.name.toLowerCase()">
    <TheHighlightDivider :top="true" :flipped="!props.isEven" :dropShadowColor="dropShadowColor"
      :shadowPosition="'0 -2px 50px'" />
    <slot name="content" v-if="slots.content"></slot>
    <div v-else class="content" :style="`--acc-color: ${dropShadowColor}`">
      <div class="top-content">
        <div class="team-description">
          <h3>{{ team.name }}</h3>
          <div class="highlight" />
          <p>{{ team.description }}</p>
        </div>
        <div class="team-image">
          <img :src="team.image" />
        </div>
      </div>
      <div class="bottom-content">
        <div class="member" v-for="member in team.members" :key="member.name">
          <a class="member-image" :class="{ spotlight: member.spotlight }" :href="member.linkedin" target="_blank">
            <img :src="member.image != null ? member.image : defaultImg" :alt="member.name" />
            <div class="overlay">
              <img src="@/assets/team/linkedin.svg" alt="LinkedIn" class="linkedin-icon" />
            </div>
          </a>
          <p>{{ member.name }}</p>
        </div>
      </div>
    </div>
    <TheHighlightDivider :bottom="true" :flipped="!props.isEven" :dropShadowColor="dropShadowColor"
      :shadowPosition="'0 2px 50px'" />
  </section>
</template>

<style scoped>
.team-section:nth-child(2) {
  margin-top: calc(2.5vw + 1rem);
}

.team-section {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  margin: calc(2.5vw + 4rem) 0;
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
  gap: 2ch;
  align-items: center;
  flex-direction: row;
  text-align: left;
}

.team-section.even .top-content {
  flex-direction: row-reverse;
  text-align: right;
}

.team-description {
  max-width: 40ch;
  flex: 1;
}

.team-description h3 {
  font-weight: 800;
  font-size: 1.5rem;
}

.highlight {
  width: 100%;
  height: 2px;
  border-radius: 4px;
  background: linear-gradient(to left,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 38%, transparent) 50%,
      var(--acc-color) 100%);
  margin-top: 0.2rem;
  margin-bottom: 1.2rem;
}

.team-section.even .highlight {
  background: linear-gradient(to right,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 38%, transparent) 50%,
      var(--acc-color) 100%);
}

.team-image {
  position: relative;
  flex: 1;
  max-width: 40ch;
  align-self: stretch;
  overflow: visible;
}

.team-image img {
  position: absolute;
  bottom: 0;
  display: block;
  aspect-ratio: 1.6;
  width: 100%;
  height: auto;
  border-radius: 15px;
  object-fit: cover;
}

.bottom-content {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem 4ch;
}

.member {
  max-width: 10rem;
  text-align: center;
}

.member p {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--c-ft-light);
  margin-top: 0.7rem;
}

.member-image {
  display: block;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.member-image.spotlight {
  box-shadow: 0 0 20px var(--acc-color);
}

.member-image>img {
  border-radius: 50%;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

.overlay {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: color-mix(in srgb, var(--acc-color) 70%, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.member-image:hover .overlay {
  opacity: 1;
}

.linkedin-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 35%;
  transition: opacity 0.3s ease;
  z-index: 3;
  filter: brightness(0) invert(1);
}

@media screen and (max-width: 1000px) {
  .content {
    gap: 2ch;
    padding: 3rem 4ch;
  }
}

@media screen and (max-width: 850px) {
  .team-section {
    margin: calc(2.5vw + 8rem) 0;
  }

  .content {
    gap: 4rem
  }

  .top-content:not(#i) {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
    gap: 2rem;
  }

  .team-image {
    align-self: center;
    width: 100%;
    min-height: 6rem;
  }

  .highlight {
    background: linear-gradient(to right,
        transparent 0%,
        color-mix(in srgb, var(--acc-color) 50%, transparent) 20%,
        var(--acc-color) 50%,
        color-mix(in srgb, var(--acc-color) 50%, transparent) 80%,
        transparent 100%);
  }
}

@media screen and (max-width: 500px) {
  .content {
    padding: 3rem 2ch;
  }
}
</style>
