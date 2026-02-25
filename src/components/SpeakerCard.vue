<script setup>
import { computed } from 'vue'

const props = defineProps({
  speakerProp: {
    type: Object,
    required: true,
  },
  accColor: {
    type: String,
    default: 'var(--j26-light-blue, #00e5ff)',
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggled'])

const detailsId = `speaker-details-${Math.random().toString(36).slice(2)}`

const speaker = computed(() => props.speakerProp || {})
const isOpen = computed(() => props.isOpen)

const initials = computed(() => {
  const name = speaker.value?.name?.trim() || ''
  if (!name) return '?'
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
})

const toggleOpen = () => {
  emit('toggled', !isOpen.value)
}
</script>

<template>
  <article class="speaker-card" :class="{ open: isOpen }" :style="`--acc-color: var(${accColor});`">
    <button
      class="card-trigger"
      type="button"
      @click="toggleOpen"
      :aria-expanded="isOpen"
      :aria-controls="detailsId"
    >
      <div class="card-layout">
        <div class="summary-pane">
          <div class="avatar">
            <img
              v-if="speaker?.image"
              :src="speaker.image"
              :alt="speaker?.name ? `${speaker.name}'s photo` : 'Speaker photo'"
              loading="lazy"
            />
            <span v-else class="initials">{{ initials }}</span>
          </div>

          <div class="summary-info" v-if="!isOpen">
            <img
              v-if="speaker?.company_logo"
              class="company-logo"
              :src="speaker.company_logo"
              :alt="`${speaker?.company || 'Company'} logo`"
              loading="lazy"
            />
            <h4>{{ speaker?.name || 'Mystery speaker' }}</h4>
          </div>

          <div class="toggle-overlay">
            <div class="cross cross-vertical"></div>
            <div class="cross cross-horizontal"></div>
          </div>
        </div>

        <div class="details-pane" :id="detailsId" :aria-hidden="!isOpen">
          <div class="role">
            <img
              v-if="speaker?.company_logo"
              class="company-logo"
              :src="speaker.company_logo"
              :alt="`${speaker?.company || 'Company'} logo`"
              loading="lazy"
            />
            <p>{{ speaker?.position || 'Speaker' }}</p>
          </div>

          <div class="details-body">
            <h4>{{ speaker?.name || 'Mystery speaker' }}</h4>
            <p v-if="speaker?.bio" class="bio">{{ speaker.bio }}</p>
          </div>

          <div
            v-if="speaker?.activity_name && speaker?.activity_date && speaker?.activity_time_range"
            class="activity"
          >
            <h4>{{ speaker.activity_name }}</h4>
            <span>
              <p>{{ speaker.activity_date }}</p>
              <p>•</p>
              <p>{{ speaker.activity_time_range }}</p>
            </span>
            <p class="location" v-if="speaker?.activity_location">
              {{ speaker.activity_location }}
            </p>
          </div>
        </div>
      </div>
    </button>
  </article>
</template>

<style scoped>
.speaker-card {
  --card-closed-width: min(250px, calc(100vw - 2rem));
  --card-open-width: min(700px, calc(100vw - 2rem));
  --card-height: calc(var(--card-closed-width) * 12 / 9);

  width: var(--card-closed-width);
  height: var(--card-height);
  overflow: hidden;
  transition: width 220ms ease;

  border: 2px solid var(--acc-color);
  border-radius: 12px;

  flex-shrink: 0;

  position: relative;
}

.speaker-card::before {
  content: '';
  position: absolute;
  left: var(--card-closed-width);
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--acc-color);
}

.speaker-card.open {
  width: var(--card-open-width);
}

.card-trigger {
  all: unset;
  display: block;
  width: 100%;
  height: 100%;
}

.card-trigger:focus-visible {
  outline: 2px solid var(--j26-white, #fff);
  outline-offset: 2px;
}

.card-layout {
  display: flex;
  height: 100%;
  display: flex;
}

.summary-pane {
  display: flex;
  align-items: end;
  min-width: var(--card-closed-width);
  max-width: var(--card-closed-width);
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 100%;
  height: 100%;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.initials {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--j26-white, #fff);
}

.summary-info {
  --margin: 0.5rem;
  position: absolute;
  bottom: var(--margin);
  left: var(--margin);
  right: calc(var(--margin) + 4px);
  padding: var(--margin);

  background-color: color-mix(in srgb, var(--acc-color), transparent 60%);
  backdrop-filter: blur(6px);
  border-radius: 8px;
  transition: opacity 220ms ease-out;
}

.speaker-card:hover .summary-info {
  opacity: 0;
  transition: opacity 220ms ease-in;
}

.summary-info .company-logo {
  margin-bottom: 0.5rem;
}

.summary-info h4 {
  text-shadow: 0px 0px 8px black;
}

.summary-info p {
  text-shadow: 0px 0px 4px black;
}

.speaker-card .toggle-overlay {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: color-mix(in srgb, var(--acc-color), transparent 50%);
  transition: opacity 220ms ease-out;
  opacity: 0;
  pointer-events: none;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
}

.speaker-card:hover .toggle-overlay {
  transition: opacity 220ms ease-in;
  opacity: 1;
}

.cross {
  position: absolute;
  background-color: var(--j26-white, #fff);
  width: calc(var(--card-closed-width) / 2);
  height: 5px;
  border-radius: 2px;
  transform-origin: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8);
  transition: transform 300ms ease-in-out;
}

.cross-vertical {
  transform: translate(-50%, -50%) rotate(90deg);
}

.speaker-card:hover .cross-horizontal {
  transform: translate(-50%, -50%) scale(1.2);
}

.speaker-card:hover .cross-vertical {
  transform: translate(-50%, -50%) rotate(90deg) scale(1.2);
}

.speaker-card.open .cross-vertical {
  transform: translate(-50%, -50%) rotate(90deg) scaleX(0);
  transition: transform 220ms ease;
}

.details-pane {
  padding: 1rem;
  overflow-y: auto;
  opacity: 0;
  transition: opacity 50ms ease-out;
  transition-delay: 0;
}

.speaker-card.open .details-pane {
  opacity: 1;
  transition: opacity 70ms ease-in;
  transition-delay: 200ms;
}

.role {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.role .company-logo {
  max-height: 50px;
  min-height: 37px;
  max-width: 120px;
  border: 2px solid var(--acc-color);
  border-radius: 10px;
}

.role p {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--acc-color);
  align-self: flex-end;
}

.details-body {
  margin-bottom: 1rem;
}

.details-body h4 {
  margin: 0;
  margin-bottom: 0.75rem;
  font-size: 1.7rem;
  color: var(--acc-color);
  text-shadow: 0px 0px 4px color-mix(in srgb, var(--acc-color), var(--j26-dark-blue) 50%);
}

.details-body p {
  letter-spacing: -0.05em;
  font-weight: 500;
}

.activity {
  width: calc(100% - 2rem);
  background-color: color-mix(in srgb, var(--acc-color), transparent 90%);
  border: 2px solid var(--acc-color);
  border-radius: 0 8px 8px 8px;

  padding: 1rem;
}

.activity h4 {
  margin: 0;
  margin-bottom: 0.2rem;
  color: var(--acc-color);
  text-shadow: 0px 0px 4px color-mix(in srgb, var(--acc-color), var(--j26-dark-blue) 50%);
  font-size: 1.1rem;
}

.activity span {
  display: flex;
  gap: 1ch;
  flex-wrap: wrap;
  font-weight: 600;
}

.activity .location {
  text-transform: uppercase;
}

.company-logo {
  display: block;
  max-height: 40px;
  min-height: 25px;
  max-width: 80px;
  width: auto;
  height: auto;
  object-fit: contain;
  background-color: white;
  padding: 2px 4px;
  border-radius: 4px;
}

@container speakers-layout (max-width: 550px) {
  .speaker-card {
    --card-closed-width: calc(100cqw);
    --card-open-width: calc(100cqw);
    --card-height: calc(var(--card-closed-width) * 12 / 9);

    width: var(--card-closed-width);
    height: auto;
    max-height: var(--card-height);
    transition: max-height 220ms ease;

    position: relative;
  }

  .speaker-card::before {
    top: var(--card-height);
    left: 0;
    width: 100%;
    height: 2px;
  }

  .speaker-card.open {
    width: var(--card-closed-width);
    max-height: 1500px;
  }

  .card-trigger {
    height: auto;
  }

  .card-layout {
    flex-direction: column;
    height: auto;
  }

  .summary-pane {
    min-width: 100%;
    max-width: 100%;
    height: var(--card-height);
    min-height: var(--card-height);
    max-height: var(--card-height);
  }

  .details-pane {
    overflow-y: visible;
  }
}
</style>
