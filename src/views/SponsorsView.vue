<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';

const platinumSponsors = ref([]);
const goldSponsors = ref([]);
const silverSponsors = ref([]);
const bronzeSponsors = ref([]);

// Tem de se mudar o nome do evento para o backeen ir buscar o certo
const allSponsors = ref([])
const fetchData = () => {
  axios.get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/sponsors', {
    auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  }).then((response) => {
    allSponsors.value = response.data;
    // console.log(allSponsors.value);
    // console.log(response.data)

    // Reset sponsor arrays to empty arrays
    platinumSponsors.value = [];
    goldSponsors.value = [];
    silverSponsors.value = [];
    bronzeSponsors.value = [];

    // Process tiers and decode base64 images
    response.data.tiers.forEach((tier) => {
      const sponsorImages = tier.sponsors
        .map((sponsor) => sponsor.image ? `data:image/*;base64,${sponsor.image}` : null) // Decode base64 to data URL
        .filter((image) => image !== null); // Remove null values

      switch (tier.tier_name) {
        case 'platinum':
          platinumSponsors.value = sponsorImages;
          break;
        case 'gold':
          goldSponsors.value = sponsorImages;
          break;
        case 'silver':
          silverSponsors.value = sponsorImages;
          break;
        case 'bronze':
          bronzeSponsors.value = sponsorImages;
          break;
      }
    });

    
    // console.log('Platinum Sponsors:', platinumSponsors);
    // console.log('Gold Sponsors:', goldSponsors);
    // console.log('Silver Sponsors:', silverSponsors);
    // console.log('Bronze Sponsors:', bronzeSponsors);

  }).catch((error) => {
    console.log(error);
  });
};

onMounted(fetchData)
</script>

<template>
  <div class="view">
    <div class="background">

    </div>
    <section class="intro">
      <h1>Sponsors</h1>
      <p>Our sponsors help us improve JEEC and without them the whole experience wouldn’t be as good as it is. Don’t forget to look for merchandising and gifts!</p>
    </section>

    <div class="decorative-line"></div>

    <div class="tier">
      <h2><span class="highlight-platinum">Platinum</span> Sponsors</h2>

      <div class="grid-container">
        <div v-for="(image, index) in platinumSponsors" :key="index" class="grid-item platinum">
          <img :src="image" alt="Platinum Sponsor" />
        </div>
      </div>
    </div>

    <div class="decorative-line"></div>

    <div class="tier">
      <h2><span class="highlight-gold">Gold</span> Sponsors</h2>

      <div class="grid-container">
        <div v-for="(image, index) in goldSponsors" :key="index" class="grid-item gold">
          <img :src="image" alt="Gold Sponsor" />
        </div>
      </div>
    </div>

    <div class="decorative-line"></div>

    <div class="tier">
      <h2><span class="highlight-silver">Silver</span> Sponsors</h2>

      <div class="grid-container">
        <div v-for="(image, index) in silverSponsors" :key="index" class="grid-item silver">
          <img :src="image" alt="Silver Sponsor" />
        </div>
      </div>
    </div>

    <div class="decorative-line"></div>

    <div class="tier">
      <h2><span class="highlight-bronze">Bronze</span> Sponsors</h2>

      <div class="grid-container">
        <div v-for="(image, index) in bronzeSponsors" :key="index" class="grid-item bronze">
          <img :src="image" alt="Bronze Sponsor" />
        </div>
      </div>
    </div>
    

  </div>
</template>

<style scoped>
/*
  USEM AS VARIÁVEIS, NOMEADAMENTE A --acc-color
  quase nunca deve ser preciso por o código da cor à mão
  todas as cores que vamos precisar estão definidas no global.css

  assim temos consistência no site inteiro e caso marketing
  se lembre de mudar a palete outra vez, é só alterar na variável
*/
.view {
  padding-top: var(--header-height);
  --acc-color: var(--c-acc-lighter-dark-blue);
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 100px;
  padding-bottom: 500px;
  align-content: center;
  align-items: center;
}

.background {
  position: fixed;
  top: 0;
  left: 0;  
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: -1; /* To ensure it's behind the content */
  background-image: url('src/assets/sponsors-background.png');
}

.intro {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
}

.decorative-line {
  border-width: 1px; /* Set the border width */
  border-style: solid; /* Define the border style */
  border-image-source: linear-gradient(
    270deg,
    rgba(46, 85, 255, 0) 0%,
    rgba(46, 85, 255, 0.5) 19%,
    #2E55FF 50%,
    rgba(46, 85, 255, 0.5) 81%,
    rgba(46, 85, 255, 0) 100%
  );
  border-image-slice: 1; /* Ensure the gradient is applied to the full border */
  width: 100%; /* Use percentage for adaptability */
  margin: 20px auto; /* Center the line and add spacing */
}

.tier {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}

/* Grid Container */
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Default to 4 columns */
  gap: 30px; /* Space between items */
  padding: 20px;
}

.grid-item {
  background: var(--c-ft); /* Light background */
  border-radius: 20px;
  min-height: 100px;
  max-height: 260px;
  height: 2em;
  max-width: 300px;
  min-width: 150px;
  width: 4em;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.grid-item img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

/* Border styles */
.grid-item.platinum { border: 4px solid var(--c-platinum); }
.grid-item.gold { border: 4px solid var(--c-gold); }
.grid-item.silver { border: 4px solid var(--c-silver); }
.grid-item.bronze { border: 4px solid var(--c-bronze); }

/* Typography */
p {
  font-weight: 700;
  font-size: larger;
}

h1 {
  text-align: center;
  text-shadow: 0px 0px 15px var(--acc-color);
  margin: 2rem auto;
  position: relative;
  width: min-content;
}

h2 {
  color: var(--c-ft);
  width: max-content;
  text-shadow: 0px 0px 15px var(--c-bg);
  
}

.highlight-platinum {
  background: linear-gradient(73.96deg, #576265 -1.1%, #9EA1A1 15.99%, #848B8A 29.8%, #576265 47.85%, #576265 57.15%, #757A7B 64.34%, #576265 69.63%);
  background-blend-mode: color;
  background: #CDC9C2;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-blend-mode: color, normal;
}

.highlight-gold {
  /* Gold Sponsors */
  background: linear-gradient(0deg, #B59046, #B59046), linear-gradient(73.96deg, #576265 -1.1%, #9EA1A1 15.99%, #848B8A 29.8%, #576265 47.85%, #576265 57.15%, #757A7B 64.34%, #576265 69.63%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-blend-mode: color, normal;
}

.highlight-silver {
  background: linear-gradient(0deg, #CDC9C2, #CDC9C2), linear-gradient(73.96deg, #576265 -1.1%, #9EA1A1 15.99%, #848B8A 29.8%, #576265 47.85%, #576265 57.15%, #757A7B 64.34%, #576265 69.63%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-blend-mode: color, normal;
}

.highlight-bronze {
  /* Bronze Sponsors */
  background: linear-gradient(0deg, #C9705C, #C9705C), linear-gradient(73.96deg, #576265 -1.1%, #9EA1A1 15.99%, #848B8A 29.8%, #576265 47.85%, #576265 57.15%, #757A7B 64.34%, #576265 69.63%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-blend-mode: color, normal;
}

/* Mobile responsive styles */
@media screen and (max-width: 1024px) {

  .grid-container {
    grid-template-columns: repeat(3, 1fr); /* 2 columns for medium screens */
    padding: 10px;
  }

  h1 {
    font-size: 1.5rem; /* Adjust font size for smaller screens */
  }

  h2 {
    font-size: 1.2rem; /* Adjust font size for smaller screens */
  }

  p {
    font-size: 1rem; /* Adjust paragraph font size */
  }
}

@media screen and (max-width: 480px) {

  .grid-container {
    grid-template-columns: repeat(2, 1fr); /* 1 column for small screens */
  }


  h1 {
    font-size: 2.6rem; /* Smaller font size */
  }

  h2 {
    font-size: 2rem; /* Smaller font size */
  }

  p{
    font-size: 1rem; /* Smaller paragraph font size */
  }
}

</style>
