import { defineStore } from 'pinia'
import axios from 'axios'

export const useSpeakersStore = defineStore('speakers', {
  state: () => ({
    speakers: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    },
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
          console.log(response.data)
          this.speakers.monday = response.data.monday
          this.speakers.tuesday = response.data.tuesday
          this.speakers.wednesday = response.data.wednesday
          this.speakers.thursday = response.data.thursday
          this.speakers.friday = response.data.friday
        })
        .catch((error) => {
          this.isLoaded = false
          console.error(error)
          return false
        })

      return true
    },
    persist: true,
  },
})
