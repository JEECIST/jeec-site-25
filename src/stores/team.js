import { defineStore } from 'pinia'
import axios from 'axios'

export const useTeamStore = defineStore('team', {
  state: () => ({
    
    isLoaded: false,
  }),

  actions: {
    async fetchData() {
      if (this.isLoaded) 
        return

      await axios.get(import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL+'/speakerss', {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }}).then(response => {
            if(response.data){
                console.log(response.data)

                this.isLoaded = true
            }else{
                return false
            }
        })

        return true
    },
    persist: true
  }
})