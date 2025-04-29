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
    <div class="image">
      <div class="tic highlight-border">
        <img src="@/assets/home/where_tic.png" alt="Técnico Innovation Center">
        <p class="coordinates">38º44’7.7’’N 9º8’33.9’’W</p>
      </div>
      <div class="map highlight-border">
        <a target="_blank" href="https://maps.app.goo.gl/hWN1ZuWayuqnoYa37">
          <img src="@/assets/home/where_map.png" alt="Map with TIC's location">
          <img class="map-pin" src="@/assets/home/where_pin.svg" alt="pin" aria-hidden="true">
        </a>
      </div>
    </div>
    <div class="description">
      <h2>Where is JEEC?</h2>
      <div class="highlight"></div>
      <p>
        <span class="first">Find us at<br></span>
        <span class="second">Técnico innovation center</span>
        <span class="sponsor">Powered By<img src="@/assets/home/Fidelidade_V.png" alt="Fidelidade"></span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.content:not(#i) {
  gap: 5ch;
  flex-direction: row-reverse;
}

.content.even:not(#i) {
  flex-direction: row;
  text-align: end;
}

.description {
  padding: 1rem 0;
  flex: 1;
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

.description>p {
  text-transform: uppercase;
  min-height: 0;
  padding-top: 2rem;
}

.description>p span {
  font-weight: 600;
}

.description>p .first {
  font-size: clamp(1.4rem, 2vw, 2rem);
  padding-bottom: 0.5rem;
}

.description>p .second {
  font-size: clamp(1.4rem, 2vw, 2rem);
  color: var(--acc-color);
  padding-bottom: 0.5rem;
  font-weight: 800;
}

.description>p .sponsor {
  font-size: clamp(0.8rem, 1vw, 1.5rem);
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  column-gap: 1ch;
  text-transform: none;
}

.content.even .description>p .sponsor {
  justify-content: end;
}

.description>p .sponsor img {
  height: 1.7em;
  padding-top: 1px;
  width: auto;
}

.image {
  position: relative;
  flex-basis: 50%;
  margin-bottom: 5rem;
}

.tic {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
}

.tic img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 1ch;
}

.tic .coordinates {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: clamp(0.6rem, 2.5vw, 1rem);
  font-weight: 600;
  letter-spacing: 0.05ch;
  padding: 0.5rem 1rem;
  color: var(--c-bg);
}

.content.even .tic .coordinates {
  right: unset;
  left: 0;
}

.map {
  position: absolute;
  max-width: 40ch;
  width: 50%;
  display: flex;
  left: 0;
  bottom: 0;
  translate: -50% 50%;
}

.content.even .map {
  left: unset;
  right: 0;
  translate: 50% 50%;
}

.map a {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1ch;
  overflow: hidden;
}

.map img:first-child {
  width: 100%;
  scale: 2;
}

.map a .map-pin {
  left: 50%;
  bottom: 50%;
  translate: -50% 0;
  position: absolute;
  width: 26px;
  aspect-ratio: 0.66666;
}

@media screen and (max-width: 950px) {

  .content:not(#i#i) {
    flex-direction: column;
    text-align: end;
  }

  .content.even:not(#i#i) {
    flex-direction: column;
    text-align: start;
  }

  .content:not(.even) .description {
    align-self: flex-end;
  }

  .content:not(.even) .description>p .sponsor {
    justify-content: end;
  }

  .content:not(.even) .description .highlight {
    transform: scaleX(100%);
  }

  .content.even {
    text-align: start;
  }

  .content.even .description {
    align-self: flex-start;
  }

  .content.even .description>p .sponsor {
    justify-content: start;
  }

  .content.even .description .highlight {
    transform: scale(-100%);
  }

  .image {
    margin-bottom: 1rem;
  }

  .map {
    width: 45%;
    left: 1ch;
    bottom: 0;
    translate: 0 50%;
  }

  .content.even .map {
    left: unset;
    right: 1ch;
    translate: 0 50%;
  }

  .map img:first-child {
    scale: 1.7;
  }

  .map a .map-pin {
    width: 32px;
  }
}

@media screen and (max-width: 800px) {
  .map img:first-child {
    scale: 2;
  }

  .map a .map-pin {
    width: 26px;
  }
}

@media screen and (max-width: 550px) {
  .map a .map-pin {
    width: 22px;
  }
}
</style>
