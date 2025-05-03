import { defineStore } from 'pinia'
import axios from 'axios'

export const useSponsorsStore = defineStore('sponsors', {
  state: () => ({
    sponsors: [
      {
        tier: 'gold',
        title: {
          highlight: 'Gold',
          normal: 'Sponsors',
        },
        companies: [],
      },
      {
        tier: 'silver',
        title: {
          highlight: 'Silver',
          normal: 'Sponsors',
        },
        companies: [],
      },
      {
        tier: 'bronze',
        title: {
          highlight: 'Bronze',
          normal: 'Sponsors',
        },
        companies: [],
      },
    ],
    homeData: [],
    isLoaded: false,
  }),

  actions: {
    async fetchData() {
      if (this.isLoaded) return

      this.isLoaded = true
      await axios
        .get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/sponsors', {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
          },
        })
        .then((response) => {
          console.log(response.data)
          response.data.tiers.forEach((tier) => {
            switch (tier.name) {
              case 'gold':
                this.sponsors[0].companies = tier.sponsors
                break
              case 'silver':
                this.sponsors[1].companies = tier.sponsors
                break
              case 'bronze':
                this.sponsors[2].companies = tier.sponsors
                break
            }
          })

          console.log('Sponsors:', this.sponsors)

          this.homeData = this.sponsors[0].companies.map((sponsor) => ({
            name: sponsor.name,
            image: sponsor.image,
          }))
        })
        .catch((error) => {
          this.isLoaded = false
          console.error('Error fetching sponsors:', error)
          return false
        })

      return true
    },
    persist: true,
  },
})
