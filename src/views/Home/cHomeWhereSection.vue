<script setup>
const props = defineProps({
  isEven: {
    type: Boolean,
    default: false,
  },
  accColor: {
    type: String,
    default: '--c-acc-blue',
  },
})
</script>

<template>
  <div
    class="content"
    :class="{ even: props.isEven }"
    :style="`--acc-color: var(${props.accColor});`"
  >
    <div class="description">
      <h2>Where is JEEC?</h2>
      <div class="highlight"></div>
      <p>Find us at <span class="tic_highlight">Técnico innovation center</span></p>
    </div>
    <div class="image">
      <p class="sponsor">Powered By<img src="@/assets/home/Fidelidade_V.png" alt="Fidelidade" /></p>
      <div class="tic">
        <img src="@/assets/home/where_tic.png" alt="Técnico Innovation Center" />
        <p class="coordinates">38º44’7.7’’N 9º8’33.9’’W</p>
        <div class="map">
          <a target="_blank" href="https://maps.app.goo.gl/hWN1ZuWayuqnoYa37">
            <img src="@/assets/home/where_map.png" alt="Map with TIC's location" />
            <img class="map-pin" src="@/assets/home/where_pin.svg" alt="pin" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content:not(#i) {
  flex-direction: column;
  gap: 2rem;
}

.content.even:not(#i) {
  text-align: end;
}

.description {
  padding: 1rem 0;
  width: fit-content;
  flex: 1;
  align-self: flex-start;
}

.content.even .description {
  align-self: flex-end;
}

.description h2 {
  text-transform: uppercase;
}

.description .highlight {
  width: 100%;
  height: 2px;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    transparent 0%,
    color-mix(in srgb, var(--acc-color) 38%, transparent) 50%,
    var(--acc-color) 100%
  );
}

.content:not(.even) .description .highlight {
  transform: scaleX(-100%);
}

.description > p {
  text-transform: uppercase;
  min-height: 0;
  padding-top: 2rem;
  font-size: clamp(1.4rem, 2vw, 2rem);
  padding-bottom: 0.5rem;
  font-weight: 600;
}

.description > p .tic_highlight {
  color: var(--acc-color);
  font-weight: 800;
}

.image {
  position: relative;
  display: flex;
  flex-basis: 50%;
}

.image > p.sponsor {
  font-size: clamp(0.8rem, 1vw, 1.5rem);
  white-space: nowrap;
  writing-mode: sideways-lr;
  text-orientation: sideways-right;
  align-self: flex-end;
  font-weight: 500;
  width: calc(2ch + 1rem);
  display: inline-flex;
  align-items: start;
}

.image > p.sponsor img {
  height: 2.1em;
  margin-left: -1px;
  margin-bottom: -2ch;
  vertical-align: middle;
  transform: rotate(-90deg);
  transform-origin: 0 0;
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
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 600;
  letter-spacing: 0.05ch;
  padding: 0.5rem 1rem;
  color: white;
  text-shadow: 0 0 3px black;
}

.content.even .tic .coordinates {
  right: unset;
  left: 0;
}

.map {
  position: absolute;
  max-width: 40ch;
  width: 25%;
  display: flex;
  top: 5px;
  right: 5px;
  transition: width 0.3s ease-in;
}

.map:hover {
  width: 40%;
  transition: width 0.3s ease-out;
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
  scale: 2.8;
  transition: scale 0.3s ease-in;
}

.map:hover img:first-child {
  scale: 1.8;
  transition: scale 0.3s ease-out;
}

.map a .map-pin {
  left: 50%;
  bottom: 50%;
  translate: -50% 0;
  position: absolute;
  width: 26px;
  height: auto;
}

@media screen and (max-width: 950px) {
  .map img:first-child {
    scale: 3;
  }

  .map:hover img:first-child {
    scale: 2.4;
  }
}

@media screen and (max-width: 800px) {
  .map img:first-child {
    scale: 3.6;
  }

  .map:hover img:first-child {
    scale: 2.4;
  }
}

@media screen and (max-width: 700px) {
  .map {
    width: 35%;
  }

  .map:hover {
    width: 70%;
  }

  .map img:first-child {
    scale: 3.6;
  }

  .map:hover img:first-child {
    scale: 1.8;
  }

  .map a .map-pin {
    width: 22px;
  }
}

@media screen and (max-width: 600px) {
  .map img:first-child {
    scale: 5;
  }

  .map:hover img:first-child {
    scale: 2.6;
  }

  .map a .map-pin {
    width: 18px;
  }
}
</style>
