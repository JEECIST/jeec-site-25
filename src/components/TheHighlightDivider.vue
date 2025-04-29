<template>
  <div v-if="top" class="divider top">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path v-if="!flipped" d="M 100 100 V 50 L 0 0 V 100 Z" class="path"
        :style="{ filter: `drop-shadow(0 0 32px ${dropShadowColor})` }"></path>
      <path v-else d="M 0 100 V 50 L 100 0 V 100 Z" class="path"
        :style="{ filter: `drop-shadow(0 0 32px ${dropShadowColor})` }"></path>
    </svg>
  </div>
  <div v-else class="divider bottom">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path v-if="flipped" d="M 0 0 V 50 L 100 100 V 0 Z" class="path"
        :style="{ filter: `drop-shadow(0 0 32px ${dropShadowColor})` }"></path>
      <path v-else d="M 100 0 V 50 L 0 100 V 0 Z" class="path"
        :style="{ filter: `drop-shadow(0 0 32px ${dropShadowColor})` }"></path>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  top: {
    type: Boolean,
    default: false,
  },
  flipped: {
    type: Boolean,
    default: false,
  },
  dropShadowColor: {
    type: String,
    default: 'var(--c-acc-blue)',
  },
})
</script>

<style scoped>
.divider {
  position: absolute;
  left: 0;
  line-height: 0;
  z-index: -1;
  width: 100%;
  height: 5vw;
}

.divider.top {
  top: 2.5vw;
  transform: translateY(-100%);
}

.divider.bottom {
  bottom: 2.5vw;
  transform: translateY(100%);
}

.divider svg {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.divider svg .path {
  fill: var(--c-bg-lighter);
}
</style>
