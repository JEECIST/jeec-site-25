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
})
</script>

<template>
  <div class="content" :class="{ even: props.isEven }" :style="`--acc-color: var(${props.accColor});`">
    <div class="heading">
      <h2>Why participate in JEEC 25</h2>
      <div class="highlight"></div>
    </div>
    <div class="wrapper" id="scroll-anim">
      <div class="gradient active gradient-left">
        <h3 class="gradient__content">Companies</h3>
        <div class="gradient__content content__extremes">
          <img src="@/assets/companies-students/1.svg">
          <p>Connect with the best graduating students</p>
        </div>
        <div class="gradient__content content__middle">
          <img src="@/assets/companies-students/2.svg">
          <p>Promote your company</p>
        </div>
        <div class="gradient__content content__extremes">
          <img src="@/assets/companies-students/3.svg">
          <p>Advertise your areas of expertise</p>
        </div>
      </div>
      <div class="gradient active gradient-right">
        <h3 class="gradient__content">Students</h3>
        <div class="gradient__content content__extremes">
          <img src="@/assets/companies-students/4.svg">
          <p>Organised by students for students</p>
        </div>
        <div class="gradient__content content__middle">
          <img src="@/assets/companies-students/5.svg">
          <p>Get in touch with leading tech companies</p>
        </div>
        <div class="gradient__content content__extremes">
          <img src="@/assets/companies-students/6.svg">
          <p>Show your capabilities to potential employers</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content:not(#i) {
  flex-direction: column;
  overflow: hidden;
  padding-top: calc(2.5vw + 4rem);
  padding-bottom: calc(2.5vw + 2rem);
  text-align: center;
}

.content:not(#i).even {
  padding-top: 4rem;
  padding-bottom: 2rem;
}

.heading {
  position: relative;
  padding-bottom: 4rem;
}

.heading h2 {
  text-transform: uppercase;
}

.heading .highlight {
  position: absolute;
  height: 2px;
  width: 100%;
  transform: scaleX(120%);
  background: linear-gradient(to right,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 50%, transparent) 20%,
      var(--acc-color) 50%,
      color-mix(in srgb, var(--acc-color) 50%, transparent) 80%,
      transparent 100%);
}

.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  height: 700px;
  text-align: center;
}

.gradient.active {
  width: 1000px;
  /* transition: all 1.5s ease-in; */
}

.gradient {
  width: 1px;
  max-width: min(50%, 1000px);
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
}

.gradient-left {
  align-items: flex-end;
}

.gradient-right {
  align-items: flex-start;
}

.gradient::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(10px);
}

.gradient-left::before {
  background:
    linear-gradient(to bottom left,
      var(--c-acc-lilac) 0%,
      color-mix(in srgb, var(--c-acc-lilac) 40%, transparent) 10%,
      color-mix(in srgb, var(--c-acc-dark-blue) 30%, transparent) 25%,
      transparent 50%) bottom left,
    linear-gradient(to top left,
      var(--c-acc-lilac) 0%,
      color-mix(in srgb, var(--c-acc-lilac) 40%, transparent) 10%,
      color-mix(in srgb, var(--c-acc-dark-blue) 30%, transparent) 25%,
      transparent 50%) top left;
  background-size: 100% 50%;
  background-repeat: no-repeat;
}

.gradient-right::before {
  background:
    linear-gradient(to bottom right,
      var(--c-acc-lilac) 0%,
      color-mix(in srgb, var(--c-acc-lilac) 40%, transparent) 10%,
      color-mix(in srgb, var(--c-acc-dark-blue) 30%, transparent) 25%,
      transparent 50%) bottom right,
    linear-gradient(to top right,
      var(--c-acc-lilac) 0%,
      color-mix(in srgb, var(--c-acc-lilac) 40%, transparent) 10%,
      color-mix(in srgb, var(--c-acc-dark-blue) 30%, transparent) 25%,
      transparent 50%) top right;
  background-size: 100% 50%;
  background-repeat: no-repeat;
}

.gradient::after {
  content: "";
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  background: linear-gradient(to top,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 50%, transparent) 20%,
      var(--acc-color) 50%,
      color-mix(in srgb, var(--acc-color) 50%, transparent) 80%,
      transparent 100%);
}

.gradient>h3 {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  font-size: 1.5rem;
  padding: 0 0ch;
  text-transform: uppercase;
}

.gradient.active>h3 {
  padding: 0 1ch;
  /* transition: padding 1.3s ease-in; */
}

.gradient-left>h3 {
  right: 0;
}

.gradient-right>h3 {
  left: 0;
}

.gradient.active .gradient__content {
  opacity: 1;
  /* transition: all 1.5s ease-in; */
}

.gradient__content {
  opacity: 0;
  z-index: 1;
}

.content__extremes {
  margin: 0 20%;
}

.content__middle {
  margin: 0 40%;
}

.gradient__content img {
  width: 80px;
  height: 80px;
}

.gradient__content:has(> p) {
  font-size: 1.1rem;
  width: 20ch;
}

@media screen and (max-width: 1007px) {
  .gradient>h3 {
    font-size: 1.4rem;
  }

  .content__extremes {
    margin: 0 30%;
  }

  .content__middle {
    margin: 0 50%;
  }

  .gradient__content img {
    width: 70px;
    height: 70px;
  }

  .gradient__content:has(> p) {
    font-size: 1rem;
    width: 16ch;
  }
}

@media screen and (max-width: 800px) {
  .gradient>h3 {
    font-size: 1.5rem;
    text-orientation: upright;
    writing-mode: vertical-rl;
  }

  .gradient.active>h3 {
    padding: 0 0.7ch;
  }

  .content__extremes {
    margin: 0 15%;
  }

  .content__middle {
    margin: 0 35%;
  }

  .gradient__content img {
    width: 60px;
    height: 60px;
  }

  .gradient__content:has(> p) {
    font-size: 0.9rem;
    width: 13ch;
  }
}
</style>
