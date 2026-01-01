import { defineStore } from 'pinia'
import axios from 'axios'

export const useTeamStore = defineStore('team', {
  state: () => ({
    teams: [],
    allowedTeams: ['COORDINATION', 'SPEAKERS', 'LOGISTICS', 'WEBDEV', 'BUSINESS', 'MARKETING', 'DESIGN'],
    isLoaded: false,
  }),

  actions: {
    async fetchData() {
      if (this.isLoaded) return

      this.isLoaded = true
      await axios
        .get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/team_website', {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
          },
        })
        .then(async (response) => {
          this.teams = response.data.teams.filter((team) =>
            this.allowedTeams.includes(team.name?.trim().toUpperCase()),
          )
          this.teams.forEach((team) => {
            team.members.sort((a, b) => b.spotlight - a.spotlight)
          })
        })
        .catch((error) => {
          this.isLoaded = false
          console.error('Error fetching team:', error)
          return false
        })

      return true
    },
    persist: true,
  },
})
