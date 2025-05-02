import { defineStore } from 'pinia'
import axios from 'axios'

export const usePartnersStore = defineStore('partners', {
  state: () => ({
    gold: null,
    silver: null,
    bronze: null,
    nucleo: null,
    isLoaded: false,
  }),

  actions: {
    async fetchData() {
      if (this.isLoaded) 
        return

      await axios.get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL+'/companies', {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
            if(response.data.error == ''){
                console.log(response.data)
                this.gold = response.data.gold
                this.silver = response.data.silver
                this.bronze = response.data.bronze
                this.bronze = response.data.nucleo
                console.log(this.gold)
                console.log(this.silver)
                console.log(this.bronze)
                console.log(this.nucleo)
                console.log("merda")
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