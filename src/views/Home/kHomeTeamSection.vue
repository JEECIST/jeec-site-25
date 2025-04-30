<script setup>
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
</script>

<template>
  <div class="content" :class="{ even: props.isEven }" :style="`--acc-color: var(${props.accColor});`">
    <div class="positioner">
      <div class="image highlight-border">
        <img src="@/assets/team/teamgroupimage.jpg" alt="">
      </div>
    </div>
    <div class="description">
      <h2>Our Team</h2>
      <div class="highlight"></div>
      <p>
        Behind JEEC stands a passionate and dedicated team of students who believe in the power of connection,
        innovation, and opportunity. From planning every detail to building bridges between companies and students, we
        work tirelessly to create an event that sparks inspiration, drives careers forward, and shapes the future of
        industry and technology.
      </p>
      <router-link class="page-link" to="team">Learn more</router-link>
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

.positioner {
  display: block;
  max-width: 70ch;
  align-self: flex-start;
  position: relative;
  flex-basis: 50%;
  height: 100%;
}

.image {
  position: absolute;
  left: 0;
  max-width: 100%;
  top: calc(-4rem - 2.5vw);
  height: calc(100% + 4rem + 2.5vw);
  overflow: hidden;
  aspect-ratio: 16/10;
}

.content:not(.even) .image {
  top: 0;
  left: unset;
  right: 0;
  height: 100%;
  aspect-ratio: 16/10;
}

.image img {
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 1ch;
  object-fit: cover;
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

.content:not(.even) .description .highlight {
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

@media screen and (max-width: 1115px) {
  .image {
    height: calc(100% + 2.5vw);
  }
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

  .image {
    position: relative;
    align-self: unset;
    height: calc(100% + 3rem + 2.5vw);
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
