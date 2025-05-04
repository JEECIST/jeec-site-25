<script setup>
import { onMounted } from 'vue'
import TeamWheel from '@/components/TeamWheel.vue'
import TeamSection from '@/components/TeamSection.vue'
import { useTeamStore } from '@/stores/team'
import { storeToRefs } from 'pinia'

const teamStore = useTeamStore();
const { teams } = storeToRefs(teamStore);

// const allowedTeams = ['COORDINATION', 'SPEAKERS', 'LOGISTICS', 'WEBDEV', 'BUSINESS', 'MARKETING']

// const filteredTeams = computed(() => teams)
// //   teams.value.filter((team) => allowedTeams.includes(team.name?.trim().toUpperCase())),
// // )

onMounted(async () => {
  await teamStore.fetchData();
});
</script>

<template>
  <div class="view">
    <section class="description">
      <h1>Team</h1>
    </section>

    <TeamSection>
      <template #content>
        <div class="subtitle-content">
          <div class="subtitle-description">
            <h2>MEET OUR TEAM</h2>
            <div class="highlight" />
            <p>Connecting the best students, companies and engineers for over 20 years!</p>
          </div>
          <div class="team-wheel-container">
            <TeamWheel></TeamWheel>
          </div>
        </div>
      </template>

      <template #image>
      </template>

      <template #bottom></template>
    </TeamSection>

    <template v-for="(team, index) in teams" :key="team.id">
      <TeamSection :team="team" :isEven="(index % 2) == 0" />
    </template>
  </div>
</template>

<style scoped>
.view {
  --acc-color: var(--c-acc-blue);
  padding-top: var(--header-height);
  padding-bottom: 5rem;
  padding-right: 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  text-shadow: 0px 0px 15px var(--acc-color);
  margin: 2rem auto;
  position: relative;
  width: min-content;
}

.highlight {
  --acc-color: var(--c-acc-blue);
  width: 100%;
  height: 2px;
  border-radius: 4px;
  background: linear-gradient(to left,
      transparent 0%,
      color-mix(in srgb, var(--acc-color) 38%, transparent) 50%,
      var(--acc-color) 100%);
  margin-top: 0.2rem;
  margin-bottom: 1.2rem;
}

.subtitle-content {
  background-color: var(--c-bg-lighter);
  display: flex;
  padding: 3rem 10ch;
  z-index: 1;
  width: min(100%, 1300px);
  max-width: 100%;
  gap: 5ch;
}

.subtitle-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: inherit;
  z-index: -1;
}

.subtitle-description {
  flex-grow: 1;
  flex-basis: 50%;
}

.team-wheel-container {
  flex-grow: 1;
  flex-basis: 50%;
  width: 100%;
  max-width: 500px;
  position: relative;
}

@media screen and (max-width: 1000px) {
  .subtitle-content {
    gap: 2ch;
    padding: 3rem 4ch;
  }
}

@media screen and (max-width: 850px) {
  .subtitle-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2rem;
  }

  .subtitle-description {
    max-width: 50ch;
  }

  .team-wheel-container {
    aspect-ratio: 1/0.7;
    display: flex;
    justify-content: center;
  }

  .highlight {
    background: linear-gradient(to right,
        transparent 0%,
        color-mix(in srgb, var(--acc-color) 50%, transparent) 20%,
        var(--acc-color) 50%,
        color-mix(in srgb, var(--acc-color) 50%, transparent) 80%,
        transparent 100%);
  }
}

@media screen and (max-width: 500px) {
  .subtitle-content {
    padding: 3rem 2ch;
  }
}
</style>
