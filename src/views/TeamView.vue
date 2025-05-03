<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import TeamWheel from '@/components/TeamWheel.vue'
import TeamSection from '@/components/TeamSection.vue'
import fallbackImg from '@/assets/home/hero_section_temp.png'

const teams = ref([])
const teamImg = ref({})
const membersImg = ref({})

const fetchTeamImg = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/teams_image', {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })

    console.log(response.data);

    teamImg.value = response.data.team_images.reduce((acc, obj) => {
      const [key, value] = Object.entries(obj)[0]
      const relativePath = value.replace(/^.*\/static/, 'static') // Remove parte
      acc[key] = import.meta.env.VITE_APP_JEEC_BRAIN_URL + relativePath // Constrói
      return acc
    })

  } catch (error) {
    console.error('Erro ao buscar imagens das equipas:', error)
  }
}

const fetchMembersImage = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/members_image', {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })

    console.log(response.data);

    membersImg.value = response.data.member_images.reduce((acc, obj) => {
      const [key, value] = Object.entries(obj)[0]
      const relativePath = value.replace(/^.*\/static/, 'static')
      acc[key] = import.meta.env.VITE_APP_JEEC_BRAIN_URL + relativePath
      return acc
    })

  } catch (error) {
    console.error('Erro ao buscar imagens dos membros:', error)
  }
}

const fetchTeams = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/teams_new', {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
      },
    })

    console.log(response.data);

    teams.value = response.data.data.map((team) => ({
      name: team.name,
      description: team.description,
      members: (team.members.data).map((member) => {
        const processedName = member.name.trim().toLowerCase().replace(' ', '');
        return {
          name: member.name,
          linkedin: member.linkedin_url,
          background: member.background,
          image: membersImg.value[processedName],
        };
      }),
      image: teamImg.value[team.name.trim().toLowerCase().replace(' ', '_')] || fallbackImg,
    }))
  } catch (error) {
    console.error('Erro ao buscar equipas:', error)
  }
}

const allowedTeams = ['COORDINATION', 'SPEAKERS', 'LOGISTICS', 'WEBDEV', 'BUSINESS', 'MARKETING']

const filteredTeams = computed(() =>
  teams.value.filter((team) => allowedTeams.includes(team.name?.trim().toUpperCase())),
  console.log(teams.value),
)

onMounted(async () => {
  await fetchTeamImg();
  await fetchMembersImage();
  await fetchTeams();
});
</script>

<template>
  <div class="view">
    <section>
      <h1>Team</h1>
    </section>
    <TeamSection>
      <template #content>
        <div class="page_subtitle">
          <h2>MEET OUR TEAM</h2>
          <div class="highlight" />
          <p>Connecting the best students, companies and engineers for over 20 years!</p>
        </div>
      </template>
      <template #image>
        <TeamWheel></TeamWheel>
      </template>
      <template #bottom></template>
    </TeamSection>

    <TeamSection v-for="team in filteredTeams" :key="team.name" :team="team" :id="team.name.toLowerCase()"
      :image="team.image" :members="team.members" />
  </div>
</template>
