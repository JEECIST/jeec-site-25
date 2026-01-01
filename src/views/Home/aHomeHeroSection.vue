<script setup>
import countdown from '@/lib/countdown.esm.js/countdown.js'

const now = new Date()
const jeec_start = new Date('Mar 2, 2026 10:30:00')
const jeec_end = new Date('Mar 4, 2026 20:00:00')
const cd = countdown(now, jeec_start, countdown.MONTHS | countdown.DAYS | countdown.HOURS)

let state = 'soon'
let months = '99'
let days = '99'
let hours = '99'

if (jeec_end - now < 0) {
  state = 'ended'
  months = 'XX'
  days = 'XX'
  hours = 'XX'
} else if (jeec_start - now < 0) {
  state = 'started'
  months = '00'
  days = '00'
  hours = '00'
} else {
  state = 'soon'
  months = cd.months < 10 ? '0' + cd.months : cd.months.toString()
  days = cd.days < 10 ? '0' + cd.days : cd.days.toString()
  hours = cd.hours < 10 ? '0' + cd.hours : cd.hours.toString()
}
</script>

<template>
  <section class="hero">
    <h1 class="hidden">JEEC Engineering & Tech Talks</h1>
    <img class="hero_logo" src="@/assets/home/hero_logo_temp.svg" alt="JEEC Logo" />
    <p class="hero_date">March 2nd to 4th 2026</p>
    <template v-if="state == 'started'">
      <p class="hero_action">Meet us at TIC!</p>
    </template>
    <template v-else-if="state == 'ended'">
      <p class="hero_action">See you next year!</p>
    </template>
    <template v-else>
      <p class="hero_action">Get ready for JEEC!</p>
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
    <div class="hero_separator">
      <img src="@/assets/home/hero_separator.svg" alt="" aria-hidden="true" />
    </div>
    <p class="hero_empower">
      Empower your future with <span><img src="@/assets/logo_white.png" alt="JEEC" /></span>
    </p>
    <div class="hero_webapp">
      <div class="webapp-arrow"></div>
      <a class="webapp-button" href="https://app.jeec.ist" target="_blank">WebApp Login</a>
      <div class="webapp-arrow"></div>
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
  max-width: clamp(200px, 80vw, 500px);
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
  padding: 2rem 0;
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
  gap: 0.2ch;
}

.cd-cell > p {
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

.cd-value > p {
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

.cd-value > p:last-child {
  clip-path: rect(0 100% 50% 0);
  background-color: transparent;
  color: color-mix(in srgb, var(--c-ft) 100%, transparent);
  backdrop-filter: blur(0);
  pointer-events: none;
}

.cd-value:first-of-type {
  grid-column: 1;
  grid-row: 1;
}

.cd-value:last-of-type {
  grid-column: 2;
  grid-row: 1;
}

section.hero .hero_separator {
  width: 100%;
  height: 300px;
  overflow: visible;
}

.hero_separator > img {
  width: 100%;
  height: 100%;
  filter: blur(20px);
  transform: scaleY(1.5);
}

p.hero_empower {
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 300;
  padding: 2rem 2ch;
}

p.hero_empower span img {
  padding-left: 0.2ch;
  padding-bottom: 0.1rem;
  height: 1.2em;
  width: auto;
  display: inline-block;
  vertical-align: middle;
}

section.hero .hero_webapp {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 900px;
  padding: 0 1ch;
  padding-top: 2rem;
  padding-bottom: 10rem;
}

.webapp-button {
  padding: 0.8rem 2ch;
  flex-grow: 1;
  word-break: keep-all;
  border: var(--c-acc-blue) 2px solid;
  border-radius: 1000px;
  font-weight: 700;
  box-shadow: inset 3px 5px 5px color-mix(in srgb, var(--c-acc-blue) 40%, transparent);
  background-color: color-mix(in srgb, var(--c-acc-blue) 20%, transparent);
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  text-decoration: none;
}

.webapp-button:hover{
  background-color: color-mix(in srgb, var(--c-acc-blue) 70%, transparent);
  transition: background-color 0.2s ease-out;
}

.webapp-arrow {
  min-width: 20px;
  flex-grow: 1;
  height: 2px;
  background: var(--c-acc-blue);
  position: relative;
}

.webapp-arrow::before {
  --radius: 5px;
  content: '';
  position: absolute;
  width: calc(var(--radius) * 2);
  aspect-ratio: 1 / 1;
  right: calc(0% - var(--radius));
  top: calc(50% - var(--radius));
  border: none;
  border-radius: 50%;
  background-color: var(--c-acc-blue);
}

.webapp-arrow:last-child::before {
  left: calc(0% - var(--radius));
}

@media screen and (max-width: 700px) {
  .hero_separator > img {
    transform: scaleY(1.2);
  }
}

@media screen and (max-width: 500px) {
  .hero_separator > img {
    transform: scaleY(1);
  }
}

@media screen and (max-width: 400px) {
  .hero_separator > img {
    transform: scaleY(0.8);
  }
}
</style>
