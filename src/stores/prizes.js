import { defineStore } from 'pinia'
import axios from 'axios'

export const usePrizesStore = defineStore('prizes', {
  state: () => ({
    weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    hasError: false,
    errorMessage: '',
    isLoading: true,
    prizes: {
      daily: [],
      squad: [],
      individual: [],
      cv: [],
      shop: [],
    },
    homeData: [],
    isLoaded: false,
  }),

  actions: {
    async fetchData() {
      if (this.isLoaded) return

      try {
        this.isLoaded = true
        const response = await axios.get(
          import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/site-get-prizes',
          {
            auth: {
              username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
              password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
            },
          },
        )

        this.prizes.daily = this.weekdays.map((day, index) => {
          const prize = response.data?.Daily[index]
          return {
            name: prize?.name || 'Prize coming soon',
            image: prize?.image_url ? `data:image/*;base64,${prize.image_url}` : null,
          }
        })
        this.prizes.individual =
          response.data.Individual?.map((prize) => ({
            name: prize?.name || 'Prize coming soon',
            image: prize?.image_url ? `data:image/*;base64,${prize.image_url}` : null,
          })) ?? []
        this.prizes.squad =
          response.data.Squad?.map((prize) => ({
            name: prize?.name || 'Prize coming soon',
            image: prize?.image_url ? `data:image/*;base64,${prize.image_url}` : null,
          })) ?? []
        this.prizes.cv =
          response.data.CV?.map((prize) => ({
            name: prize?.name || 'Prize coming soon',
            image: prize?.image_url ? `data:image/*;base64,${prize.image_url}` : null,
          })) ?? []
        this.prizes.shop =
          response.data.Shop?.map((prize) => ({
            name: prize?.name || 'Prize coming soon',
            image: prize?.image_url ? `data:image/*;base64,${prize.image_url}` : null,
          })) ?? []

        this.homeData = [
          ...this.prizes.daily,
          ...this.prizes.individual,
          ...this.prizes.squad,
          ...this.prizes.cv,
        ].filter((prize) => prize.name !== 'Prize coming soon')

        this.isLoading = false
      } catch (error) {
        console.error('Error fetching prizes:', error)
        this.isLoading = false
        this.isLoaded = false
        this.hasError = true
        this.errorMessage = 'Failed to load prizes. Please try again later.'
        return false
      }

      return true
    },

    persist: true,
  },
})
