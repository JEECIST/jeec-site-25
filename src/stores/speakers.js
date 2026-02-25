import { defineStore } from 'pinia'
import axios from 'axios'

export const useSpeakersStore = defineStore('speakers', {
  state: () => ({
    speakers: {
      keynote: [],
      discussions: [],
      alumni: [],
    },
    homeData: [],
    isLoaded: false,
  }),

  actions: {
    async fetchData() {
      if (this.isLoaded) return
      this.isLoaded = true
      axios
        .get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/speakerss', {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
          },
        })
        .then(async (response) => {
          const parseActivityDate = (value) => new Date(`${value}, 2000`).getTime()

          this.speakers.keynote = [...response.data['keynote speakers']]
            .sort((a, b) => parseActivityDate(a.activity_date) - parseActivityDate(b.activity_date))
            .reduce((groups, speaker) => {
              const date = speaker.activity_date
              const group = groups.find((g) => g[0]?.activity_date === date)

              if (group) group.push(speaker)
              else groups.push([speaker])

              return groups
            }, [])

          this.speakers.discussions = response.data['board discussions']
          this.speakers.alumni = response.data['alumni talks']

          this.homeData = Object.values(this.speakers.keynote).flat()
        })
        .catch((error) => {
          this.isLoaded = false
          console.error('Error fetching speakers:', error)
          return false
        })

      return true
    },
    persist: true,
  },
})
