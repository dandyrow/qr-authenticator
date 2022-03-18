import { useSettings } from './settings.store';
import jwt_decode from 'jwt-decode';
import { AccessTokenPayload } from '@/types/stateTypes';
import { defineStore } from 'pinia';

interface State {
  accessToken?: string;
  userId?: number;
  username?: string;
  expiry?: Date;
}

export const useAuth = defineStore('auth', {
  state: (): State => ({}),
  getters: {
    tokenValid: (state) => {
      if (!state.expiry || state.expiry.getTime() < Date.now()) {
        return false;
      }
      return true;
    },
  },

  actions: {
    async setAccessToken(accessToken: string) {
      this.accessToken = accessToken;

      const payload = jwt_decode<AccessTokenPayload>(accessToken);
      this.userId = payload.userId;
      this.username = payload.username;
      this.expiry = new Date(payload.exp * 1000);
      
      const settingsStore = useSettings();
    },
  },
});
