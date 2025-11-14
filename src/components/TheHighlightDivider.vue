<template>
  <div v-if="top" class="divider top">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path v-if="!flipped" d="M 100 100 V 50 L 0 0 V 100 Z" class="path"
        :style="{ filter: `drop-shadow(${shadowPosition} ${dropShadowColor}) ${extraFilters}` }"></path>
      <path v-else d="M 0 100 V 50 L 100 0 V 100 Z" class="path"
        :style="{ filter: `drop-shadow(${shadowPosition} ${dropShadowColor}) ${extraFilters}` }"></path>
      <!-- top stroke (not flipped) -->
      <path
        v-if="!flipped"
        d="M 0 0 L 100 50"
        class="stroke-line"
        :style="{ stroke: dropShadowColor }"
      />

      <!-- top stroke (flipped) -->
      <path
        v-else
        d="M 100 0 L 0 50"
        class="stroke-line"
        :style="{ stroke: dropShadowColor }"
      />
    </svg>
  </div>
  <div v-else class="divider bottom">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path v-if="flipped" d="M 0 0 V 50 L 100 100 V 0 Z" class="path"
        :style="{ filter: `drop-shadow(${shadowPosition} ${dropShadowColor}) ${extraFilters}` }"></path>
      <path v-else d="M 100 0 V 50 L 0 100 V 0 Z" class="path"
        :style="{ filter: `drop-shadow(${shadowPosition} ${dropShadowColor}) ${extraFilters}` }"></path>
      <!-- bottom stroke (not flipped) -->
      <path
        v-if="!flipped"
        d="M 0 100 L 100 50"
        class="stroke-line"
        :style="{ stroke: dropShadowColor }"
      />

      <!-- bottom stroke (flipped) -->
      <path
        v-else
        d="M 100 100 L 0 50"
        class="stroke-line"
        :style="{ stroke: dropShadowColor }"
      />
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
  shadowPosition: {
    type: String,
    default: '0 0 32px',
  },
  extraFilters: {
    type: String,
    default: '',
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

.path {
  fill: var(--j26-team-background);
}

.stroke-line {
  fill: none;
  stroke-width: 2px;
  vector-effect: non-scaling-stroke;
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
  fill: var(--j26-team-background);
}
</style>
