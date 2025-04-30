<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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

const offers = [
  {
    name: "Inside Talks",
    description: "A 45-minute activity featuring rotating tables, where companies can invite an engineer to speak with students about their day-to-day work and/or their career path."
  },
  {
    name: "15/15",
    description: "A 30-minute activity where companies can present a topic, project, or technology they use or developed, followed by time for questions and networking."
  },
  {
    name: "Workshops",
    description: "A 1-hour practical activity where companies provide students with hands-on experience related to a specific topic."
  },
  {
    name: "EletroLink",
    description: "A new, exciting booth where students can engage in 1-on-1 conversations with companies and potentially find their next job or internship."
  },
  {
    name: "Panels",
    description: "Open conversations with industry and tech experts, where you can ask questions, debate ideas, and dive into the topics that matter most today."
  },
  {
    name: "Job Fair",
    description: "Head to the main space of JEEC for a unique chance to meet top companies face-to-face. Discover internship opportunities, ask questions, and make connections that could shape your future."
  },
  {
    name: "Keynote Speakers",
    description: "Get inspired by our keynote speakers - industry leaders and innovators ready to share their stories, insights, and advice to help you kickstart your journey."
  },
  {
    name: "Alumni Talks",
    description: "Chat with graduates about their career journeys, insights, and tips - discover pathways in engineering and tech straight from those who've been there."
  }
]

const selected = ref(0);
let timer;

const startAutoCycle = () => {
  timer = setInterval(() => {
    selected.value = (selected.value + 1) % offers.length;
  }, 5000);
}

const stopAutoCycle = () => clearInterval(timer);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.isIntersecting ? startAutoCycle() : stopAutoCycle();
  });
});

onMounted(() => {
  const section = document.getElementById('offers');
  observer.observe(section);
});

onUnmounted(() => {
  observer.disconnect();
  stopAutoCycle();
});

function offerCallback(index) {
  const scrollEl = document.getElementById("offer-description");
  if (scrollEl.getBoundingClientRect().bottom > window.innerHeight)
    scrollEl.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" })

  selected.value = index;
  stopAutoCycle();
  setTimeout(() => {
    stopAutoCycle();
    startAutoCycle();
  }, 15000);
}
</script>

<template>
  <div id="offers" class="content" :class="{ even: props.isEven }" :style="`--acc-color: var(${props.accColor});`">
    <div class="heading">
      <h2>What we have to offer</h2>
      <div class="highlight"></div>
    </div>
    <div class="offers">
      <button class="offer highlight-border" v-for="(offer, index) in offers" :key="offer.name"
        @click="offerCallback(index)" :class="{ active: selected == index }">
        <div class="offer-background"></div>
        <div class="title-wrapper">
          <p>{{ offer.name }}</p>
        </div>
      </button>
    </div>
    <div id="offer-description" class="anchor">
      <Transition name="fade">
        <div :key="selected" class="expanded-offer">
          <h3>{{ offers[selected].name }}</h3>
          <p>{{ offers[selected].description }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.content:not(#i) {
  flex-direction: column;
  overflow: hidden;
  padding-top: calc(2.5vw + 3rem);
  padding-bottom: calc(2.5vw + 2rem);
  text-align: center;
}

.content.even:not(#i) {
  padding-top: 3rem;
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

.offers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2ch;
  max-width: 1000px;
  padding-bottom: 3rem;
}

button.offer {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  position: relative;
  height: 8rem;
  min-width: 18ch;
  max-width: 26ch;
  --border-padding: 0.5ch;
  padding: var(--border-padding);
  cursor: pointer;
  scale: 1;
  transition: scale 0.1s ease-in;
  flex: 1;
  flex-basis: 20%;
}

button.offer.active,
button.offer:hover {
  scale: 1.05;
  transition: scale 0.2s ease-out;
}

button.offer::before {
  transition: filter 0.1s ease-in;
}

button.offer.active::before {
  transition: filter 0.2s ease-out;
  filter: drop-shadow(0 0 1ch var(--acc-color));
}

.offer-background {
  position: absolute;
  border-radius: 1ch;
  top: var(--border-padding);
  left: var(--border-padding);
  width: calc(100% - var(--border-padding)*2);
  height: calc(100% - var(--border-padding)*2);
  background: url('@/assets/IMG_4189 2.png');
  background-size: cover;
  padding: 1ch;
  z-index: -1;
}

.title-wrapper {
  width: calc(100% - 2ch);
  height: calc(100% - 3rem);
  background: color-mix(in srgb, var(--acc-color) 20%, #00000032);
  border-radius: 1ch;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5ch;
  backdrop-filter: blur(2px);
}

.title-wrapper p {
  font-size: 1.3rem;
  font-weight: 900;
  text-shadow: 0 0 1ch black;
}

.anchor {
  position: relative;
  height: 10rem;
  width: 100%;
  max-width: 700px;
  padding-bottom: 5rem;

}

.expanded-offer {
  position: absolute;
  min-height: 100%;
  width: 100%;
  background: radial-gradient(closest-side,
      color-mix(in srgb, var(--acc-color) 40%, transparent) 0%,
      transparent 150%);
  border: 2px solid var(--acc-color);
  border-radius: 1ch;
  padding: 1rem 2ch;
  text-align: start;
}

.expanded-offer h3 {
  text-transform: uppercase;
  font-weight: 500;
  padding-bottom: 1rem;
  font-size: 1.3em;
}

@media screen and (max-width: 950px) {
  .content.even:not(#i) {
    padding-bottom: 5rem;
  }

  button.offer {
    flex-basis: 35%;
  }
}

@media screen and (max-width: 450px) {
  .content:not(#i) {
    padding-bottom: calc(2.5vw + 4rem);
  }

  .content.even:not(#i) {
    padding-bottom: 6rem;
  }

  button.offer {
    min-width: 0;
    flex-basis: 40%;
    flex-grow: 1;
  }

  .title-wrapper p {
    font-size: 1rem;
  }
}
</style>
