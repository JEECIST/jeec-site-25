import { defineStore } from 'pinia'
import axios from 'axios'

export const useSponsorsStore = defineStore('sponsors', {
  state: () => ({
    tiers: null,
    isLoaded: false,
  }),

  actions: {
    async fetchData() {
      if (this.isLoaded) 
        return

      await axios.get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL+'/sponsors', {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
            if(response.data.error == ""){
                console.log(response.data)
                this.tiers = response.data.tiers
                console.log(this.tiers)
                this.isLoaded = true
            }else{
                console.log(response.data.error)
                return false
            }
        })

        return true
    },
    persist: true
  }
})