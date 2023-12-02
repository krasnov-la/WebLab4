import { LocalStorage } from 'quasar';
import axios from 'axios';
import { defineStore } from 'pinia';

interface ITokenList {
  accessToken: string | null,
  refreshToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null
  }),

  actions: {
    refreshTokenAction () : Promise<ITokenList> {
      return new Promise((resolve, reject) => {
        const lsAccessToken = LocalStorage.getItem("token");
        const lsRefreshToken = LocalStorage.getItem("refreshToken");
        if(lsAccessToken == null || lsRefreshToken == null) {
          reject("There is no accessToken or refreshToken in localStorage");
        }
        axios.post(process.env.API + '/Auth/Refresh', {
          accessToken: lsAccessToken,
          refreshToken: lsRefreshToken
        }).then((response) => {
          if (response.status == 200) {
            const data = response.data;
            this.accessToken = data.accessToken;
            this.refreshToken = data.refreshToken;
            LocalStorage.set("token", this.accessToken);
            LocalStorage.set("refreshToken", this.refreshToken);
            resolve({
              accessToken: this.accessToken,
              refreshToken : this.refreshToken
            });
          } 
          else {
            console.log(response);
            reject(response);
          }
        }).catch((reason) => {
          console.log(reason);
          reject(reason);
        });
      })
      
    }
  },

  getters: {
    getTokens() : ITokenList {
      return {
        accessToken: this.accessToken,
        refreshToken : this.refreshToken
      }
    }
  }
});
