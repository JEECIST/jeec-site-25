import { defineStore } from 'pinia'
import axios from 'axios'

export const useSpeakersStore = defineStore('speakears', {
  state: () => ({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
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
                this.monday = response.data.monday
                this.tuesday = response.data.tuesday
                this.wednesday = response.data.wednesday
                this.thursday = response.data.thursday
                this.friday = response.data.friday
                console.log(this.monday)
                console.log(this.tuesday)
                console.log(this.wednesday)
                console.log(this.thursday)
                console.log(this.friday)
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