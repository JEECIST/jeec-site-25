import { defineStore } from 'pinia'
import axios from 'axios'

export const usePartnersStore = defineStore('partners', {
  state: () => ({
    partners: [
      {
        tier: 'gold',
        title: {
          highlight: 'Gold',
          normal: 'Partners',
        },
        companies: [],
      },
      {
        tier: 'silver',
        title: {
          highlight: 'Silver',
          normal: 'Partners',
        },
        companies: [],
      },
      {
        tier: 'bronze',
        title: {
          highlight: 'Bronze',
          normal: 'Partners',
        },
        companies: [],
      },
      {
        tier: 'nucleo',
        title: {
          highlight: '',
          normal: 'Núcleos e Centros de Investigação',
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
        .get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/companies', {
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
          },
        })
        .then((response) => {
          this.partners[0].companies = response.data.gold
          this.partners[1].companies = response.data.silver
          this.partners[2].companies = response.data.bronze
          this.partners[3].companies = response.data.nucleo

          this.homeData = response.data.gold.map((company) => ({
            name: company.name,
            image: company.image_base64,
          }))
        })
        .catch((error) => {
          console.error('Error fetching partners:', error)
          this.isLoaded = false
          return false
        })

      return true
    },
    persist: true,
  },
})
