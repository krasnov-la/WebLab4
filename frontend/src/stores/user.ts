import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  actions: {
    async updateRecord (record : integer) {
      const authStore = useAuthStore();
      authStore.refreshTokenAction().then(() => {
        const authData = authStore.getTokens;
        const config = {
          headers: {
            'Authorization': "Bearer " + authData.accessToken
          }
        };
        axios.post(process.env.API + '/User/UpdateScore', {
          newHighScore: record
        }, config).catch((reason) => {
          console.log(reason);
        });
      }).catch((reason) => {
        console.log(reason);
      });
    }
  }
});
