import { defineStore } from 'pinia'
import axios from 'axios'

export const useHomeScheduleStore = defineStore('homeSchedule', {
  state: () => ({
    nextActivities: [],
    isLoaded: false,
  }),

  actions: {
    async fetchData() {
      if (this.isLoaded) return

      this.isLoaded = true
      await axios
        .get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/get-next-activities', {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
          },
        })
        .then(async (response) => {
          console.log(response.data)
          this.nextActivities = response.data
        })
        .catch((error) => {
          this.isLoaded = false
          console.error('Error fetching next activities:', error)
          return false
        })

      return true
    },
    persist: true,
  },
})
