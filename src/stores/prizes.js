import { defineStore } from 'pinia'
import axios from 'axios'

export const usePrizesStore = defineStore('prizes', {
  state: () => ({
    Daily: null,
    Squad: null,
    Individual: null,
    CV: null,
    Shop: null,
    isLoaded: false,
  }),

  actions: {
    async fetchData() {
    if (this.isLoaded) 
        return

    try {
        const response = await axios.get(
            import.meta.env.VITE_APP_JEEC_WEBSITE_API_URL + '/site-get-prizes',
            {
                auth: {
                    username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
                    password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
                }
            }
        );
        console.log(response.data)

        this.CV = response.data.CV || [],
        this.Daily = response.data.Daily || [],
        this.Individual = response.data.Individual || [],
        this.Shop = response.data.Shop || [],
        this.Squad = response.data.Squad || []

        console.log(this.CV)
        console.log(this.Daily)
        console.log(this.Individual)
        console.log(this.Shop)
        console.log(this.Squad)

    } catch (error) {
        console.error("Error fetching prizes:", error);
        // hasError.value = true;
        // errorMessage.value = "Failed to load prizes. Please try again later.";
    } finally {
        this.isLoaded = true;
    }

    return true
    },

    persist: true
  }
})