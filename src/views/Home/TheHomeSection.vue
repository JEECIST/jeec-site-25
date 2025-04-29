<script setup>
import TheHighlightDivider from '@/components/TheHighlightDivider.vue';
import { computed } from 'vue';

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
});

const isEven = computed(() => props.index % 2 == 0);
</script>

<template>
  <section v-if="isEven" class="even">
    <TheHighlightDivider :top="true" :flipped="true" :dropShadowColor="'black'"></TheHighlightDivider>
    <slot :isEven="isEven"></slot>
    <TheHighlightDivider :flipped="true" :dropShadowColor="'black'"></TheHighlightDivider>
  </section>
  <section v-else>
    <slot></slot>
  </section>
</template>

<style scoped>
section {
  position: relative;
  overflow: visible;
  z-index: 1;
  display: flex;
  justify-content: center;
}

section.even {
  z-index: 2;
}

section>:deep(.content) {
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(2.5vw + 2rem) 3ch;
  width: min(100%, 1700px);
  max-width: 100%;
}

section.even>:deep(.content) {
  background-color: var(--c-bg-lighter);
  padding: 2rem 3ch;
}

section.even>:deep(.content)::before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: inherit;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

:deep(.highlight-border) {
  position: relative;
  padding: 0.5ch;
  border: 2px solid var(--acc-color, var(--c-acc-blue));
  border-radius: 1ch;
}

:deep(.highlight-border)::before {
  content: "";
  border-radius: 1ch;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background: color-mix(in srgb, var(--acc-color, var(--c-acc-blue)) 20%, transparent);
}
</style>
