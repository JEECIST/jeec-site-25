<script setup>
import bgImage from '@/assets/home/hero_section_temp.png'
import countdown from '@/lib/countdown.esm.js/countdown.js'

const now = new Date();
const jeec_start = new Date("May 5, 2025 9:30:00");
const jeec_end = new Date("May 9, 2025 20:00:00");
const cd = countdown(now, jeec_start, countdown.MONTHS | countdown.DAYS | countdown.HOURS);

let state = "soon";
let months = "99";
let days = "99";
let hours = "99";

if (jeec_end - now < 0) {
  state = "ended";
  months = "XX";
  days = "XX";
  hours = "XX";
}
else if (jeec_start - now < 0) {
  state = "started";
  months = "00";
  days = "00";
  hours = "00";
}
else {
  state = "soon";
  months = (cd.months < 10) ? ("0" + cd.months) : cd.months.toString();
  days = (cd.days < 10) ? ("0" + cd.days) : cd.days.toString();
  hours = (cd.hours < 10) ? ("0" + cd.hours) : cd.hours.toString();
}
</script>

<template>
  <section class="hero" :style="`background-image: url(${bgImage})`">
    <h1 class="hidden">JEEC Engineering & Tech Talks</h1>
    <img class="hero_logo" src="@/assets/home/hero_logo_temp.svg" alt="JEEC Logo">
    <p class="hero_date">May 5th to 9th 2025</p>
    <template v-if="state == 'started'">
      <p class="hero_action">JEEC has started!</p>
    </template>
    <template v-else-if="state == 'ended'">
      <p class="hero_action">See you next year!</p>
    </template>
    <template v-else>
      <p class="hero_action">JEEC starts soon!</p>
      <p class="hidden">{{ `${cd.months} Months, ${cd.days} Days, ${cd.hours} Hours Left!` }}</p>
    </template>
    <div class="hero_cd" aria-hidden="true">
      <div class="cd-cell">
        <div class="cd-value">
          <p>{{ months[0] }}</p>
          <p>{{ months[0] }}</p>
        </div>
        <div class="cd-value">
          <p>{{ months[1] }}</p>
          <p>{{ months[1] }}</p>
        </div>
        <p>Months</p>
      </div>
      <div class="cd-cell">
        <div class="cd-value">
          <p>{{ days[0] }}</p>
          <p>{{ days[0] }}</p>
        </div>
        <div class="cd-value">
          <p>{{ days[1] }}</p>
          <p>{{ days[1] }}</p>
        </div>
        <p>Days</p>
      </div>
      <div class="cd-cell">
        <div class="cd-value">
          <p>{{ hours[0] }}</p>
          <p>{{ hours[0] }}</p>
        </div>
        <div class="cd-value">
          <p>{{ hours[1] }}</p>
          <p>{{ hours[1] }}</p>
        </div>
        <p>Hours</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

section.hero {
  background-position: center;
  width: 100%;
  padding-top: var(--header-height);
  padding-bottom: 2.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

section.hero .hero_logo {
  display: block;
  max-width: clamp(200px, 80vw, 400px);
  padding: 0 2rem;
  width: 100%;
  padding-top: 5rem;
}

section.hero .hero_date {
  font-weight: 900;
  font-size: clamp(2rem, 5vw, 3rem);
  padding: 3rem 1ch 0 1ch;
}

section.hero .hero_action {
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 700;
  padding-top: 3rem;
}

section.hero .hero_cd {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 1.5em;
  font-size: clamp(2.5rem, 7vw, 4rem);
  gap: 0.7ch;
}

.cd-cell {
  display: grid;
  text-align: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  justify-items: center;
  font-size: 1em;
  gap: .2ch;
}

.cd-cell>p {
  grid-column: 1 / -1;
  grid-row: 2;
  font-size: 0.4em;
  font-weight: 600;
}

.cd-value {
  font-size: 1em;
  width: 1.8ch;
  height: calc(1em + 1.5rem);
  border-radius: 0.25em;
  overflow: hidden;
  position: relative;
}

.cd-value>p {
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: color-mix(in srgb, var(--c-acc-blue) 10%, transparent);
  color: color-mix(in srgb, var(--c-ft) 60%, transparent);
  backdrop-filter: blur(4px);
}

.cd-value>p:last-child {
  clip-path: rect(0 100% 50% 0);
  background-color: transparent;
  color: color-mix(in srgb, var(--c-ft) 100%, transparent);
  backdrop-filter: blur(0);
  pointer-events: none;
}

.cd- .cd-value:first-of-type {
  grid-column: 1;
  grid-row: 1;
}

.cd-value:last-of-type {
  grid-column: 2;
  grid-row: 1;
}
</style>
